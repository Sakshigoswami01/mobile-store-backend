var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload= require('./multer');

router.post("/addproduct", upload.any(), function(req, res, next){
console.log(req.body)
    pool.query("insert into products (productname, productrate, description1, description2, description3, offerrate, offertype, deliveryamt, color, stock, status, picture,productimage) values(?,?,?,?,?,?,?,?,?,?,?,?,?)", [
        req.body.productname,
        req.body.productrate,
        req.body.description1,
        req.body.description2,
        req.body.description3,
        req.body.offerrate,
        req.body.offertype,
        req.body.deliveryamt,
        req.body.color,
        req.body.stock,
        req.body.status,
        req.files[0].originalname,
        req.files[1].originalname

    ],
    function (error, result) {
        if (error) {
          console.log(error);
          res.status(500).json({RESULT: false });
        } else {
          res.status(200).json({RESULT: true });
        }
      }
    );
  }
  );

  router.get('/listproducts', function(req, res, next){
    pool.query('select * from products', function(error, result){
      if(error){
        console.log(error);
        res.status(500).json({data: []})
      }
      else{
        res.status(200).json({data: result})
      }
    })
  });
  

 
  

  router.post("/editproducts", upload.any(), function (req, res, next) {
    // console.log(req.body);
     //console.log(req.file)
     var query=""
     var bdy=[]
    
     if(req.body.picture !="" && req.body.productimage!="")
     { query= "update products set productname=?,productrate=?,description1=?,description2=?,description3=?,offerrate=?,offertype=?,deliveryamt=?,color=?,stock=?,status=?,picture,productimage where productid=?"
    bdy=    [
      req.body.productname,
      req.body.productrate,
      req.body.description1,
      req.body.description2,
      req.body.description3,
      req.body.offerrate,
      req.body.offertype,
      req.body.deliveryamt,
      req.body.color,
      req.body.stock,
      req.body.status,
      req.files[0].filename,
      req.files[1].filename,
    
     req.body.productid,
   ]
   }
    else
    {
     query= "update products set productname=?,productrate=?,description1=?,description2=?,description3=?,offerrate=?,offertype=?,deliveryamt=?,color=?,stock=?,status=? where productid=?"
     bdy=    [
      req.body.productname,
      req.body.productrate,
      req.body.description1,
      req.body.description2,
      req.body.description3,
      req.body.offerrate,
      req.body.offertype,
      req.body.deliveryamt,
      req.body.color,
      req.body.stock,
      req.body.status,
      req.body.productid,
     ] 
   }
     pool.query(query,
   bdy,
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

  router.post("/delete", upload.any(), function(req, res, next){
   pool.query("delete from  products where productid=?", [req.body.productid], function (error, result) {
    if (error) {
      console.log(error);
      res.status(500).json({ RESULT: false });
    } else {
      res.status(200).json({ RESULT: true });
    }

  })
  })
  

 
  
  module.exports = router;
  