var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/userLogin/:username/:password',function(req,res){
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
                            res.status(200).send({
                                message: 1
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

module.exports = router;
