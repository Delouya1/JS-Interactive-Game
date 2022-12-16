
 class Player {
    constructor(name) {
        this.hp = 100;
        this.name = name;
        this.str = 10;
        this.x = 0;
        this.y = 0;

        console.log("check player ctor")

    }


    getHealth() {
        console.log(`${this.name}'s health is now ${this.hp}!`)

        return `${this.name}'s health is now ${this.hp}!`;
    }

    isAlive() {
        return this.hp !== 0;
    }

    reduceHealth(hp) {
        this.hp -= hp;
        if (this.hp < 0) {
            this.hp = 0;
        }
    }

    attack(opponent) {
        console.log(`${this.name} attacked ${opponent.name}!`);
        opponent.reduceHealth(this.str);
    }



    usePotion(name) {
        //if the name is hp then add +10 hp, if the name is str then add +5 str:



    }

    getCordinates() {
        return [this.x, this.y];
    }


    printStats() {
        console.log(`Name: ${this.name}\nHealth: ${this.hp}\nStrength: ${this.str}`);
    }
}