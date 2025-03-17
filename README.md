# ROUTE: A Personalized Travelling and Reviewing App

The app allows users to create routes with detailed information on how to travel between places, including mode of transport, time required, and estimated costs. Users can also add reviews for places, complete with multimedia content.

## Video Demo
<center>
  <a href="https://www.youtube.com/watch?v=3bn7vMM7AIw">
    <img src="https://img.youtube.com/vi/3bn7vMM7AIw/0.jpg" alt="Route Demo" width="480" height="360">
  </a>
</center>

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- ReactJS
- Node.js
- npm (Node Package Manager)
- Docker (if using Docker to run the project)

### Installing

A step-by-step series of examples that tell you how to get a development environment running.

#### Setting up the Client

```bash
# Clone the repository
git clone https://github.com/ah-naf/Route-A-Personalized-Travel-and-Reviewing-App.git

# Navigate to the client directory
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```

#### Setting up the Server

```bash
# Navigate to the server directory from the project root
cd server

# Install dependencies
npm install

# Create an .env file and configure your environment variables (see below for details)

# Start the server using nodemon
npx nodemon src/index.ts
```

#### Configuring the Server Environment

In the server folder, you need to create a `.env` file containing necessary environment variables. This file should include:

```plaintext
# Environment variables for Prisma and other services

DATABASE_URL= Provie postgres db url
JWT_SECRET= provide jwt secret

CLOUDINARY_CLOUD_NAME=Your cloudinary clound name
CLOUDINARY_API_KEY=Your cloudinary api key
CLOUDINARY_API_SECRET=Your cloudinary api secret
```

This configuration includes your database connection string, JWT secret, and Cloudinary credentials. Ensure you replace these values with your actual configuration details.

### Using Docker

Alternatively, you can use Docker to run the entire application:

```bash
# Start the services defined in the Docker Compose file
docker compose up

# Execute migration in the server container
docker exec -it route-server npx prisma migrate dev
```
