class Chicken extends MoveableObject {

    height = 80;
    width = 60;
    y = 340;
    energy = 5;
    dead = false;

    // Bilder
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 500 + Math.random() * 3000;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    // Animationsgeschwindigkeit
    animate() {
        this.move = setInterval(() => this.moveLeft(), 1000 / 60);

        this.walking = setInterval(() => {
            if (this.isDead()) {
                this.deadChicken();
                this.playAnimation(this.IMAGES_DEAD);

                setInterval(() => {
                    this.y +=1;
                }, 1000 / 30);
                
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    deadChicken() {
        setTimeout(() => {
            clearInterval(this.move);
            clearInterval(this.walking);
        }, 200);
    }
}