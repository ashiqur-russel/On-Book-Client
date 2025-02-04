<h1 align="center">
    <img alt="Book Shop" title="#BookShop" src="./assets/banner.jpg" />
</h1>

<h1 align="center">
  <a href="#"> Book Shop Application </a>
</h1>

<h3 align="center">A modern e-commerce platform for buying and selling books!</h3>

<p align="center">

  <img alt="Stars" src="https://img.shields.io/github/stars/your-username/book-shop-app?style=social">
  
  <a href="https://github.com/your-username/book-shop-app">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/your-username/book-shop-app">
  </a>
    
  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">

  <a href="https://github.com/your-username">
    <img alt="made by Your Name" src="https://img.shields.io/badge/made%20by-Your%20Name-ff69b4">
  </a>
</p>

<h4 align="center"> 
	 Status: Finished
</h4>

<p align="center">
 <a href="#about">About</a> •
 <a href="#features">Features</a> •
 <a href="#how-it-works">How it works</a> • 
 <a href="#tech-stack">Tech Stack</a> •  
 <a href="#author">Author</a> • 
 <a href="#user-content-license">License</a>
</p>

## About

**Book Shop Application** is a modern e-commerce platform designed for buying and selling books. It features secure user authentication, role-based access control, product management, and a seamless payment system. The platform is responsive, visually appealing, and provides a smooth user experience.

---

## Features

- [x] **User Authentication:**
  - Secure registration and login with JWT token-based authentication.
  - Role-based access control (user and admin roles).
- [x] **Product Management:**
  - Admins can add, update, and delete books.
  - Users can browse, search, and filter books.
- [x] **Order Management:**
  - Users can place orders, track order status, and cancel orders.
  - Admins can manage all orders (view, update, and cancel).
- [x] **Payment Integration:**
  - Integrated with **SurjoPay** for secure payments.
- [x] **Responsive Design:**
  - Fully responsive and works seamlessly on all devices.
- [x] **Product Reviews:**
  - Users can add reviews for books with ratings and comments.

---

## How it works

The project is divided into two parts:

1. **Backend** (another repo) - Handles API requests, database operations, and authentication.
2. **Frontend** (this repo) - Provides the user interface and interacts with the backend.

### Pre-requisites

Before you begin, ensure you have the following tools installed:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/)
- A code editor like [VSCode](https://code.visualstudio.com/)

#### Running the web application (Frontend)

```bash
# Clone this repository
$ git clone https://github.com/your-username/book-shop-app.git

# Access the project folder in your terminal
$ cd book-shop-app

# Install the dependencies
$ npm install

# Run the application in development mode
$ npm start

# The application will open on port 3000 - go to http://localhost:3000
