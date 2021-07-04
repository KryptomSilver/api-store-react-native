# REST API for app store in (react native)

# Pre-requirements:
- Node JS.
    - Install "@babel/node" globally
    - npm
- Mongo DB.
- Extension  VS code ( REST CLIENT )

# Config:
### Node Js
You need to install [Node JS](https://nodejs.org/) and also check if you have also installed npm with next command:
```bash
npm --version
```
Check if node is installed:
```bash
node --version
```
Now we will install the @babel/node package globally:
```bash
npm i -g @babel/node
```

### Mongo DB
Install Mongo DB in [here](https://www.mongodb.com/try/download/community).

### Extension vscode (REST CLIENT) 
Download extension [here](https://marketplace.visualstudio.com/items?itemName=humao.rest-client).

### Create environment variables (.env)
Create a file in the proyect folder with named .env using file called .ENV-EXAMPLE
- Example:
```.env
MONGODB_URI=mongodb://localhost:27017/mydbname
SECRET=pass
PORT=4000 
```

# How to run the proyect 
The first command run the server in mode developer:
```bash 
npm run dev
```
This command executes the build with babel:
```bash
npm run build
```
The next command run the server in mode production (this command needs the build command first):
```bash
npm run start
```