# How to run:
1) run **npm install**
2) run **npm run client:install** 
3) create folder with name **config** in the root folder
4) create file **default.json** in config folder 
5) setup this file

File content example:
```
{
    "port": 5050,
    "jwtSecret": "",
    "expiresIn": "7h",
    "mongoUri": "mongodb+srv://pinkypukich:<password>@mern.z8g9g.mongodb.net/<dbname>?retryWrites=true&w=majority"
}
```
