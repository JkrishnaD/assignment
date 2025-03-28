# Project Setup Guide

## Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (if using a local database)
- [Git](https://git-scm.com/)

## Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add the following:
```
MONGO_URI=mongodb://localhost:27017/your_database_name
JWT_SECRET=your_jwt_secret
```

### 4. Run the Server
```bash
npm run dev
```

## API Endpoints
| Method | Route           | Description          |
|--------|-----------------|----------------------|
| POST   | /api/v1/signup  | Register a new user  |
| POST   | /api/v1/login       | Authenticate user    |
| GET    | /api/user       | user details         |
| PUT    | /api/user/update| update details         |


## The postman results for api's

- /api/v1/signup 
![image](https://github.com/user-attachments/assets/94710afa-2591-4d93-8bf7-aace1c882647)
- /api/v1/login
![image](https://github.com/user-attachments/assets/0b8aea6d-a7d6-4a6d-bfd4-872d604a8797)
- /api/user  
![image](https://github.com/user-attachments/assets/92866192-43c4-48ca-8806-f8fd3f95f0d2)
- /api/user/update
![image](https://github.com/user-attachments/assets/1f9c5d80-5120-47d8-8045-547f33a8303c)

