class MoveableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    groundPos = 150;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 35);
    }

    // Ist nicht auf dem Boden
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < this.groundPos;
        }
    }

    // Checkt Kollision
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    // Treffer
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    // Treffer vom Endboss
    hitByEndboss() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    // Verletzt
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //Time difference in ms
        timepassed = timepassed / 1000; //Time difference in s
        return timepassed < 1; //bedeutet: timepassed <5 ist true.
    }

    // Tot
    isDead() {
        return this.energy == 0;
    }

    // Animation abspielen
    playAnimation(images) {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
    }

    // Rechts
    moveRight() {
        this.x += this.speed;
    }

    // Links
    moveLeft() {
        this.x -= this.speed;

    }

    // Sprug höhe
    jump() {
        this.speedY = 30;
    }

}