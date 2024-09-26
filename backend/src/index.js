const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3001;  
const authRoutes = require("./routes/auth.route");
const messageRoutes = require("./routes/message.route");
const cookieParser = require("cookie-parser");  
const cors= require("cors");
//cors

//const allowedOrigin=[process.env.FRONT_END_HOST|| "http://localhost:5173"]

//const corsOptions={
  //origin: function (origin, callback) {
    //if(!origin||allowedOrigin.includes(origin)){
      //callback(null, true);
    //}else{
     // callback(new Error('not allowed by CORS'))
    //}
  //},
  //credentials: true
//};
// Middleware
app.use(cors())
//app.options('*', cors(corsOptions))
app.use(express.json());
app.use(cookieParser()); 


// Routes
app.use("/api/message", messageRoutes);
app.use("/api/authRoutes", authRoutes);  

// Start the server
app.listen(port, () => {
  console.log(`Taritinao am ${port} zah tsy m'pa`);
});
