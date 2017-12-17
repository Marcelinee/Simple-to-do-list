const square = function(number){
    return number*number;
};

//const squareArrow =(x) => {
//    return x*x;
//}

const squareArrow = (x) => x*x;

console.log(square(10));
console.log(squareArrow(9));

const fullName = 'Bla Ble';

const getName = (name) => name.split(' ')[0];

console.log(getName(fullName));