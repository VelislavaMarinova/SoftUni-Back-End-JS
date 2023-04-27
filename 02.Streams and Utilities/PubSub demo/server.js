const http=require('http');
const eventBus = require('./eventBus')

const server = http.createServer((req,res)=>{
    console.log('To Do');

    // logger.log('Request: - '+req.url)
    // reporter.collect(`${req.method}-${req.url}`)
    eventBus.publish('request',{method:req.method, url:req.url});
    
    res.end();
});

server.listen(5000);
console.log('Server is listening on port 5000...');