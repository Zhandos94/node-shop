const express = require('express');
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

app.use('/', homeRoutes);

const PORT = process.env.PORT || 3000;

const pass = 'g9RiqoDsrttpykhR';
const dbUrl = 'mongodb+srv://shop-admin:<password>@cluster0-dbx7i.azure.mongodb.net/test?retryWrites=true&w=majority';

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

