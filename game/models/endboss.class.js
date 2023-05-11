class Endboss extends MoveableObject {

    height = 400;
    width = 250;
    y = 60;
    hadFirstContact = false;
    energy = 60;

    // Sounds
    endboss_coming = new Audio ('audio/endboss_soundtrack.mp3');
    end_sound = new Audio('audio/endboss_dead.mp3');
    win = new Audio ('audio/win.mp3');

    offset = {
        top: 80,
        bottom: 20,
        left: 20,
        right: 30
    }

    // Bilder
    IMAGES_SPAWNING = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png',

    ];

    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'

    ];

    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_SPAWNING[0]);
        this.loadImages(this.IMAGES_SPAWNING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 3900;
        this.animate();
    }

    // Animation
    animate() {
        this.endboss_dead = setInterval(() => {      
          this.endbossAnimation();
          this.endbossComing();
          this.endbossOutOfMap();
        }, 150);
      }

    // Endboss stirbt
    playDeadRoutine() {
        this.playAnimation(this.IMAGES_DEAD);
        this.y += 35;
        this.end_sound.play();
    }
    
    endbossAnimation(){
      if (!this.hadFirstContact) {
        this.playAnimation(this.IMAGES_SPAWNING);
      } else if (this.isHurt() && this.energy > 0) {
        this.playAnimation(this.IMAGES_HURT);
        world.bg_music.pause();
      } else if (this.isDead()) {
        this.playDeadRoutine();
        this.stopEndbossComingMusic();
      } else {
        this.playAnimation(this.IMAGES_WALKING);
        this.x -= 20;
      }
    }

    endbossComing(){
      if (this.checkFistContact()) {
        this.hadFirstContact = true;
        world.bg_music.pause();
        this.endboss_coming.play();
      }
    }

    endbossOutOfMap(){
      if (this.y > 440) {
        this.deadEndboss();
        document.getElementById('endScreen').classList.remove('d-none');
        document.getElementById('stats').innerHTML = this.statsScreen();
        world.bg_music.pause();
        this.win.play();
        this.stopEndbossComingMusic();
        stopGame();
      }
    }

    // Endscreen
    statsScreen() {
        return `
        <p >
        <span class="ingameBtnEnd2" onclick="reload()">Back To Menu</span>
        </p>`;
    }

    // Erster Kontakt
    checkFistContact() {
        return world.character.x > 3550 ||
            this.energy < 60
    }

    deadEndboss() {
        setTimeout(() => clearInterval(this.endboss_dead), 200);
    }

    // Endboss Musik
    playEndbossComingMusic() {
        this.endboss_coming.play();
      }
    // Endboss Musik aus  
    stopEndbossComingMusic() {
        this.endboss_coming.pause();
      }
}