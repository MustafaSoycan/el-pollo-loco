class SmallChicken extends MoveableObject {

    height = 40;
    width = 40;
    speed = 10;
    groundPos = 360;
    energy = 5;
    dead = false;

    // Bilder
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 500 + Math.random() * 3000; // Zahl zwischen 400 und 700
        this.speed = 0.35 + Math.random() * 0.7;
        this.applyGravity();
        this.chickenJump();
        this.animate();
    }

    // Animation
    animate() {
        this.move = setInterval(() => this.moveLeft(), 1000 / 60);
        this.walking = setInterval(() => this.smallChickenWalking(), 200);
    }

    // KLeines Chicken
    smallChickenWalking() {
        if (this.isDead()) {
            this.deadChicken();
            this.playAnimation(this.IMAGES_DEAD);

            setInterval(() => {
                this.y += 1;
            }, 1000 / 30);
            
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    // Totes chICKEN
    deadChicken() {
        setTimeout(() => {
            clearInterval(this.move);
            clearInterval(this.walking);
        }, 200);
    }

    chickenJump() {

        setInterval(() => {
            if (!this.isAboveGround) {
                this.jump();
            }
        }, 1000);
    }
}