class Person {
    constructor(name = 'Anonymous', surname, age) {
        this.name = name;
        this.surname = surname;
        this.age = age;
    }
    getDescription() {
        return `${this.name} ${this.surname} is ${this.age} years old`
    }
}

class Student extends Person {
    constructor(name, surname, age, major) {
        super(name, age);
        this.major = major;

    }

    getDescription() {
        let description = super.getDescription();
    }
}

class Traveler extends Person {
    constructor(name, surname, age, homeLocation) {
        super(name, surname, age);
        this.homeLocation = homeLocation;
    }

    getDescription() {
        let description;
        this.homeLocation ? description = `Hi! I am ${this.name} visiting from ${this.homeLocation}.` : description = `Hi! I am ${this.name}.`;
        return description;
    } 
}
const trav = new Traveler('Lilly', 'Aa', 22, 'Noose');
const me = new Person('Marcelina', 'Mrogala', 24);
//console.log(me.getGreeting());
console.log(trav.getDescription());

