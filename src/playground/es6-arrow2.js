const user = {
    name: "Aaa",
    surname: "Bbb",
    cities: ["a", "b", "c"],
    printCities: function() {
        console.log(this.cities);
    }
}

user.printCities();

const multiplier = {
    numbers: [1,2,3,4,5,6],
    multiply() {
        return this.numbers.map((number) => number * 2);
    }
};
console.log(multiplier.multiply());