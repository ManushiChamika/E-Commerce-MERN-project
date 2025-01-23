const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//TODO middleware setup
app.use(express.json({limit : "25mb"}));
app.use((express.urlencoded({limit: "25mb"})));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({

    origin: "http://localhost:5173",
    credentials: true
}))

//all routes
const authRoutes = require('./src/users/user.route');
app.use('/api/auth', authRoutes);



main().then(()=> console.log("mongo db is successfully connected.")).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL); 
}

app.get('/', (req, res) => {
  res.send('EzyShopper E-Commerce server is running...........!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// root
// admin