# 📝 To-Do Task Manager

A web-based To-Do list application built with **Node.js**, **Express**, **MySQL**, and **EJS**. It allows users to manage tasks efficiently by categorizing them into pending and completed states.

## 📌 Features

- View pending tasks
- Add a new task with a date
- Edit existing tasks
- Mark tasks as complete
- Revert completed tasks back to pending
- Delete tasks

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS Templates
- **Database**: MySQL
- **Other Tools**: UUID, Method-Override

## 📁 Project Structure

todo-task-manager/
├── index.js # Main server file
├── package.json # Project metadata and dependencies
├── package-lock.json # Dependency lock file
├── Schema.sql # Database schema (tables for pending and complete tasks)
├── /views # EJS templates (index.ejs, addTask.ejs, editTask.ejs, completedTask.ejs)
├── /public # Static assets (CSS, JS, etc.)


## 🧱 Database Schema

 Schema.sql

CREATE TABLE Pending_Tasks (
  id VARCHAR(100) NOT NULL,
  content VARCHAR(200),
  Task_date VARCHAR(100)
);

CREATE TABLE Complete_Tasks (
  id VARCHAR(100) NOT NULL,
  content VARCHAR(200),
  Task_date VARCHAR(100)
);

🚀 Getting Started

Prerequisites
Node.js v18+
MySQL Server

Installation
1.Clone the repository:
git clone https://github.com/yourusername/todo-task-manager.git
cd todo-task-manager

2.Install dependencies:
npm install
npm install express@^5.1.0
npm install ejs@^3.1.10
npm install method-override@^3.0.0
npm install mysql2@^3.14.1
npm install uuid@^11.1.0

📦 Breakdown of Each Dependency
| Package           | Description                                                      |
| ----------------- | ---------------------------------------------------------------- |
| `express`         | Web framework for Node.js to build server-side logic.            |
| `ejs`             | Embedded JavaScript templating for generating HTML.              |
| `method-override` | Allows support for HTTP verbs like PUT and DELETE in HTML forms. |
| `mysql2`          | MySQL client for Node.js with modern async/await support.        |
| `uuid`            | Generates unique identifiers (used for task IDs in your app).    |


3.Setup the database:
Create a MySQL database named Todo
Run the SQL script from Schema.sql in your MySQL environment

4.Update your MySQL credentials in index.js:
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "YOUR_PASSWORD",
    database: "Todo"
});

5.Start the server:
node index.js

6.Open your browser and go to:
http://localhost:8080/home
