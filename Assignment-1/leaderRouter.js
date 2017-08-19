var express=require('express');
var bodyParser=require('body-parser');

var leaderRouter=express.Router();

leaderRouter.route('/')
.all(function(req,res,next){
    res.writeHead(200,{'Content-Type':'text/plain'});
    next();
})
.get(function(req,res,next){
    res.end("Will send all leaders to you !");
})
.post(function(req,res,next){
    res.end(`Will update leader: ${req.body.name} with details: ${req.body.description}`);
})
.delete(function(res,req,next){
    res.end("Deleting all leaders");
});


leaderRouter.route('/:leaderId')
.all(function(req,res,next){
    res.writeHead(200,{'Content-Type':'text/plain'});
    next();
})
.get(function(req,res,next){
    res.end("Will send details of leader: "+req.params.leaderId+ ' to you !');
})
.put(function(req,res,next){
    res.write('Updating the leader: ' + req.params.leaderId + '\n');
    res.end('Will update the leader: ' + req.body.name + ' with details: ' + req.body.description);
})
.delete(function(res,req,next){
     res.end('Deleting leader: ' + req.params.leaderId);
});


module.exports=leaderRouter;