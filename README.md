# Blog Platform API

A simple RESTful Blog API with blogs, comments, and user authentication built using Node.js, Express, and MongoDB.

## 🚀 Features

- Blog CRUD (Create, Read, Update, Delete)
- Comments on blogs
- User registration and login (JWT-based)
- Input validation with Joi
- Authentication middleware
- Error handling middleware

## 📦 Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- Joi for validation
- JWT for authentication

## 🔐 Environment Variables

Create a `.env` file in the root:

```
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
```

## 🧪 API Endpoints

### Auth

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT

### Blogs

- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get single blog by ID
- `POST /api/blogs` - Create a blog (Protected)
- `PUT /api/blogs/:id` - Update a blog (Protected)
- `DELETE /api/blogs/:id` - Delete a blog (Protected)
- `GET /api/blogs/tags/all` - Get all tags

### Comments

- `GET /api/comments` - Get all comments
- `GET /api/comments/blog/:blogId` - Get comments for a specific blog
- `GET /api/comments/:id` - Get comment by ID
- `POST /api/comments` - Add comment (Protected)
- `PUT /api/comments/:id` - Update comment (Protected)
- `DELETE /api/comments/:id` - Delete comment (Protected)

## 👨‍💻 Author

**Dushyant Ranjit**  
[GitHub](https://github.com/owlsly18) • [Portfolio](https://dushyantranjit.com.np)
