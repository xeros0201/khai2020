

var express = require('express');
var router = express.Router();
var path = require('path');
var app = express();
var bodyParser = require('body-parser');


app.set('views', path.join( __dirname, 'views'));
app.set('view engine', 'ejs');



var PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var session = require('express-session');
var FileStore = require('session-file-store')(session);
var uuid = require('uuid');
var fileStoreOptions = {};
var sessOptions = {
    genid: function(req) {
        return uuid.v4(); // use UUIDs for session IDs
    },
    store: new FileStore(fileStoreOptions),
    secret: 'AdTekDev - NNTu',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000,
    }
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
}

app.use(session( sessOptions ));




app.use(function sessionLog (req, res, next) {

    //req.sessionOptions.maxAge = req.session.maxAge || req.sessionOptions.maxAge;

    console.log('\n\t REQ: ',
    req.session,
    req.sessionID,
    Date().toString());
    next();
})



var homeControl = require('./controllers/homeController');
app.get( '/', homeControl );

/*--- Admin ---*/
var adminControl = require('./controllers/adminController');
app.use('/admin', adminControl );

/*--- Product ---*/
var productControl = require('./controllers/productController');
app.use('/product', productControl );

/*--- Order ---*/
var orderControl = require('./controllers/orderController');
app.use('/order', orderControl );

/*--- Report ---*/
var reportControl = require('./controllers/reportController');
app.use('/report', reportControl );


/*--- WEB QR Code ---*/
var qrcodeControl = require('./controllers/qrcodeController');
app.use('/qr', qrcodeControl );


/*--- User ---*/
var userControl = require('./controllers/userController');
app.use('/user', userControl );

/*--- Session ---*/
var sessionControl = require('./controllers/sessionController');
app.use('/session', sessionControl );




app.listen( PORT);
