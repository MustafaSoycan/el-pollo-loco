let level1;

function initLevel() {

level1 = new Level(
    createLevelEnemies(),
    createClouds(),
    createBackgroundObjects(),
    createSalsaBottles(),
    createCoins()
);
}

// Erstellt Feinde
function createLevelEnemies() {
    return [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new Endboss(),
    ]
}

// Erstellt Wolken
function createClouds() {
    return [
        new Cloud(500),
        new Cloud(1000),
        new Cloud(1500),
        new Cloud(2000),
        new Cloud(2500),
        new Cloud(3000)

    ]
}

// Hintergrundbilder
function createBackgroundObjects() {
    return [
        new BackgroundObject("./img/5_background/layers/air.png", -719),
        new BackgroundObject("./img/5_background/layers/3_third_layer/2.png", -719),
        new BackgroundObject("./img/5_background/layers/2_second_layer/2.png", -719),
        new BackgroundObject("./img/5_background/layers/1_first_layer/2.png", -719),

        new BackgroundObject("./img/5_background/layers/air.png", 0),
        new BackgroundObject("./img/5_background/layers/3_third_layer/1.png", 0),
        new BackgroundObject("./img/5_background/layers/2_second_layer/1.png", 0),
        new BackgroundObject("./img/5_background/layers/1_first_layer/1.png", 0),

        new BackgroundObject("./img/5_background/layers/air.png", 719),
        new BackgroundObject("./img/5_background/layers/3_third_layer/2.png", 719),
        new BackgroundObject("./img/5_background/layers/2_second_layer/2.png", 719),
        new BackgroundObject("./img/5_background/layers/1_first_layer/2.png", 719),

        new BackgroundObject("./img/5_background/layers/air.png", 719 * 2),
        new BackgroundObject("./img/5_background/layers/3_third_layer/1.png", 719 * 2),
        new BackgroundObject("./img/5_background/layers/2_second_layer/1.png", 719 * 2),
        new BackgroundObject("./img/5_background/layers/1_first_layer/1.png", 719 * 2),

        new BackgroundObject("./img/5_background/layers/air.png", 719 * 3),
        new BackgroundObject("./img/5_background/layers/3_third_layer/2.png", 719 * 3),
        new BackgroundObject("./img/5_background/layers/2_second_layer/2.png", 719 * 3),
        new BackgroundObject("./img/5_background/layers/1_first_layer/2.png", 719 * 3),

        new BackgroundObject("./img/5_background/layers/air.png", 719 * 4),
        new BackgroundObject("./img/5_background/layers/3_third_layer/1.png", 719 * 4),
        new BackgroundObject("./img/5_background/layers/2_second_layer/1.png", 719 * 4),
        new BackgroundObject("./img/5_background/layers/1_first_layer/1.png", 719 * 4),

        new BackgroundObject("./img/5_background/layers/air.png", 719 * 5),
        new BackgroundObject("./img/5_background/layers/3_third_layer/2.png", 719 * 5),
        new BackgroundObject("./img/5_background/layers/2_second_layer/2.png", 719 * 5),
        new BackgroundObject("./img/5_background/layers/1_first_layer/2.png", 719 * 5),
    ]
}

// Erstellt Flaschen
function createSalsaBottles() {
    return [
        new SalsaBottle(50),
        new SalsaBottle(50),
        new SalsaBottle(),
        new SalsaBottle(),
        new SalsaBottle(),
        new SalsaBottle(),
        new SalsaBottle(),
        new SalsaBottle(),
        new SalsaBottle(),
        new SalsaBottle()
    ]
}

// Erstellt Coins
function createCoins() {
    return [
        new Coins(50),
        new Coins(50),
        new Coins(100),
        new Coins(100),
        new Coins(150),
        new Coins(150),
        new Coins(200),
        new Coins(200),
        new Coins(250),
        new Coins(250)

    ]
}