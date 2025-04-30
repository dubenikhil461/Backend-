//FACTORY FUNCTION

// function personmaker(name,age){
//     const person ={
//       name : name,
//       age : age,
//       talk(){
//         console.log(`hi ${this.name} is talking`);
//       }
//     }
//     return person;
//   }

//   let p1 = personmaker("nikhil",12); // copy
//   let p2 = personmaker("dubey",32);  // copy

//   console.log(p1.talk===p2.talk);
//  p1.talk()


 // NEW OPERATOR

// constructor
//  function Person(name,age){
//     this.name = name;
//     this.age = age;
//  }

//   // in this both are pointing to same object not seprated hence memory efficiency increses non constant pool
//  let p1 = new Person("nikhil",32);
//  let p2 = new Person("dubey",43)
 
// Person.prototype.talk = function (){
//     console.log(`hi , me ${this.name} is talking`)
// }

// p1.talk();
// p2.talk();
// console.log(p1.talk===p2.talk)  // pointing to same function not own copy in prototype


// classes

class Person{
    constructor(name,age){
        this.name = name;
        this.age = age 
    }
    talk(){
        console.log(`${this.name} is talking`)
    }
}

let p1 = new Person("nikhl",23)
let p2 = new Person("rf",23)
console.log(p1.talk===p2.talk)