const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const port = 8008;
const web = require('./routes/web');
require('./db/connectdb');
var flash = require('connect-flash');
var session = require('express-session')

const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
// const { path } = require('./app')
dotenv.config({path:'.env'})
var cors = require('cors')
app.use(cors())

app.use(express.json())
app.use(cookieParser())
// Middleware
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
  secret: 'secret',
  // cookie:{maxAge : 60000},
  resave:false,
  saveUninitialized:false,
  // secret: 'keyboard cat',
  // resave: false,
  // saveUninitialized: false,
  // cookie: { secure: true }
}))

app.use(flash());

// router load
app.use('/',web)


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.get('/home', (req, res) => {
//     res.send('Hello Home!')
//   })

// ejs template
app.set('view engine', 'ejs')

// routing path
// app.get('/',FrontController.home)
// app.get('/login',FrontController.login)
// app.get('/register',FrontController.register)

// public folder setup
app.use(express.static('public'))
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
