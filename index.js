const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config() 
const path = require('path');

// Import Routes
const activityRouter = require('./routes/activityRoutes.js');
const userRouter = require('./routes/userRoutes.js');
const authRouter = require('./routes/authRoutes.js');
const statisticRouter=  require('./routes/statisticRoute.js')

const app = express();
const PORT = process.env.PORT;

const corsOption = {
  origin: 'http://localhost:5173'
}

// Middlewares 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors(corsOption));
app.use(express.static('uploads'));

// Use the client app
app.use(express.static(path.join(__dirname,'/client/dist')))

//Render Each view in every get request
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,"/client/dist/index.html"))
})

//
app.use('/Activity', activityRouter);
app.use('/user',userRouter);
app.use('/statistics', statisticRouter);
app.use('/',authRouter);


app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});