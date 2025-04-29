const sum = (d, r) => d + r; // Adds two numbers
const mul = (d, r) => d * r; // Multiplies two numbers

let obj = {
  sum: sum,
  mul: mul,
};
// specil object
module.exports = obj;

// module.exports = {
//   sum: sum,
//   mul: mul,
// };

// module.exports.sum = (d, r) => d + r; // Adds two numbers
// module.exports.mul = (d, r) => d * r; // Multiplies two numbers
 
