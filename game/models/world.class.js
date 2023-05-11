class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarCoins = new StatusBarCoins();
    statusBarBottles = new StatusBarBottles();
    endboss = level1.enemies[7];

    throwableObjects = [];
    bottleAmount = 0;
    coinAmount = 0;
    throwable = true;
    throwTime = 0;



    // Sounds
    coin_sound = new Audio('./audio/coin.mp3');
    bottle_sound = new Audio('./audio/coin.mp3');
    bg_music = new Audio('./audio/bg-music.mp3');
    dead_chicken = new Audio('./audio/chicken.mp3');
    endboss_hit = new Audio('./audio/chicken_hit.mp3');
    splash_sound = new Audio('./audio/splash.mp3');
    pepe_hurt = new Audio('./audio/pepe_hurt.mp3');

    killedChicken = 0;
    killedSmallChicken = 0;

    collidesWithEndboss = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.bg_music.volume = 0.2; // Setzt die Lautstärke auf 20%
        this.bg_music.play();
    }


    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollisionsBottleWithEndboss();
        }, 200);

        setStoppableInterval(() => {
            this.checkCollisionsChickenFromTopChicken();
            this.checkCollisionSmallChicken();
        }, 1000 / 60);

    }

    checkThrowObjects() {
        if (this.makeBottleThrowable()) {
            this.bottleRoutine();
            setInterval(() => {
                this.throwTime++;
                if (this.throwTime > 25) {
                    this.throwable = true;
                    this.throwTime = 0;
                }
            }, 100);

        }
    }

    makeBottleThrowable() {
        return this.keyboard.D &&
            this.bottleAmount > 0 &&
            this.throwable
    }

    bottleRoutine() {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 180);
        this.throwableObjects.push(bottle);
        this.bottleAmount--;
        this.statusBarBottles.setPercentage(this.bottleAmount);
        this.checkBottleDirection(bottle);
        this.throwable = false;
    }


    // Checkt Kollision
    checkCollisions() {
        this.checkCollisionsEnemy();
        this.checkCollisionsBottle();
        this.checkCollisionsCoin();
    }

    // Check Collisions with Enemy
    checkCollisionsEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.dead) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                this.pepe_hurt.play();
            }
            if (this.character.isColliding(enemy) && enemy instanceof Endboss) {
                this.character.hitByEndboss();
            }
        });
    }

    // Check Collisions with Bottle
    checkCollisionsBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.bottle_sound.play();
                this.bottleAmount++;
                this.hideStuff(bottle);
                this.statusBarBottles.setPercentage(this.bottleAmount);

            }
        }
        );
    }

    // Check Collisions with Coin
    checkCollisionsCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.coin_sound.play();
                this.coinAmount++;
                this.hideStuff(coin);
                this.statusBarCoins.setPercentage(this.coinAmount);

            }
        }
        );
    }

    // Kollision von Chicken
    checkCollisionsChickenFromTopChicken() {
        this.level.enemies.forEach((enemy) => {
            if (this.isCollidingFromAbove(enemy) && enemy instanceof Chicken) {
                this.collisionChickenRoutine(enemy);
                this.killedChicken++;

            }
        });
    }

    // Kollision von kleinem Chicken
    checkCollisionSmallChicken() {
        this.level.enemies.forEach((enemy) => {
            if (this.isCollidingFromAbove(enemy) && enemy instanceof SmallChicken) {
                this.collisionChickenRoutine(enemy);
                this.killedSmallChicken++;

            }
        });
    }

    collisionChickenRoutine(enemy) {
        enemy.hit();
        enemy.dead = true;
        this.dead_chicken.play();
    }

    // Kollision von Oben
    isCollidingFromAbove(mo) {
        return this.character.isColliding(mo) &&
            this.character.isAboveGround() &&
            !this.keyboard.SPACE &&
            !mo.dead &&
            (this.character.currentAnimation !== 'hurt')
    }

    // Checkt Flaschen Richtung
    checkBottleDirection(bottle) {
        if (this.character.otherDirection) {
            bottle.x *= -1;
            bottle.x = this.character.x;
            setInterval(() => bottle.x -= 20, 25);
        }
    }

    // Checkt Kollision mit Endboss
    checkCollisionsBottleWithEndboss() {
        this.throwableObjects.forEach((throwableObjects) => {
            if (this.isCollidingEndboss(throwableObjects)) {
                this.endbossCollisionRoutine();
            }
        });
    }

    // Kollison mit Endboss
    isCollidingEndboss(throwableObjects) {
        return this.endboss.isColliding(throwableObjects) &&
            throwableObjects.heigth != 0 &&
            throwableObjects.width != 0
    }

    // Endboss nach Kollision
    endbossCollisionRoutine() {
        this.endboss.hit();
        this.endboss_hit.play();
        this.collidesWithEndboss = true;
    }

    // Stellt alles dar im Canvas
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarCoins);
        this.ctx.translate(this.camera_x, 0);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarBottles);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        /*mo.drawFrame(this.ctx);*/

        if (mo.otherDirection) {
            this.flipImageBack(mo);

        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    hideStuff(stuff) {
        stuff.height = 0;
        stuff.width = 0;
        stuff.y = 500;
    }
}



