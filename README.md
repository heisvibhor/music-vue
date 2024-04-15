# vibhorify-vue

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Demo Video
https://drive.google.com/file/d/1e9ijzaoeh0FrYUm5xVkzOZ8kWig98Taw/view?usp=sharing


### Backend
https://github.com/heisvibhor/flask-song

At the top level resides router, main, app, store that are main files serving the application.

Then each directory for admin, user and creator for their respective functionalities.

Components contain reusable components like music, album and listen.


### Technologies Used

Flask and Flask-RESTful for backend API

Vue-CLI for frontend development

Bootstrap and Bootstrap-Vue CSS

Flask-JWT for authentication

Vue-router, VueX for routing and state management

Celery and Redis for batch jobs

Python SMTP to send mails

Flask-Caching and Redis for caching

Pandas and Matplotlib to generate graphs

SQLalchemy as database engine

SQLite as database

### .env at the top
JWT_SECRET_KEY

EMAIL

PASSWORD

DOMAIN

SECRET_KEY


### .env within
VUE_APP_API="http://127.0.0.1:5001/api"
