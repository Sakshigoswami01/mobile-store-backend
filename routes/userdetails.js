var express = require("express");
var router = express.Router();
var pool = require("./pool");

/* GET home page. */

router.post("/insertuserdetails", function (req, res, next) {
  pool.query(
    "insert into userdetails set mobileno=?,emailid=?,firstname=?,lastname=?,password=?,addressstatus=false",
    [
      req.body.mobileno,
      req.body.emailid,
      req.body.firstname,
      req.body.lastname,
      req.body.password,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        return res.status(500).json({ result: false });
      } else {
        return res.status(200).json({ result: true });
      }
    }
  );
});

router.post("/updateuserdetails", function (req, res, next) {
  pool.query(
    "update userdetails set address1=?,address2=?,city=?,state=?,zipcode=?,addressstatus=true where mobileno=?",
    [
      req.body.address1,
      req.body.address2,
      req.body.city,
      req.body.state,
      req.body.zipcode,
      req.body.mobileno,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        return res.status(500).json({ result: false });
      } else {
        return res.status(200).json({ result: true });
      }
    }
  );
});




router.post("/chkuserbymobileno", function (req, res, next) {
  pool.query(
    "select * from userdetails where mobileno=?",
    [req.body.mobileno],
    function (error, result) {
      if (error) {
        res.status(500).json({ result: false });
      } else {
        if (result.length == 0) {
          res.status(200).json({ result: false });
        } else {
          res.status(200).json({ result: true, data: result[0] });
        }
      }
    }
  );
});

router.post("/checklogin", function (req, res, next) {
  pool.query(
    "select * from userdetails where mobileno=? and password=?",
    [req.body.mobileno,req.body.password],
    function (error, result) {
      if (error) {
        res.status(500).json({ result: false });
      } else {
        if (result.length == 0) {
          res.status(200).json({ result: false });
        } else {
          res.status(200).json({ result: true, data: result[0] });
        }
      }
    }
  );
});

module.exports = router;
