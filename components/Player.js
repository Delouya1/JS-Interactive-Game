class Player {
    constructor() {
        this.hp = 100;
        this.name = "Jonny the brave";
        this.str = 10;
        this.x = 0;
        this.y = 0;

        console.log("check player ctor")
    }


    getHealth() {
        return `${this.name}'s health is now ${this.hp}!`;
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

    //battle
    battle(monster) {
        //battle until one of them is dead
        while (this.hp > 0 && monster.hp > 0) {
            this.attack(monster);
            monster.attack(this);
            //print the health of both
            console.log(this.getHealth());
            console.log(monster.getHealth());

        }

        //print player and monster stats
        this.printStats();
        //if player is dead
        if (this.hp === 0) {
            console.log("You lost!");
        } else {
            console.log("You won the battle!");
        }
    }

    printStats() {
        console.log(`Name: ${this.name}\nHealth: ${this.hp}\nStrength: ${this.str}`);
    }
}