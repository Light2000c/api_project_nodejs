const express = require('express');
const app = express();

require('dotenv').config();

const port = process.env.APP_PORT || 5000;

const userRouter = require('./api/users/user.router');

app.use(express.json()); 

app.use('/api/users', userRouter);


app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
});