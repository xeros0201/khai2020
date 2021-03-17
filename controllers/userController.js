var express = require('express');
var router = express.Router();


/// --- DB CONNECTION OBJ/LIB
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var mongoose = require('mongoose');

/// --- DB Model / Schema
var UserSchema = require('../models/userModel').UserSchema;

/// --- DB config
var dbconfig = require('../configs/config_DB');

/// --- Code CONTROLLERs
router.use(function timeLog (req, res, next) {
    console.log('\n\t USER controller - Time: ', Date().toString());
    next();
})

/// ..................................................
router.get('/', userPage);
function userPage(req, res) {
    res.render('user');
}

/// ..................................................
router.post('/create', userPage);
router.get('/create', userPage);
function userPage(req, res) {

    console.log(
      req.query,
      req.params,
      req.body
    );

    var dataU = {
      _id : new mongoose.Types.ObjectId(),
      username : "",
      password : ""
    };

    if (req.query.username != undefined && req.query.username != null) {
      dataU.username = req.query.username;
    }
  
    if (req.query.password != undefined && req.query.password != null) {
      dataU.password = req.query.password;
    }
  
    if ( dataU.username != "") {
      mongoose.connect( dbconfig.urldb, {useNewUrlParser: true, useUnifiedTopology: true} ,
        function(err) {
          if (err) throw err;
      
          var User = mongoose.model("User", UserSchema, "user");
      
          var newU = new User(dataU);

          newU.save(
      
            function (err) {
              if (err) throw err;
              console.log("\n\t --- create new USER ! ", dataU);
            }
        
          );
        }
      );
    }
  
      
    res.render('user-create');
}


/// ..................................................
router.post('/login', loginPage);
router.get('/login', loginPage);
function loginPage(req, res) {


  console.log(
    req.query,
    req.params,
    req.body
  );


  var xquery = {
    username : "",
    password : ""
  };
  
  if (req.query.username != undefined && req.query.username != null) {
    xquery.username = req.query.username;
  }

  if (req.query.password != undefined && req.query.password != null) {
    xquery.password = req.query.password;
  }

  if ( xquery.username != "") {
    mongoose.connect( dbconfig.urldb, {useNewUrlParser: true, useUnifiedTopology: true} ,
    
      function(err) {
        if (err) throw err;
      
        var User = mongoose.model("User", UserSchema, "user");

        User.findOne( xquery , 
      
          function (err, obj) {
            if (err) throw err;
        
            if (obj == null ) {
              console.log("\n\t--- ko co ", obj, xquery);
            } else {
              console.log("\n\t--- co ton tai 1 Acc ", obj);
              // ghi nhận việc LOGIN thành công
            }
            
          }
        );
      }
    );
  }

    res.render('login');
}



/// ..................................................
router.get('/view', userViewPage);
function userViewPage(req, res) {

    MongoClient.connect( dbconfig.urldb, { useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db( dbconfig.dbname );
            dbo.collection("user").find({}).toArray(function(err, userlist) {
              if (err) throw err;
              
                res.render("user-list",  {
                    title: "ATN-Shop User page", 
                    username: "",
                    users : userlist 
                    , configHeader: null , currpage: "User"
                    });
                console.log('Found:', userlist);

              db.close();
            });
          });

    console.log("\n\t ... connect USER from ", req.connection.remoteAddress, req.headers.host);
}


/// --- EXports
module.exports = router;


