# Mern-basic-auth-template (only backend)
It is a basic authentication template made using Node-Express server and Mongodb as database.

Auth is <em>cookie-session</em> based and built with the help of passport.
It also contains helmet package to set http headers for security.

#### Requirements
- Node.js
- Mongodb database Uri (You can create mongo atlas free tier account)

#### Usage
- Create a file with name and extension as `.env` and create following variables in it.
`PORT` port for eg. 5000
`DBSTRING` mongo db uri
`SECRET` any random string
- Installing required packages
```shell
npm install
```
- Starting the server on local Environment
```shell
node index.js
```