import { Socket, Server } from "socket.io";
import http from "http";
import { app } from "./app.js";
import { config } from "dotenv";
import mongoose from "mongoose";
import FormDataModel from "./models/FormData.js";
import Trade from "./models/trade.js";
import Offer from "./models/offer.js";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

mongoose
  .connect(
    "mongodb+srv://root:taha@trading-app.jwkppix.mongodb.net/?retryWrites=true&w=majority&appName=Trading-App"
  )
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

config({
  path: "./config.env",
});

io.on("connection", (socket) => {
  //console.log("USER CONNECTED:", socket.id);
});

server.listen(8000, () => {
  console.log("Server listening on PORT 8000");
});

//SOCKETS
// =========================================================================================
// When a user connects to the socket
io.on("connection", (socket) => {
  //console.log("USER CONNECTED:", socket.id);

  socket.on("joinTradeRoom", (tradeId) => {
    console.log(`User ${socket.id} joining room for trade ${tradeId}`);
    socket.join(tradeId);
  });

  socket.on("newOffer", (tradeId, offer) => {
    console.log(`Broadcasting new offer to room for trade ${tradeId}`);
    io.to(tradeId).emit("offerReceived", offer);
  });

  socket.on("offerAccepted", (tradeId, offerId) => {
    socket.to(tradeId).emit("tradeEnded", offerId);
  });

  socket.on("offerRejected", (tradeId, offerId) => {
    socket.to(tradeId).emit("offerRejected", offerId);
  });
});

// REGISTER PAGE
// =========================================================================================

app.post("/register", (req, res) => {
  const { name, password } = req.body;
  FormDataModel.findOne({ name: name }).then((user) => {
    if (user) {
      res.json("Already registered");
    } else {
      FormDataModel.create(req.body)
        .then((log_reg_form) => res.json(log_reg_form))
        .catch((err) => res.json(err));
    }
  });
});

// LOGIN PAGE
// =========================================================================================

app.post("/login", (req, res) => {
  const { name, password } = req.body;
  FormDataModel.findOne({ name: name })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json("Success");
        } else {
          res.json("Wrong password");
        }
      }
      else {
        res.json("No records found! ");
      }
    })
    .catch((err) => res.status(500).json(err));
});

// CHANGE PASSWORD
// =========================================================================================
app.post("/change-password", async (req, res) => {
  const { name, oldPassword, newPassword } = req.body;
  try {
    const user = await FormDataModel.findOne({ name: name });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (oldPassword == user.password) {
      user.password = newPassword;
      await user.save();
      res.json({ message: "Password changed successfully" });
    }
  } catch (err) {
    console.error("Error changing password:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// LOGOUT
// =========================================================================================
app.post("/logout", async (req, res) => {
  try {
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE-TRADES
// =========================================================================================
app.post("/trades", async (req, res) => {
  try {
    const { name, title, description, conditions } = req.body;
    Trade.create(req.body)
      .then((trade) => {
        FormDataModel.findOneAndUpdate(
          { name: name }, 
          { $push: { createdTrades: trade._id } }, 
          { new: true }
        ).then((updatedUser) => {
          res.json({
            trade: trade,
            updatedUser: updatedUser,
          });
        });
      })
      .catch((err) => res.json(err));
  } catch (error) {
    console.error("Error creating trade:", error);
    res.status(500).send("Error creating trade");
  }
});

// PROFILE TRADES
// =========================================================================================
app.get("/api/trades/user/:userName", async (req, res) => {
  const { userName } = req.params;
  try {
    const userTrades = await Trade.find({ name: userName });
    res.status(200).json(userTrades);
  } catch (error) {
    console.error("Error fetching user trades:", error);
    res.status(500).send("Error fetching user trades");
  }
});
app.get("/api/users/profile/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const userProfile = await FormDataModel.findOne({ name: username }).exec();
    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(userProfile);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).send("Server error");
  }
});
app.get("/api/offers/user/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const user = await FormDataModel.findOne({ name: username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const offers = await Offer.find({ name: username });
    res.json(offers);
  } catch (error) {
    console.error("Error fetching offers:", error);
    res.status(500).send("Server error");
  }
});
// BROWSE TRADES
// =========================================================================================
app.get("/api/trades", async (req, res) => {
  try {
    const trades = await Trade.find({ status: "active" });
    res.json(trades);
  } catch (err) {
    console.error("Error getting trades:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// TRADE PAGE
// =========================================================================================
app.get("/api/trades/:tradeId", async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.tradeId);
    if (!trade) {
      return res.status(404).json({ message: "Trade not found" });
    }
    const userId = req.query.userId;
    const isOwner = trade.name.toString() === userId;

    const offers = await Offer.find({ trade: trade._id });
    const userOffer = offers.find((offer) => offer.name === userId);
    const hasOffered = !!userOffer;

    const offerPromises = trade.offers.map((offerId) =>
      Offer.findById(offerId)
    );
    const offerDetails = await Promise.all(offerPromises);
    res.json({ trade, isOwner, offers: offerDetails, hasOffered, userOffer });
  } catch (err) {
    console.error("Error accessing trade:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// CREATE OFFER
// =========================================================================================
app.post("/api/offers", async (req, res) => {
  const { commodity, quantity, description, cash, conditions, trade, name } =
    req.body;

  try {
    const user = await FormDataModel.findOne({ name }); 
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.cashOwned < cash || user.noOfItemsOwned < quantity) {
      return res
        .status(400)
        .json({ message: "Not enough resources to make the offer" });
    }

    const newOffer = new Offer({
      commodity,
      quantity,
      description,
      cashOffer: cash,
      conditions,
      trade,
      name,
    });
    await newOffer.save();

    io.to(trade).emit("offerReceived", newOffer);

    user.cashOwned -= cash;
    user.noOfItemsOwned -= quantity;
    await user.save();

    user.createdOffers.push(newOffer._id);
    await user.save();

    const tradeToUpdate = await Trade.findById(trade);
    if (!tradeToUpdate)
      return res.status(404).json({ message: "Trade not found" });

    tradeToUpdate.offers.push(newOffer._id);
    await tradeToUpdate.save();

    res.json({
      message: "Offer created and resources deducted",
      offer: newOffer,
    });
  } catch (error) {
    console.error("Error creating offer:", error);
    res.status(500).json({ message: "Failed to create offer" });
  }
});

// ACCEPT/REJECT
// =========================================================================================

app.post("/api/offers/:offerId/accept", async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.offerId).populate("trade");
    if (!offer) {
      return res.status(404).send("Offer not found");
    }

    offer.status = "Accepted";
    await offer.save();

    const trade = await Trade.findByIdAndUpdate(
      offer.trade._id,
      { status: "completed", acceptedOffer: offer._id },
      { new: true }
    );
    if (!trade) {
      return res.status(404).send("Trade not found");
    }

    const tradeOwner = await FormDataModel.findOne({ name: trade.name }); 
    if (tradeOwner) {
      tradeOwner.cashOwned += offer.cashOffer;
      tradeOwner.noOfItemsOwned += offer.quantity;
      await tradeOwner.save();
    }

    await Offer.updateMany(
      { trade: offer.trade, _id: { $ne: offer._id } },
      { status: "Rejected" }
    );

    offer.trade.acceptedOffer = offer._id;
    await offer.trade.save();

    //io.to(offer.trade._id.toString()).emit('tradeEnded', offer._id);
    io.to(offer.trade._id.toString()).emit("updateOfferStatus", {
      offerId: offer._id,
      status: "Accepted",
    });

    res.json({ message: "Offer accepted" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/api/offers/:offerId/reject", async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.offerId);
    const temp = offer.name;
    const user = await FormDataModel.findOne({ temp });

    if (!offer) {
      return res.status(404).send("Offer not found");
    }

    offer.status = "Rejected";
    offer.visibleToOwner = false;
    await offer.save();

    const sender = await FormDataModel.findOne({ name: offer.name }); 
    if (sender) {
      sender.cashOwned += offer.cashOffer;
      sender.noOfItemsOwned += offer.quantity;
      await sender.save();
    }

    io.to(offer.trade.toString()).emit("updateOfferStatus", {
      offerId: offer._id,
      status: "Rejected",
      visibleToOwner: false,
    });

    res.json({ message: "Offer rejected" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});
