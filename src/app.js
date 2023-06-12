const express = require('express');
const path = require('path');
const userRoutes = require('./routes/usersRoutes');
const loggMiddleware =require('./middlewares/auth')

const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');


const PORT = process.env.PORT || 3007;


const mainRoutes = require('./routes/mainRoutes');

const indexRouter = require('./routes/index');

const moviesRoutes = require('./routes/moviesRoutes');
const genresRoutes = require('./routes/genresRoutes');
const app = express();

// view engine setup
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');
// Middlewares
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    // cookie: { maxAge: 60000 } // 60 segundos
}))
app.use(methodOverride('_method'))
app.use(loggMiddleware)
app.use(mainRoutes);
app.use(express.static(path.resolve(__dirname, '../public')));

//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));


app.use('/', indexRouter);
app.use(moviesRoutes);
app.use(genresRoutes);
app.use(userRoutes)
app.use(express.json());

app.listen(PORT, () => {
    console.log("Server running on http://localhost:" + PORT);
});
