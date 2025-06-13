# Vocal Clone - Frontend

This is the React-based frontend for the Vocal Clone project. It provides a clean, modern user interface for creating, reading, and managing blog posts by interacting with the backend API.

## ✨ Features

-   **Modern UI**: Built with React and modern UI components.
-   **Full CRUD Functionality**: Create, read, update, and delete blog posts seamlessly.
-   **API Integration**: Communicates with the Flask backend API to fetch and manage data.
-   **Responsive Design**: Works well on both desktop and mobile devices.
-   **Docker Support**: Includes a `Dockerfile` for easy containerization and deployment.

## 🛠️ Tech Stack

-   **Framework**: React
-   **Styling**: CSS / Tailwind CSS (or your choice)
-   **API Client**: Axios / Fetch API
-   **Containerization**: Docker, Nginx (for serving the build)
-   **Language**: JavaScript / JSX

## 🚀 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or higher)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   The [backend server](https://github.com/MrinalNextGen/Vocal-Clone-Backend) must be running.

### 1. Clone the Repository

git clone https://github.com/MrinalNextGen/vocal-clone-frontend.git
cd vocal-clone-frontend

### 2. Install Dependencies

npm install


### 3. Configure Environment Variables

Create a `.env` file in the root of the frontend folder to specify the backend API endpoint.

REACT_APP_API_URL=http://localhost:5000/api

### 4. Start the Development Server

npm start

The application will be running and available at `http://localhost:3000`.

### 5. Build for Production

To create an optimized production build, run:

npm run build


This will create a `build/` directory with all the static assets ready for deployment.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
