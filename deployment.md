# Deployment Guide 
This full-stack application project was deployed on Render. This guide will provide notes on how to deploy this application. You can check out the deployed version of this application [here](https://coffee-brew-log-app-1.onrender.com/). 


## Backend (Django API + SQLite3) 
NOTE: Since this setup is for demo purposes only, we are using Django's built-in ORM via SQLite3, so we don't need any additional configuration for the database like you would for PostgreSQL. 

### Setup
1. Go to Render → **New + > Web Service**.
2. Connect your GitHub repo.
3. Set the environment variables:
   - `DJANGO_SECRET_KEY` = (set a secure random string)
   - `DEBUG` = False
4. Build command:
   ```bash
   pip install -r requirements.txt && python manage.py migrate
   ```
5. Set the root directory to the 'backend' folder:
   ```
   ./backend
   ``` 
6. Start command:
   ```bash
   gunicorn backend.wsgi
   ```
8. Save and deploy


## Frontend (React)
1. Go to Render → New + > Static Site.
2. Connect your GitHub repo.
3. Set the root directory to the 'frontend' folder:
   ```
   ./frontend
   ```
4. Build command:
   ```
   npm install && npm run build
   ```
5. Set the publish directory to:
   ```
   build
   ```
6. Set the environment variable to the backend URL you deployed:
   ```
   REACT_APP_API_URL=https://coffee-brew-log-app.onrender.com/api/brews/
   ```
7. Save and deploy.



## Credit 
[Shingai Dzinotyiweyi](https://github.com/C-CREAD)
