import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
import FormDataModel from './models/FormData.js';

export const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', // This should match the domain of your frontend
    credentials: true, // This allows session cookies to be sent back and forth
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Specify methods as needed
    allowedHeaders: ['Content-Type', 'Authorization']};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
