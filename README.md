# Instructions

go here: https://developer.spotify.com/dashboard/  --> login  --> create project --> copy client id and client secret.

### create ".env" file in server folder, add these three lines:  
  REDIRECT_URI=http://localhost:3000  
  CLIENT_ID=[spotify client id]  
  CLIENT_SECRET=[spotify client secret]  
  
run "npm install" in both server and client folder to install dependencies
  
run "nodemon server.js" in server folder
run "npm start" in client folder
