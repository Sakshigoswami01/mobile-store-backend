var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.post("/addnewrecord", upload.single("icon"), function (req, res, next) {
  console.log(req.body);
  pool.query(
    "insert into category(categoryname,icon)values(?,?)",
    [
      req.body.categoryname,
      req.file.originalname,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({ RESULT: false });
      } else {
        res.status(200).json({ RESULT: true });
      }
    }
  );
});

router.get("/listcategory", function (req, res) {
  pool.query("select * from category", function (error, result) {
    if (error) {
      console.log(error);
      res.status(500).json({ data: [] });
    } else {
      res.status(200).json({ data: result });
    }
  });
});
router.post("/editrecord", upload.single("icon"), function (req, res, next) {
  console.log(req.body);
  //console.log(req.files)
  var query = "";
    var bdy = [];
    if (req.file == undefined) {
      query =
        "update category set categoryname where categoryid=?";
      bdy = [
        req.body.categoryname,
        req.body.categoryid,

      ]
    
  } else {
    query =
    "update  category set categoryname,icon where categoryid=?";
  bdy = [
    req.body.categoryname,
    req.file.originalname,
    req.body.categoryid,

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

  
router.get("/fetchallcategoryid", function (req, res, next) {
  // for fetching all the records we use get
  pool.query("select * from category", function (error, result) {
    // and for parameterized record we use post method
    if (error) {
      console.log(error);
      res.status(500).json({ data: [] });
    } else {
      console.log(result);
      return res.status(200).json({ data: result });
    }
  });
});


module.exports = router;
