# Use an official Node.js runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set build-time argument for environment
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["node", "src/server.js"]
