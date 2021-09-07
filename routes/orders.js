var express = require("express");
var router = express.Router();
var pool = require("./pool");


router.post('/generateorderno', function(req, res, next) {
  
pool.query('insert into generateorderno(orderdate,ordertime,totalamount,emailid,mobileno,paymentmode,transactionid)values(?,?,?,?,?,?,?)',[req.body.orderdate,req.body.ordertime,req.body.totalamt,req.body.emailid,req.body.mobileno,req.body.paymentmode,req.body.transactionid],function(error,result){
if(error)
{
  return res.status(500).json({result:false})
}
else
{
  return res.status(500).json({result:true,orderid:result.insertId})

}
})
  });

router.post("/addorder", function(req, res, next) {
   q = 
   "insert into orders(orderid,orderdate,ordertime,mobileno,emailid,username,addressone,addresstwo,state,city,productid,productname,rate,amount,paymentmode,qtydemand,totalamount,deliverystatus,transactionid)values ?"
    pool.query(q,[req.body.cart.map((item)=>[
      req.body.orderid,
      req.body.orderdate,
      req.body.ordertime,
      req.body.mobileno,
      req.body.emailid,
      req.body.username,
      req.body.addressone,
      req.body.addresstwo,
      req.body.state,
      req.body.city,
      item.productid,
      item.productname,
      item.productrate,
      item.offerrate,
      req.body.paymentmode,
      item.qtydemand,
      req.body.totalamount,
      req.body.deliverystatus,
      req.body.transactionid,
    ])
  ],function(error,result){

if(error)
{  console.log(error)

  return res.status(500).json({result:false})
}
else
{
  return res.status(500).json({result:true})

}
  })

    
      });
  
  module.exports = router;
  