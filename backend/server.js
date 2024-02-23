require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const ambulanceRoutes = require('./routes/ambulance');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/ambulances', ambulanceRoutes);

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT, () => {
            console.log('Server started on port 3000');
        }); 
    })
    .catch((err) => {
        console.log(err);
    });



