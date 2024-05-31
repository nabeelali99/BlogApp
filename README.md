# Bloggerz

Bloggerz is a full-featured blog application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). Users can register, login, create, read, update, and delete posts. Additionally, users can like and unlike posts. The application uses JWT (JSON Web Tokens) for authentication and authorization.

## Features

- **User Registration and Login**: Secure user authentication with JWT.
- **Create, Read, Update, Delete (CRUD) Posts**: Users can manage their own blog posts.
- **Like/Unlike Posts**: Users can interact with posts by liking or unliking them.
- **Responsive Design**: A user-friendly and visually appealing interface using Ant Design and Material-UI.
- **Rich Text Editor**: Use `react-draft-wysiwyg` and `react-quill` for post content.
- **Toast Notifications**: Interactive feedback using `react-toastify`.
- **State Management**: Uses React's Context API for state management.

## Technologies and Libraries Used

### Backend

- **Node.js**
- **Express.js**
- **MongoDB**: Database
- **Mongoose**: MongoDB ODM
- **JWT**: JSON Web Token for authentication
- **bcrypt & bcryptjs**: Password hashing
- **multer**: Middleware for handling `multipart/form-data`, used for file uploads
- **cookie-parser**
- **cors**
- **dotenv**

### Frontend

- **React.js**
- **React Router DOM**: For routing
- **Ant Design**: UI framework for beautiful design
- **Material-UI**: Another UI framework for advanced design components
- **react-draft-wysiwyg & react-quill**: Rich text editors
- **react-icons**: Icon library
- **react-loading-skeleton**: For loading placeholders
- **react-toastify**: For toast notifications
- **date-fns**: For date formatting
- **Context API**: For state management

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager) or yarn

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/Bloggerz.git
   cd Bloggerz
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Setup environment variables**:
   Create a `.env` file in the root directory and add the following:
   ```
   PORT=4000
   MONGODBURL=mongodb+srv://nabeelali11101999:07IiXauCC2OnLk7r@cluster0.wroqja1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   SECRET=secretkey
   ```

### Running the Application

1. **Start the backend server**:

   ```bash
   npm run server
   ```

2. **Start the frontend development server**:

   ```bash
   npm start
   ```

3. **Visit the application**:
   Open your browser and go to `http://localhost:3000`

### Scripts

- `npm start`: Starts the frontend development server.
- `npm run server`: Starts the backend server.
- `npm run build`: Builds the app for production.
- `npm test`: Runs the test suite.
