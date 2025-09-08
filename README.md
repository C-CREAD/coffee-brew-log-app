# Coffee Brew Log App
This is a full-stack application project for managing your coffee brews. For more information on how to install this repository locally, refer to the [Installation](##Installation) section. 
To see information on deployment, refer to the [Deployment details](deployment.md).
## Tech Stack 
- Frontend: React & Bootstrap CSS
- Backend: Python and Django
- Database: SQLite3 (with Django built-in ORM)
- Deployed: [Render](https://coffee-brew-log-app-1.onrender.com/)

## Features
1. Create, Read, Update, and Delete operations for managing coffee brews
2. Responsive user interface
3. Filter coffee brews by methods

## Installation
1. Clone the repository
```sh
git clone https://github.com/C-CREAD/coffee-brew-log-app.git
cd coffee-brew-log-app
```

2. Backend Setup (Python and Django)
   - Create a virtual environment, then install all dependencies:
     
     ```sh
     cd backend
     ```
     ```sh
     python -m venv venv
     ```
     ```sh
     source venv/bin/activate
     ```
     ```sh
     pip install -r requirements.txt
     ```
  
   - Create a .env file in the backend directory, then put the following information:
     
     ```sh
     DJANGO_SECRET_KEY='Your Secret Key'
     DEBUG=True
     DATABASE_URL=sqlite:///db.sqlite3
     ```
  
   - Apply all migrations:
     
     ```sh
     python manage.py migrate 
     ```
     
   - Run the backend server:
     
     ```sh
     python manage.py runserver 
     ```
     The backend server should be available at: http://localhost:8000/api/brews/

3. Frontend Setup (React)
   - Install all dependencies:
     
     ```sh
     cd ../frontend
     ```
     ```sh
     npm install
     ```
   - Create a .env file in the frontend directory, then put the following information:
     
     ```sh
     REACT_APP_API_URL=http://localhost:8000/api
     ```
   - Run the frontend server:
     
     ```sh
     npm start
     ```
     The frontend server should be available at: http://localhost:3000/

## Credit
[Shingai Dzinotyiweyi](https://github.com/C-CREAD)
