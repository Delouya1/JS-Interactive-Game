class Monster {
    constructor(x, y) {
        this.name = "Monster";
        this.hp = 20;
        this.str = 12;
        this.x = x;
        this.y = y;
        
    }

    getHealth() {
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

    getCoordinates() {
        return [this.x, this.y];
    }

    printStats() {
        console.log(`Name: ${this.name}\nHealth: ${this.hp}\nStrength: ${this.str}`);
    }

}



