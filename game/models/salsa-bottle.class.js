class SalsaBottle extends MoveableObject {

    height = 80;
    width = 80;
    y = 340;

    offset = {
        top: 10,
        bottom: 10,
        left: 30,
        right: 20,
    };

    // Bilder
    IMAGES_MOVING = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    constructor() {
        super().loadImage('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_MOVING);
        this.x = 500 + Math.random() * 3000; // Zahl zwischen 200 und 700
        this.animate();
    }

    // Animation
    animate() {
        setInterval(() => this.playAnimation(this.IMAGES_MOVING), 400);
    }



}