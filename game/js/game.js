let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let soundMuted = false;

// Start Button
function startGame() {
    initLevel();
    init();
    document.getElementById('buttons-for-mobile').classList.remove('d-none');
    document.getElementById('deadScreen').classList.add('d-none');
    setSound();
}

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    document.getElementById('start-screen').classList.add('d-none');
    buttons.classList.add('d-none');
    ingameButtons.classList.remove('d-none');
}

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}


function stopGame() {
    intervalIds.forEach(clearInterval);
}

function togglePopup() {
    document.getElementById('infoControl').classList.remove('d-none');
    document.getElementById('openControl').classList.remove('d-none');
    document.getElementById('control').classList.remove('d-none');
}

function togglePopupClose() {
    document.getElementById('infoControl').classList.add('d-none');
    document.getElementById('openControl').classList.add('d-none');
    document.getElementById('control').classList.add('d-none');

}

function reload() {
    document.getElementById('deadScreen').classList.add('d-none');
    document.getElementById('endScreen').classList.add('d-none');
    document.getElementById('main-game').innerHTML = ``;
    document.getElementById('main-game').innerHTML = htmlTemplate();
    soundMuted = true; // Sound ausschalten
}

function setSound() {
    if (soundMuted) {
        muteSound();
    } else {
        playSound();
    }
}

// Sounds aus
function muteSound() {
    world.bg_music.volume = 0;
    world.character.snore_sound.volume = 0;
    world.character.walking_sound.volume = 0;
    world.character.dead_sound.volume = 0;
    world.coin_sound.volume = 0;
    world.bottle_sound.volume = 0;
    world.dead_chicken.volume = 0;
    world.endboss_hit.volume = 0;
    world.pepe_hurt.volume = 0;
    world.endboss.end_sound.volume = 0;
    world.bottle_sound.volume = 0;
    world.endboss.endboss_coming.volume = 0;
    world.endboss.win.volume = 0;
    world.splash_sound.volume = 0;

    soundMuted = true;
    document.getElementById('background-sound').innerHTML = `<button onclick="playSound()"> <img src="./img/soundoff.png"> </button>`;
}

// Sounds an
function playSound() {
    world.bg_music.volume = 0.1;
    world.character.snore_sound.volume = 1;
    world.character.walking_sound.volume = 1;
    world.character.dead_sound.volume = 1;
    world.coin_sound.volume = 0.5;
    world.bottle_sound.volume = 0.5;
    world.dead_chicken.volume = 1;
    world.endboss_hit.volume = 1;
    world.endboss.end_sound.volume = 1;
    world.pepe_hurt.volume = 1;
    world.bottle_sound.volume = 1;
    world.endboss.endboss_coming.volume = 1;
    world.splash_sound.volume = 1;
    world.endboss.win.volume = 1;

    soundMuted = false;
    document.getElementById('background-sound').innerHTML = `<button onclick="muteSound()"> <img src="./img/soundon.png"> </button>`;
}


window.addEventListener("keydown", (e) => {
    if (e.keyCode == "38") {
        keyboard.UP = true;
    }

    if (e.keyCode == "40") {
        keyboard.DOWN = true;
    }

    if (e.keyCode == "37") {
        keyboard.LEFT = true;
    }

    if (e.keyCode == "39") {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == "32") {
        keyboard.SPACE = true;
    }

    if (e.code == "KeyD") {
        keyboard.D = true;
    }

    if (e.code == "KeyQ") {
        keyboard.Q = true;
    }
});


window.addEventListener("keyup", (e) => {
    if (e.keyCode == "38") {
        keyboard.UP = false;
    }

    if (e.keyCode == "40") {
        keyboard.DOWN = false;
    }

    if (e.keyCode == "37") {
        keyboard.LEFT = false;
    }

    if (e.keyCode == "39") {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == "32") {
        keyboard.SPACE = false;
    }

    if (e.code == "KeyD") {
        keyboard.D = false;
    }

    if (e.code == "KeyQ") {
        keyboard.Q = false;
    }
});

// Handy touch buttons
function mobileTouchControls() {
    document.getElementById("canvas").addEventListener("touchstart", (e) => {
        e.preventDefault();
    });
    mobileButtonLeft();
    mobileButtonRight();
    mobileButtonJump();
    mobileButtonThrow();
}

// Handy touch button LEFT
function mobileButtonLeft() {
    document.getElementById("buttonleft").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById("buttonleft").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
}

// Handy touch button RIGHT
function mobileButtonRight() {
    document.getElementById("buttonright").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById("buttonright").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
}

// Handy touch button JUMP
function mobileButtonJump() {
    document.getElementById("jump").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById("jump").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
}

// Handy touch button THROW
function mobileButtonThrow(){
    document.getElementById("throw").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.D = true;
    });

    document.getElementById("throw").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}


function loadScreen(){
    setTimeout(() => {
        document.getElementById('main-game').classList.remove('d-none');
        document.getElementById('header').classList.remove('d-none');
        document.getElementById('loader').classList.add('d-none');
        document.getElementById('loader2').classList.add('d-none');
        document.getElementById('body').classList.add('background-image');
    }, 3000);
   };


 
