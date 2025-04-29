const math = require('./mth'); // use actual filename
console.log(math.sum(3,3)); // Output: 7

//cmdline gument which give rry of wht is in it 
// like prompt in browser
const nikh = process.argv;

for(let i =0;i<nikh.length;i++){
    console.log("hello to ",nikh[i])
}
// import directory index.js should be there
const fruits = require("./fruits")
