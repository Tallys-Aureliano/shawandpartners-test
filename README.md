# Take Home Test

<div align="center">
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
  <img src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white"/>
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white"/>
</div>

- [📑 About o projeto](#-about)
- [📖 Documentation](#-documentation)
- [📥 Package Manager](#-packages)
- [🚀 Começando](#-comecando)

## 📖 Documentation

- [[Project] - Class diagram](./docs/app_diagram.png)

- [[Project] - Entity relationship diagram](./DOCS/ERD.png)

- [[Project] - Insomnia API Collection](./docs/Insomnia_2023-07-12.json)

## 📑 About
The purpose of this test is to evaluate your skills in Fullstack, Backend(my choice), and/or Frontend development. You will be required to build a web application that allows users to load a CSV file with preformatted data and display the data as cards on the website. The application should also include a search bar that allows users to search for data within the loaded CSV file.
   ### Requirements for Backend
   An endpoint that allows the frontend to load the CSV file.
   An endpoint that allows the frontend to search through the loaded CSV data.
   The search endpoint should accept query parameters for search terms and filters, and should return the matching results.
   Appropriate error handling for invalid search queries or other errors.
   ### Instructions for Backend
   - The backend should be implemented as a RESTful API using Node. (Try not to use an opinionated framework such as Adonis or Nest).
   - The backend must include the following endpoints:
   - [POST /api/files] An endpoint that accepts a CSV file upload from the frontend and stores the data in a database or a data structure.
   - [GET /api/users] Should include an endpoint that allows the frontend to search through the loaded CSV data.
   - The search endpoint should accept a ?q= query parameter for search terms and should search through EVERY column of the CSV
   - The backend should include appropriate error handling for invalid requests or other errors.

# 📥 Packages
The project was developed using NPM, but you can use any of the managers below:
- Yarn
- PNPM
- NPM

## 🚀 Starting

### Step 1:
   > When cloning the project run the command **npm install** in the terminal to install the dependencies.
  
### Step 2:
   > Create the **.env** file in the root of the project to connect to the database.
  
### Step 3:
   > To connect to the database, write the following line in the **.env** file: *DATABASE_URL="file:./dev.db"* or find the same line in the [.env.example] (./ .env.example)
 
### Step 4:
   > Activate the node server with: **npm run dev**. This will cause your application to start and start receiving requests.
  
### Step 5:
   > Then run the command:**npm run studio** in the terminal. This will show your database using the prism layout.

### Step 6:
   > If you have errors with migrate, run:**npx prisma migrate reset** and the migrations will be reset, then repeat the previous steps.

### Step 7:
     > To run the tests run the command **npm test**.