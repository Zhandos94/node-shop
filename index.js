const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet'); // HTTP header security
const compression = require('compression'); // HTTP header security
const csrf = require('csurf'); // FORM security

const path = require('path');
const exphbs = require('express-handlebars');
const homeRoutes = require('./routes/home');

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(csrf());
app.use(helmet());
app.use(compression());

app.use('/', homeRoutes);


async function start() {
    try {
        const pass = 'g9RiqoDsrttpykhR';
        const PORT = process.env.PORT || 3000;
        const dbUrl = `mongodb+srv://shop-admin:${pass}@cluster0-dbx7i.azure.mongodb.net/test?retryWrites=true&w=majority`;

        await mongoose.connect(dbUrl, {
            useFindAndModify: false
        });

        mongoose.set('useNewUrlParser', true);


        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start();


