# Learning Management System (LMS) with Adaptive Testing

This project is a Learning Management System (LMS) with an adaptive testing feature, built using **NestJS** for the backend and **MongoDB** as the database. It includes user registration, login, and test-taking functionality with an adaptive algorithm to adjust question difficulty based on user responses.

---

## Table of Contents

- [Project Setup](#project-setup)
- [Database Connection](#database-connection)
- [Scripts and Commands](#scripts-and-commands)
  - [Seeding the Database](#seeding-the-database)
  - [Running the Server](#running-the-server)
- [Project Structure](#project-structure)
- [Endpoints](#endpoints)

---

## Project Setup

1. **Clone the Repository**:
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following variables:
    ```plaintext
    PORT=3000
    MONGODB_URI=<your_mongodb_uri>
    ```

    - Replace `<your_mongodb_uri>` with your MongoDB connection string (e.g., from MongoDB Atlas).
    - Replace `<your_jwt_secret_key>` with a strong secret key for JWT authentication.

4. **Install MongoDB Atlas or MongoDB locally**:
   - This project uses MongoDB as the database, and the default connection URI can be configured in the `.env` file.

---

## Database Connection

The project connects to MongoDB using Mongoose. The connection URI should be set in the `.env` file:

```plaintext
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority

## Run a Post API for seeding 500 dummy Quesions on database 
API is - hostURL/seed



