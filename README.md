# Survey Analysis Backend

Survey Analysis Backend is a REST API designed for analyzing learning effectiveness of computer science courses. It
provides endpoints for storing and retrieving survey results. Built using Node.js, Express, and MongoDB.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Steps](#steps)
- [Usage](#usage)
  - [Get All Learning Methods](#get-all-learning-methods)
  - [Get a Learning Method by ID](#get-a-learning-method-by-id)
  - [Get multiple Learning Methods](#get-multiple-learning-methods)
  - [Add new Learning Method](#add-new-learning-method)
  - [Update Learning Method](#update-learning-method)
  - [Delete Learning Method](#delete-learning-method)
  - [Get multiple Learning Methods](#get-multiple-learning-methods)
  - [Get All Techniques Adopted](#get-all-techniques-adopted)
- [Add new Techniques Adopted](#add-new-techniques-adopted)
  - [Update Techniques Adopted](#update-techniques-adopted)
  - [Delete Techniques Adopted](#delete-techniques-adopted)
  - [Get Techniques Adopted by ID](#get-a-learning-method-by-id)
  - [Get multiple Techniques Adopted](#get-multiple-learning-methods)

## Introduction

The primary goal is to provide an API to store and retrieve results. Optionally, results from multiple courses can be
aggregated.

## Installation

To install and run, follow these steps:

### Prerequisites

- Node.js (v22 or later)
- MongoDB (v7 or later)
- Docker

### Steps

1. Clone the repository:

```
git clone https://github.com/kt-repo/survey-analysis-backend.git
cd survey-analysis-backend
```

2. Set up environment variables.

   Create a .env file in the root directory and add the following configuration:

```
PORT=3000
DB_CONNECTION_STRING=mongodb://mongo:27017/dev_db
```

3. Start the server:

```
# development 
docker-compose up --build
docker-compose up # after image has been built

# production
docker-compose --env-file .env.production -f docker-compose.prod.yml up --build
```

4. The (development) API will be available at `http://localhost:3000`.

## Usage

Below are some example endpoints and how to use them.

### Get All Learning Method survey results

Endpoint: GET /api/learning-method

Description: Retrieve Learning Method survey results 

Request:

```
GET /api/learning-method
```

Response:

```json
{
  "name": "John Doe",
  "semester": "Fall",
  "year": 2023,
  "methods": [
    {
      "method": "Listening to the lectures",
      "scores": [0, 0, 0, 0, 0]
    },
    {
      "method": "Re-review previous material and recordings",
      "scores": [0, 0, 0, 0, 0]
    },
    {
      "method": "Completing assignments",
      "scores": [0, 0, 0, 0, 0]
    },
    {
      "method": "Taking quizzes",
      "scores": [0, 0, 0, 0, 0]
    },
    {
      "method": "Preparing for and completing the final exam",
      "scores": [0, 0, 0, 0, 0]
    },
    {
      "method": "Providing/receiving comments to/from peers",
      "scores": [0, 0, 0, 0, 0]
    },
    {
      "method": "Collaborating during the term project",
      "scores": [0, 0, 0, 0, 0]
    }
  ]
}

```

### Get a Learning Method survey result by ID

Endpoint: GET /api/learning-method/:id

Description: Retrieve a Learning Method survey result by ID

Request:

```
GET /api/learning-method
```

Response:

```json
[
   {
      "_id": "12345",
      "name": "CS633",
      "semester": "Fall",
      "year": "2019",
      "data": [
         {"method": "Listen to lectures", "ranking": [0,0,1,3,5]},
         {"method": "Re-review previous materials & recordings", "ranking": [0,0,1,3,5]},
         {"method": "Complete Assignments", "ranking": [0,0,1,3,5]}
      ]
   }
]

```

### Get multiple Learning Method survey results

Endpoint: POST /api/learning-method/search

Description: Retrieve Learning Method survey result by multiple IDs.

Request:

```bash
POST /api/learning-method/search
Content-Type: application/json

{
  "ids": ["60d21b4667d0d8992e610c85", "60d21b4667d0d8992e610c86"]
}
```

Response:

```json
[
   {
      "_id": "12345",
      "name": "CS633",
      "semester": "Fall",
      "year": "2019",
      "data": [
         {"method": "Listen to lectures", "ranking": [0,0,1,3,5]},
         {"method": "Re-review previous materials & recordings", "ranking": [0,0,1,3,5]},
         {"method": "Complete Assignments", "ranking": [0,0,1,3,5]}
      ]
   },
   {
      "_id": "12345",
      "name": "CS633",
      "semester": "Fall",
      "year": "2019",
      "data": [
         {"method": "Listen to lectures", "ranking": [0,0,1,3,5]},
         {"method": "Re-review previous materials & recordings", "ranking": [0,0,1,3,5]},
         {"method": "Complete Assignments", "ranking": [0,0,1,3,5]}
      ]
   }
]

```

### Add new Learning Method survey results 

Endpoint: POST /api/learning-method

Description: Add new Learning Method survey results

### Update Learning Method survey results

Endpoint: PUT /api/learning-method/:id

Description: Update Learning Method survey results

### Delete Learning Method 

Endpoint: DELETE /api/learning-method/:id

Description: Delete Learning Method survey results

### Get All Techniques Adopted survey results

Endpoint: GET /api/techniques-adopted

Description: Retrieve Techniques Adopted survey results

Request:

```
GET /api/techniques-adopted
```

Response:

```json
[
   {
      "_id": "12345",
      "name": "CS633",
      "semester": "Fall",
      "year": "2019",
      "data": [
         {"method": "Listen to lectures", "ranking": [0,0,1,3,5]},
         {"method": "Re-review previous materials & recordings", "ranking": [0,0,1,3,5]},
         {"method": "Complete Assignments", "ranking": [0,0,1,3,5]}
      ]
   }
]

```

### Add new Techniques Adopted 

Endpoint: POST /api/techniques-adopted

Description: Add new Techniques Adopted survey results

### Update Techniques Adopted 

Endpoint: PUT /api/techniques-adopted/:id

Description: Update Techniques Adopted survey results

### Delete Techniques Adopted

Endpoint: DELETE /api/techniques-adopted/:id

Description: Delete Techniques Adopted survey results