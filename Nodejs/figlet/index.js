const figlet = require("figlet");

figlet("NIKHIL", function(err,dt){
    if(err){
        console.log("error");
        console.dir(err);
        return 

    }console.log(dt)
});