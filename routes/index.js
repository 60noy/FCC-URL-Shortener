const express = require('express');
const router = express.Router();
const randomstring = require('randomstring');
const db = require('../models/url.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




router.get('/:key',(req,res,next)=>{
  db.findOne({key: req.params.key},(err,url)=>{
    console.log('path:'+url);
    if(err)
      next(new Error(err))
    else if(!url)
      return next(new Error('Url is not found'))
      else{
      let score = url.score+1
      url.update({score: score}, (err) =>{
        if(err)
          next(new Error('errow updating url info'))
        res.redirect(url.path)
      })
    }
  })
})

router.post('/api',(req,res,next) =>{
  let path = req.body.path
  let key = randomstring.generate(6)
  let url = new db({
    path,
    key,
    clicks: 0
  })
  console.log('path',path);
  url.save((err)=> {
    if(err)
    return next(new Error(err))
    else
    res.json({message:'success', url: url})
  })

})
module.exports = router;
