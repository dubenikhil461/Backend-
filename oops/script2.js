// inheritance 


class Mammal{
    constructor(name){
        this.name = name ;
        this.type = "warm-blooded"
    }
     eat(){
        console.log(`hey ${this.name} is eating`)
     }
}

class dog extends Mammal{
    constructor(name){
        super(name)
    }
    bark(){
        console.log(`whoooo`)
    }
    eat(){
        console.log(`hey i am ${this.name} eating`) // overridding means same function rename by child classs which is in parent class
    }
}

let dog1 = new dog("ginni")

dog1.bark()
dog1.eat()