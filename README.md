<img width="1440" alt="Screenshot 2024-06-20 at 11 33 41 PM" src="https://github.com/tahafaisalkhan/trading-app/assets/157153519/39588d58-ac64-4791-b661-0201321da2ee"># MERN Stack Trading App

## Overview
This project is a MERN (MongoDB, Express.js, React, Node.js) stack application designed to facilitate trading between users. The app enables users to create trades, browse ongoing trades, make offers using a combination of cash and items, and manage their profiles.
<img width="1440" alt="Screenshot 2024-06-20 at 11 33 34 PM" src="https://github.com/tahafaisalkhan/trading-app/assets/157153519/2692aeba-0466-4b84-bb27-61e3f24368d6">




## Features

### User Authentication
- **Sign Up**: Allows new users to create an account.
<img width="1439" alt="Screenshot 2024-06-20 at 11 33 05 PM" src="https://github.com/tahafaisalkhan/trading-app/assets/157153519/ba2b7aee-8051-41d8-b9a8-c1c1e83715f4">



- **Login**: Enables existing users to log in.
<img width="1439" alt="Screenshot 2024-06-20 at 11 33 25 PM" src="https://github.com/tahafaisalkhan/trading-app/assets/157153519/79f2d60b-25c4-4494-91c7-733d05068ecb">



- **Validation**: Ensures that usernames are unique during registration. (Deduction: Lacks unique username validation.)

### Trade Management
- **Browse Trades**: Users can browse all ongoing trades. (Note: Does not display old trades.)

- **Search Trades**: Users can search trades based on keywords in the title.
<img width="1440" alt="Screenshot 2024-06-20 at 11 33 41 PM" src="https://github.com/tahafaisalkhan/trading-app/assets/157153519/62aa2fea-8b43-4089-af30-1f0d37d3f09d">


- **Trade Details**: Clicking on a trade navigates to a specific trade screen displaying all relevant information, including the title, description, and list of conditions.
<img width="1440" alt="Screenshot 2024-06-20 at 11 34 17 PM" src="https://github.com/tahafaisalkhan/trading-app/assets/157153519/b82892d2-3d91-458e-bc34-80fa2ac4e209">



- **Create Trade**: Users can create new trades by providing a title, description, and conditions.
<img width="1440" alt="Screenshot 2024-06-20 at 11 34 06 PM" src="https://github.com/tahafaisalkhan/trading-app/assets/157153519/8f7b2231-520e-4894-93fa-29fa4fd51040">



- **Offer Management**: Users can make offers on trades using a combination of cash and items. The app ensures the number of items offered does not exceed what the user owns and cash is an integer.
<img width="1440" alt="Screenshot 2024-06-20 at 11 34 22 PM" src="https://github.com/tahafaisalkhan/trading-app/assets/157153519/433fb10e-902f-426d-9cc9-5df75cbe50a5">


  
- **Update Offers**: Users can update their offers, and the app correctly handles offers using HTTP requests and sockets.

### Profile Management
- **Profile Screen**: Displays user's profile information, including username, created trades, sent offers, and the number of items they own.
- **Change Password**: Users can navigate to change their password.
<img width="1440" alt="Screenshot 2024-06-20 at 11 34 06 PM" src="https://github.com/tahafaisalkhan/trading-app/assets/157153519/dd1b0025-d336-4004-ae5d-48d31dc44d5e">

- **Profile Navigation**: The profile page provides navigation to the change password and create trade screens.
<img width="1439" alt="Screenshot 2024-06-20 at 11 33 52 PM" src="https://github.com/tahafaisalkhan/trading-app/assets/157153519/fa5a293a-8440-4ae7-bca3-e6ee026fff9b">




### Data Persistence
- **MongoDB**: Stores user information (username, password, number of items, cash), trade details (title, description, conditions), and offer details (items, cash, user, trade).

## Technology Stack
- **MongoDB**: For database management.
- **Express.js**: For server-side logic.
- **React**: For building the user interface.
- **Node.js**: For backend runtime environment.
- **Sockets**: For real-time offer management.

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/trading-app.git
    ```
2. Navigate to the project directory:
    ```bash
    cd trading-app
    ```
3. Install server dependencies:
    ```bash
    cd server
    npm install
    ```
4. Install client dependencies:
    ```bash
    cd client
    npm install
    ```

## Usage
1. Start the server:
    ```bash
    cd server
    npm start
    ```
2. Start the client:
    ```bash
    cd client
    npm start
    ```
3. Open the application in your browser:
    ```plaintext
    http://localhost:3000
    ```
