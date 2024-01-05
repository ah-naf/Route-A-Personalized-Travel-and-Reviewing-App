# ROUTE: A Personalized Travelling and Reviewing App

The app allows users to create routes with detailed information on how to travel between places, including mode of transport, time required, and estimated costs. Users can also add reviews for places, complete with multimedia content.

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
git clone [repository-url]

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

# Start the server using nodemon
npx nodemon src/index.ts
```

### Using Docker

Alternatively, you can use Docker to run the entire application:

```bash
# Start the services defined in the Docker Compose file
docker compose up

# Execute migration in the server container
# Replace [server-container-name] with the actual container name
docker exec -it route-server npx prisma migrate dev
```
