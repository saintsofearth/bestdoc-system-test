const express = require('express');
const app = express();
const path = require('path');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const userRoutes = require('./routes/user-routes');

const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', 'views');

// console.log(path.join(__dirname, 'public'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'bestdoc system test api',
            version: '1.0.0'
        }
    },
    apis: ['./routes/user-routes.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(userRoutes);

mongoose.connect("mongodb+srv://apoorv:yGGimfuu3ClqxqeZ@cluster0.djeyr.mongodb.net/bestdoc?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(result => {
        console.log('DB connected');
        app.listen(3000, () => {
            console.log(`Application Server Started`);
        });
    })
    .catch(err => console.log(err));





