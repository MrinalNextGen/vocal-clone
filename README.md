
# Vocal Clone

A full-stack blog platform inspired by [Vocal.media](https://vocal.media/), built with **React** (frontend) and **Flask** (backend).  
Create, edit, delete, and favorite stories with a beautiful UI and a robust Python API.

---

## 🚀 Features

- **Create, Edit, Delete Blogs** – Full CRUD functionality
- **Mark as Favorite** – Toggle favorite status for any story
- **Responsive UI** – Clean, mobile-friendly design
- **API Logging** – Backend logs all requests for easy debugging
- **No 404 Placeholder Errors** – Uses remote placeholders for images
- **Instant Updates** – Changes reflect immediately on the homepage

---

## 🗂️ Project Structure

```
vocal-clone/
├── backend/
│   ├── app.py
│   ├── models.py
│   ├── routes.py
│   └── ...
├── src/
│   ├── App.js
│   ├── services/
│   │   └── api.js
│   ├── pages/
│   │   ├── BlogsPage.jsx
│   │   └── EditBlogPage.jsx
│   └── components/ui/
│       ├── button.jsx
│       ├── input.jsx
│       ├── label.jsx
│       └── textarea.jsx
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. **Clone the Repository**

```bash
git clone https://github.com//.git
cd vocal-clone
```

### 2. **Backend Setup (Flask)**

```bash
cd backend
python -m venv venv
# Activate the virtual environment:
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

pip install flask flask-cors
python app.py
```
The backend will run at [http://localhost:5000](http://localhost:5000).

### 3. **Frontend Setup (React)**

```bash
cd ..
npm install
npm start
```
The frontend will run at [http://localhost:3000](http://localhost:3000).

---

## 📝 Usage

- **Create Story**: Click "Create Story", fill out the form, and publish.
- **Edit Story**: Click the edit icon on any story card, make changes, and update.
- **Delete Story**: Click the trash icon and confirm.
- **Favorite**: Click the heart icon to toggle favorite status.

---

## 🔗 API Endpoints

- `GET /api/blogs` – List all blogs
- `POST /api/blogs` – Create a new blog
- `GET /api/blogs/` – Get a specific blog
- `PUT /api/blogs/` – Update a blog
- `DELETE /api/blogs/` – Delete a blog
- `PATCH /api/blogs//favorite` – Toggle favorite
- `GET /api/blogs/favorites` – List favorite blogs

---

## 🖼️ Placeholder Images

This app uses [via.placeholder.com](https://via.placeholder.com/) for fallback images, so you’ll never see 404 errors for missing images.

---

## 🛡️ License

MIT License

---

## 🙌 Credits

- [Vocal.media](https://vocal.media/) for design inspiration
- [React](https://react.dev/) & [Flask](https://flask.palletsprojects.com/)
- [shadcn/ui](https://ui.shadcn.com/) for UI components

---

**Happy blogging! 🚀**
