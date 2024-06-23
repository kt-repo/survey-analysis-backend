# Survey Analysis Backend

Survey Analysis Backend is a REST API designed for data visualization of learning effectiveness pertaining to computer science courses. It provides endpoints for storing and retrieving information. The backend is built using Node.js, Express, and MongoDB.

Docker is used to create both development and production environments, facilitating easy deployment and consistent behavior across different stages of the development lifecycle.

## Installation

To install and run, follow these steps:

1. Clone the repository:

```
git clone https://github.com/kt-repo/survey-analysis-backend.git  
```  

2. Navigate to project directory:

```
cd survey-analysis-backend
```

3. Ensure you have Docker installed. Follow the instructions [here](https://docs.docker.com/get-docker/) to install Docker.

## Usage

### Development

#### Start server

To start the server in development environment in detached mode:

```
# first time
docker-compose up --build -d

# each time after
docker-compose up -d
```

#### Run seeder

Seeds database for development and testing:

```
# 1. start main service
docker-compose up -d

# 2. run tests
docker-compose run --rm seed
```

### Production

Start production server:

```
docker-compose -f docker-compose.prod.yml up --build
```

### Testing

Run test suite:

```
# 1. start main service
docker-compose up -d

# 2. each time after
docker-compose run --rm test
```  

## Environment Variables

Ensure files for environment variables exist and the following variables are defined:

### Development

`.env`

```
PORT=3000  
DB_CONNECTION_STRING=mongodb://mongo:27017/dev_db
```

### Production

`.env.production`

```
PORT=80  
DB_CONNECTION_STRING=[Production Database]  
```

### Testing

`.env.test`

```
PORT=3000  
DB_CONNECTION_STRING=mongodb://mongo:27017/test_db
```

## Technologies Used

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A routing framework for Node.js.
- **MongoDB**: A source-available cross-platform document-oriented database program.
- **Docker**: A platform for developing, shipping, and running applications inside lightweight, portable containers.
- **Jest**: A JavaScript Testing Framework.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.