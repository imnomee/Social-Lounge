# Project Name: Social Media Platform

## Description

A modern social media platform built using the MERN (MongoDB, Express.js, React, Node.js) stack, featuring user authentication, tweeting, following users, commenting on tweets, and liking tweets. This platform aims to provide a simple yet engaging experience for users to connect and share their thoughts.

## Table of Contents

-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Installation](#installation)
-   [Usage](#usage)
-   [API Endpoints](#api-endpoints)
-   [Contributing](#contributing)
-   [License](#license)
-   [Contact](#contact)

## Features

-   **User Registration & Authentication**: Sign up and log in with JWT-based authentication.
-   **User Profiles**: View and edit user profiles.
-   **Tweeting**: Create, like, and delete tweets with optional images.
-   **Comments**: Add comments to tweets.
-   **Following Users**: Follow and unfollow other users.
-   **Feed**: View a personalized feed of tweets from followed users.

## Technologies Used

-   **Frontend**:
    -   React.js
    -   Pug (for templating)
    -   CSS (or any styling framework)
-   **Backend**:
    -   Node.js
    -   Express.js
    -   MongoDB (with Mongoose)
    -   JWT (for authentication)
    -   Cookie-parser (for handling cookies)
    -   Cors (for handling cross-origin requests)
    -   Bcrypt.js (for password hashing)

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/imnomee/codealpha-multiplayer-gamer-server.git
    ```

2. **Navigate to the project directory**:

    ```bash
    cd repo-name
    ```

3. **Install dependencies**:

    - For the backend:

    ```bash
    cd backend
    npm install
    ```

    - For the frontend (if separate):

    ```bash
    cd frontend
    npm install
    ```

4. **Create a `.env` file in the root directory and add your environment variables**:

    ```plaintext
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=7860
    ```

5. **Run the server**:

    ```bash
    cd backend
    npm run dev
    ```

6. **(Optional) Run the frontend**:
    ```bash
    cd frontend
    npm run dev
    ```

## Usage

-   Access the API endpoints for user registration, login, tweeting, following users, and commenting through your preferred API client (e.g., Postman).
-   The frontend will be available at `http://localhost:7860` (or the specified port).

## API Endpoints

### Authentication Routes

-   **POST** `/api/auth/register`: Register a new user.
-   **POST** `/api/auth/login`: Log in an existing user.
-   **PUT** `/api/auth/profile`: Update user profile.

### Tweet Routes

-   **POST** `/api/tweets`: Create a new tweet.
-   **PUT** `/api/tweets/like/:id`: Like/unlike a tweet.
-   **GET** `/api/tweets/feed`: Get the user's tweet feed.

### Comment Routes

-   **POST** `/api/comments`: Create a new comment.
-   **GET** `/api/comments/:id`: Get comments for a specific tweet.
-   **DELETE** `/api/comments/:id`: Delete a comment.

### User Routes

-   **PUT** `/api/users/follow/:id`: Follow/unfollow a user.
-   **GET** `/api/users/:id`: Get a user's profile.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

-   **Noman Rafiq**: [heyimnomee@duck.com](heyimnomee@duck.com)
-   **GitHub**: [Imnomee](https://github.com/imnomee)
-   **LinkedIn**: [Noman Rafiq](https://www.linkedin.com/in/heyimnomee/)
