var express = require("express");
var router = express.Router();
var pool = require("./pool");
 

 
 
 
router.post("/chkadminlogin", function (req, res, next) {
   console.log(req.body)
  pool.query(
    "select * from administrator where emailmobile=? and password=?",
    [req.body.emailmobile, req.body.password],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({"status":false,"result":[]})
      } else {
        if (result.length == 0) {
            res.status(200).json({"status":false,"result":[]})
        } else {
            res.status(200).json({"status":true,"result":result})
        }
      }
    }
  );
});

module.exports = router;