# Atelier Ratings & Reviews API

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-%2343853D.svg?style=flat&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=flat&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=flat&logo=postgresql&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=flat&logo=jest&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=flat&logo=amazon-aws&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=flat&logo=npm&logoColor=white)

## Overview
Create a lightweight and scalable microservice serving the ratings and reviews information to a e-commerce portal. The API serves millions of rows of data including ratings, comments, responses, photos etc.

## Accomplishments
- Performed the ETL(extract, transfer and load) process of over 10 million rows or data
- Created API endpoints for all types of requests, and tested that correct data was sent back using Postman
- Used K6 and New Relic to identify bottlenecks of server performance
- Reduced query latency locally by using Postgres aggregation functions and adding indexing
- Deplopyed the Postgres database on AWS EC2
- Applied horizontal scaling by deploying the API servers onto 5 AWS EC2 instances
- Deployed an NGINX proxy server on AWS EC2 to automatically route traffic across multiple API servers
- Used Loader.io to stress test the deployed application in cloud

## Installation
```
// install dependencies
npm install

// mport data from local files
sudo -u postgres psql < database/schema.sql

// clean up data
sudo -u postgres psql < database/cleanup.sql

// start server
npm run start
```

## Testing
```
// run JEST test
npm run test

// run K6 test
cd testing/k6
k6 run <test file directory>
```
