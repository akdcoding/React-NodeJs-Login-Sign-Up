var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');

app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var connection = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sampleDB',
});

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
  });

  const upload = multer({storage: storage});

app.get('/', function (req, res) {
    console.log('Connected!');
})

app.get('/userInfo', function (req, res) {
    var userInfo;
    var id = req.query.id;

    connection.getConnection(function (error, tempConnect) {
        if (!!error) {
            tempConnect.release();
            console.error(error);
        } else {

                tempConnect.query("Select * from userInfo where email= '" + id.toString() + "' and password= '" + req.query.password.toString() + "'", function (error, rows, fields) {
    
                tempConnect.release();

                if (!!error) {
                    console.error(error);

                } else {
                    userInfo = JSON.parse(JSON.stringify(rows));

                    let result = userInfo.find(user => user.userID == id);
                    if (result) {
                        res.end({
                            result
                        })
                    }
                }
            });
        }
    });
})

app.post('/userSignUp',upload.single('userPic'), function (req, res) {

    connection.getConnection(function (error, tempConnect) {
        if (!!error) {
            tempConnect.release();
            console.error(error);
        } else {
            console.log('Connected!');

            tempConnect.query("INSERT INTO `userinfo`(`firstName`, `lastName`, `age`, `phoneNumber`, `address`, `email`, `password`, `image`) VALUES ('"
                                                        + req.body.firstName + "','" + req.body.lastName + "'," + req.body.age + "," + req.body.phoneNumber + ",'" + req.body.address + "','" 
                                                        + req.body.email + "','" + req.body.password + "','" +  req.file.path.replace(/\\/g, "/")  + "')", function (error, rows, fields) {
                tempConnect.release();

                if (!!error) {
                    console.error(error);

                } else {
                            res.status(200).send({
                                message: "User Added"
                            })
                        
                    
                }
            });
        }
    });
})

app.get('/userLogin/:username/:password',function(req,res){
    var userInfo;
      connection.getConnection(function (error, tempConnect) {
          if (!!error) {
              tempConnect.release();
              console.error(error);
          } else {
              console.log('Connected!');
  
              tempConnect.query("Select * from userInfo", function (error, rows, fields) {
                  tempConnect.release();
  
                  if (!!error) {
                      console.error(error);
  
                  } else {
                      userInfo = JSON.parse(JSON.stringify(rows));
                      let result = userInfo.find(user => user.email == req.params.username);
                      if (result) {
                          if (result.password == req.params.password) {
                              result.image = "http://localhost:8080/" + result.image

                              res.status(200).send({
                                  body: {
                                      status: 1,
                                      data: result
                                  }
                              })
                          } else {
                              res.status(200).send({
                                  message: 4
                              })
                          }
                      } else {
                          res.status(200).send({
                              message: 3
                          })
                      }
                  }
              });
          }
      });
  });

app.listen(8080);