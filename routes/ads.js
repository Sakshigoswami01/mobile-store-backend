var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.post("/adsentry",upload.single("adsimage"),function (req, res, next) {
    console.log(req.body);
    pool.query("insert into ads (adstype,adsimage,adsstatus) values(?,?,?)",[req.body.adstype,req.file.originalname,req.body.status,],function (error, result) {
        if (error) {
          console.log(error);
          res.status(500).json({ RESULT: false });
        } else {
          res.status(200).json({ RESULT: true });
        }
      }
    );
  }
);


router.get("/listads", function (req, res) {
    pool.query("select * from ads", function (error, result) {
      if (error) {
        res.status(500).json({ data: [] });
      } else {
        res.status(200).json({ data: result });
      }
    });
  });

  router.post("/editrecord", upload.single("adsimage"), function (req, res, next) {
    var query = "";
    var bdy = [];
    if (req.file == undefined) {
      query =
        "update ads set adstype=?,adsstatus=? where adsrid=?";
      bdy = [
        req.body.adstype,
        req.body.status,
        req.body.adsid,
      ]
    
  } else {
    query =
    "update ads set adstype=?,adsstatus=?,adsimage=? where adsid=?";
  bdy = [
    req.body.adstype,
    req.body.status,
    req.file.originalname,
    req.body.adsid,
  ]
}
pool.query(query, bdy, function (error, result) {
  if (error) {
    console.log(error);
    return res.status(500).json({ RESULT: false });
  } else {
   return res.status(200).json({ RESULT: true });
  }
  
});
  })



router.post("/deleteads", function (req, res) {
  pool.query(
    "delete from ads where adsid=?",
    [req.body.adsid],
    function (error, result) {
      if (error) {
        console.log(error);
        return res.status(500).json({ status: false });
      } else {
       return res.status(200).json({ status: true });
      }
    
})
})





module.exports = router;
