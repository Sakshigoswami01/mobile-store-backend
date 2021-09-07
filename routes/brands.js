var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.post("/addbrand",upload.single("brandimage"),function (req, res, next) {
    console.log(req.body);
    pool.query("insert into brands (brandname,brandimage,brandstatus) values(?,?,?)",[req.body.brandname,req.file.originalname,req.body.brandstatus,],function (error, result) {
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


router.get("/listbrand", function (req, res) {
    pool.query("select * from brands", function (error, result) {
      if (error) {
        res.status(500).json({ data: [] });
      } else {
        res.status(200).json({ data: result });
      }
    });
  });

  router.post("/editrecord", upload.single("brandimage"), function (req, res, next) {
    var query = "";
    var bdy = [];
    if (req.file == undefined) {
      query =
        "update ads set brandname=?,brandstatus=? where brandid=?";
      bdy = [
        req.body.brandname,
        req.body.brandstatus,
        req.body.brandid,
      ]
    
  } else {
    query =
    "update ads set brandname=?,brandstatus=?,brandimage=? where brandid=?";
  bdy = [
    req.body.brandname,
    req.body.brandstatus,
    req.file.originalname,
    req.body.brandid,
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
