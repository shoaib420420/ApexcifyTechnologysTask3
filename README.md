# School / Tuition Institute Management System

A comprehensive web-based application for managing school or tuition institute operations. This system handles various roles including Admins, Teachers, Students, and Parents, streamlining administrative tasks, academic tracking, and communication.

## 🚀 Features

### General
- **Authentication**: Secure login and registration system with role-based access control.
- **Dashboard**: dynamic dashboards tailored for each user role.

### 👤 Role-Based Functionalities

#### Admin
- **User Management**: Manage Students, Teachers, and Parents.
- **Class Management**: Create and oversee classes and subjects.
- **Notices**: Publish important announcements.
- **Overview**: View statistics and system-wide activities.

#### Teacher
- **Class Management**: View assigned classes.
- **Attendance**: Mark and view student attendance.
- **Marks/Exams**: Manage exam results and grading.
- **Student tracking**: View details of students in their classes.

#### Student
- **Profile**: View personal academic details.
- **Attendance**: Check attendance records.
- **Marks**: View exam results and performance.
- **Timetable**: Access class schedules.

#### Parent
- **Child Monitoring**: Track child's attendance and academic performance.
- **Communication**: View notices and updates from the school.

## 🛠️ Technology Stack

### Frontend
- **React.js**: Component-based UI library.
- **React Router**: For navigation and routing.
- **Axios**: For making HTTP requests.
- **CSS**: Custom styling.
- **Firebase**: Integration (dependency listed).

### Backend
- **Node.js**: Runtime environment.
- **Express.js**: Web framework for API.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM for MongoDB.
- **JWT & Bcrypt**: For secure authentication and password hashing.
- **Cors**: Cross-Origin Resource Sharing support.

## 🔧 Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally, or a MongoDB Atlas connection string.

### 1. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure Environment Variables:
    -   Create a `.env` file in the `backend` directory.
    -   Add the following variables (adjust as needed based on `.env.example`):
        ```env
        PORT=5000
        MONGO_URL=your_mongodb_connection_string
        ```

4.  Start the backend server:
    -   For development (with nodemon):
        ```bash
        npm run dev
        ```
    -   For production:
        ```bash
        npm start
        ```
    The server should typically run on `http://localhost:5000`.

### 2. Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the React application:
    ```bash
    npm start
    ```
    The application will run on `http://localhost:3000`.

## 📂 Project Structure

```
/
├── backend/            # Express.js API
│   ├── config/         # Database configuration
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   └── server.js       # Entry point
│
├── frontend/           # React.js Application
│   ├── public/         # Static assets
│   └── src/
│       ├── components/ # Reusable UI components
│       ├── pages/      # Page components (Views)
│       └── services/   # API call services
```

## 🔗 API Endpoints

Key API routes available in the backend:

- `/api/auth`: Authentication (Register, Login)
- `/api/students`: Student management
- `/api/teachers`: Teacher management
- `/api/classes`: Class management
- `/api/attendance`: Attendance tracking
- `/api/marks`: Examination and marks
- `/api/notices`: System notices

