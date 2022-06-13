# Polutan-BackEnd
backend part of Polutan App for Bangkit Capstone Project 2022

## Prerequisite
- Nodejs
- Express
- JSON Web Token
- Google Cloud Platfrom

## Setup 
first, clone this repository
```
git clone clone https://github.com/Polutan/backend-api.git
```
install all dependencies
```
npm install
```
run
```
npm start
```
lastly, open [http://localhost:8080/](http://localhost:8080/)

## Deploy to App Engine
first, open Cloud Shell Editor and clone this repository
```
git clone clone https://github.com/Polutan/backend-api.git
```
add new file ```app.yaml``` then write

```
runtime: nodejs16
```

run
``` 
gcloud app deploy
```

## Endpoints
### /api/user/register
method: ```POST```
Parameters:
- nama
- email
- password

### /api/user/login
method: ```POST```
Parameters:
- email
- password

### /api/predict
method: ```GET```
Parameters:
- auth-token ```header```
