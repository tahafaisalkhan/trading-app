# MERN Stack Trading App

## Overview
This project is a MERN (MongoDB, Express.js, React, Node.js) stack application designed to facilitate trading between users. The app enables users to create trades, browse ongoing trades, make offers using a combination of cash and items, and manage their profiles.
<img width="1440" alt="Screenshot 2024-06-01 at 3 52 06 PM" src="https://github.com/tahafaisalkhan/web-dev/assets/157153519/56b9b7a0-8b77-42ab-986b-b40f3ffac163">



## Features

### User Authentication
- **Sign Up**: Allows new users to create an account.
<img width="1440" alt="Screenshot 2024-06-01 at 3 51 30 PM" src="https://github.com/tahafaisalkhan/web-dev/assets/157153519/b2ac5e0e-2e3f-4ae0-a354-3cf2c1a7705e">


- **Login**: Enables existing users to log in.
<img width="1440" alt="Screenshot 2024-06-01 at 3 51 55 PM" src="https://github.com/tahafaisalkhan/web-dev/assets/157153519/39a7835d-84b8-4ad2-8ffd-f07736ef0ec7">


- **Validation**: Ensures that usernames are unique during registration. (Deduction: Lacks unique username validation.)

### Trade Management
- **Browse Trades**: Users can browse all ongoing trades. (Note: Does not display old trades.)
- **Search Trades**: Users can search trades based on keywords in the title.
<img width="1440" alt="Screenshot 2024-06-01 at 3 52 14 PM" src="https://github.com/tahafaisalkhan/web-dev/assets/157153519/d43ca96d-3c28-4192-b8c9-de7f3e0cd90c">

- **Trade Details**: Clicking on a trade navigates to a specific trade screen displaying all relevant information, including the title, description, and list of conditions.
<img width="1440" alt="Screenshot 2024-06-01 at 3 52 22 PM" src="https://github.com/tahafaisalkhan/web-dev/assets/157153519/0c3f1798-cb5c-4613-b84d-e58812d6c7f3">


- **Create Trade**: Users can create new trades by providing a title, description, and conditions.
<img width="1440" alt="Screenshot 2024-06-01 at 3 52 54 PM 1" src="https://github.com/tahafaisalkhan/web-dev/assets/157153519/b126d86c-4490-4fa0-89a0-0248a5df1f9c">


- **Offer Management**: Users can make offers on trades using a combination of cash and items. The app ensures the number of items offered does not exceed what the user owns and cash is an integer.
<img width="1440" alt="Screenshot 2024-06-01 at 3 52 29 PM" src="https://github.com/tahafaisalkhan/web-dev/assets/157153519/e7137101-a3be-4c4a-ab76-669d7e027535">

  
- **Update Offers**: Users can update their offers, and the app correctly handles offers using HTTP requests and sockets.

### Profile Management
- **Profile Screen**: Displays user's profile information, including username, created trades, sent offers, and the number of items they own.
- **Change Password**: Users can navigate to change their password.
<img width="1440" alt="Screenshot 2024-06-01 at 3 52 42 PM" src="https://github.com/tahafaisalkhan/web-dev/assets/157153519/69f0d8ac-b62a-45e9-a756-07f2a8263f77">


- **Profile Navigation**: The profile page provides navigation to the change password and create trade screens.
<img width="1440" alt="Screenshot 2024-06-01 at 3 52 36 PM" src="https://github.com/tahafaisalkhan/web-dev/assets/157153519/d1612ddc-6925-433c-8b61-53ae6c4be459">



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
