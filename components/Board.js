class Board {
    constructor() {
        this.board = [];
        this.boardSize = 25;
        this.generateBoard();

        this.monsterCount = 0;
        this.itemCount = 0;
        this.player = new Player();
        this.setPlayer();
        this.monsters = [];
        this.items = [];

    }

    generateBoard() {
        for (let i = 0; i < this.boardSize; i++) {
            this.board.push([]);
            for (let j = 0; j < this.boardSize; j++) {
                this.board[i].push(null);
            }
        }
    }

    //setPlayer
    setPlayer() {
        this.board[this.player.x][this.player.y] = this.player;
    }


    addMonster() {
        //randomly generate a monster
        let x = Math.floor(Math.random() * this.boardSize);
        let y = Math.floor(Math.random() * this.boardSize);
        let monster = new Monster(x, y);
        //check if there is already a monster at that location
        if (this.board[x][y] === null) {
            this.board[x][y] = monster;
            this.monsters.push(monster);
            this.monsterCount++;
        } else {
            this.addMonster();
        }

    }


    addItem(name) {
        //randomly generate an item
        let x = Math.floor(Math.random() * this.boardSize);
        let y = Math.floor(Math.random() * this.boardSize);
        let item = new Item(name, x, y);

        //check if there is already an item at that location
        if (this.board[x][y] === null) {
            this.board[x][y] = item;
            this.items.push(item);
            this.itemCount++;
        } else {
            this.addItem(name);
        }

    }


    printBoard() {
        for (let i = 0; i < this.boardSize; i++) {
            let row = "";
            for (let j = 0; j < this.boardSize; j++) {
                if (this.board[i][j] === null) {
                    row += " - ";
                } else if (this.board[i][j] instanceof Monster) {
                    row += " M ";
                } else if (this.board[i][j] instanceof Player) {
                    row += " P ";
                } else if (this.board[i][j] instanceof Item) {
                    row += " I ";
                }
            }
            console.log(row);
        }
    }

    checkForMonster() {
        for (let i = 0; i < this.monsters.length; i++) {
            if (this.monsters[i].x === this.player.x && this.monsters[i].y === this.player.y) {
                return true;
            }
        }
        return false;
    }

    checkForItem() {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].x === this.player.x && this.items[i].y === this.player.y) {
                return true;
            }
        }
        return false;
    }

    battle(monster) {
        //battle until one of them is dead
        while (this.player.hp > 0 && monster.hp > 0) {
            this.player.battle(monster);
        }
        //if the player is dead, end the game
        if (this.player.hp === 0) {
            console.log("You died!");
            return;
        }
    }

    gameLoop() {
        this.printBoard();
        document.addEventListener('keydown', (event) => {
            const keyName = event.key;
            if (keyName === 'ArrowLeft' && this.player.y > 0) {
                this.board[this.player.x][this.player.y] = null;
                this.player.y--;
                this.setPlayer();
            } else if (keyName === 'ArrowRight' && this.player.y < this.boardSize - 1) {
                this.board[this.player.x][this.player.y] = null;
                this.player.y++;
                this.setPlayer();
            } else if (keyName === 'ArrowUp' && this.player.x > 0) {
                this.board[this.player.x][this.player.y] = null;
                this.player.x--;
                this.setPlayer();
            } else if (keyName === 'ArrowDown' && this.player.x < this.boardSize - 1) {
                this.board[this.player.x][this.player.y] = null;
                this.player.x++;
                this.setPlayer();
            } else {
                console.log("You can't move there");
            }
            this.game();

        });
    }


    game() {
        //clear the console every time the player moves
        console.clear();
        this.printBoard();

        //check if there is a monster at the player's location
        if (this.checkForMonster()) {
            //if there is a monster, battle it
            console.log("You encountered a monster!");
            for (let i = 0; i < this.monsters.length; i++) {
                if (this.monsters[i].x === this.player.x && this.monsters[i].y === this.player.y) {
                    this.battle(this.monsters[i]);

                    //remove the monster from the board and the array
                    this.board[this.monsters[i].x][this.monsters[i].y] = null;
                    this.monsters.splice(i, 1);
                    this.monsterCount--;
                }
            }
        }
        //check if there is an item at the player's location
        if (this.checkForItem()) {
            //if there is an item, use it
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].x === this.player.x && this.items[i].y === this.player.y) {
                    //use potion
                    if (this.items[i].name === "hp") {
                        this.player.hp += 10;
                        console.log("You gained 10 hp!");
                    }
                    //use str
                    if (this.items[i].name === "str") {
                        this.player.str += 5;
                        console.log("You gained 5 str!");
                    }

                    //remove the item from the board and the array
                    this.board[this.items[i].x][this.items[i].y] = null;
                    this.items.splice(i, 1);
                    this.itemCount--;
                }
            }
        }

        //if the player been killed by a monster, end the game
        if (this.player.hp === 0) {
            console.log("You died!");
            return;
        }

        //if the player arrived to the exit, end the game
        if (this.player.x === this.boardSize - 1 && this.player.y === this.boardSize - 1) {
            console.log("You won!");
            return;
        }


    }


}


