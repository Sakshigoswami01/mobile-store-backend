var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.post("/bannerentry",upload.single("bannerimage"),function (req, res, next) {
    console.log(req.body);
    pool.query("insert into banner (bannertype, bannerimage,bannerstatus) values(?,?,?)",[req.body.bannertype,req.file.originalname,req.body.status,],function (error, result) {
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


router.get("/listbanner", function (req, res) {
    pool.query("select * from banner", function (error, result) {
      if (error) {
        res.status(500).json({ data: [] });
      } else {
        res.status(200).json({ data: result });
      }
    });
  });

  router.post("/editrecord", upload.single("bannerimage"), function (req, res, next) {
    var query = "";
    var bdy = [];
    if (req.file == undefined) {
      query =
        "update banner set bannertype=?,bannerstatus=? where bannerid=?";
      bdy = [
        req.body.bannertype,
        req.body.status,
        req.body.bannerid,
      ]
    
  } else {
    query =
    "update banner set bannertype=?,bannerstatus=?,bannerimage=? where bannerid=?";
  bdy = [
    req.body.bannertype,
    req.body.status,
    req.file.originalname,
    req.body.bannerid,
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


router.post("/deletebanner", function (req, res) {
  pool.query(
    "delete from banner where bannerid=?",
    [req.body.bannerid],
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
