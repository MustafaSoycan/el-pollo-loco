class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    // Lädt die BIlder aufs Canvas
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    loadImages(arr) {
        arr.forEach(path => {


            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
    
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - (this.offset.right + this.offset.left), this.height - (this.offset.top + this.offset.bottom));
            ctx.stroke();
        }
    }

    // Bild vom jeweiligen Balken
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    // Prozente des jeweiligen Balken
    resolveImageIndex() {
        if (this.percentage == 10) {
            return 5;
        } else if (this.percentage >= 7) {
            return 4;
        } else if (this.percentage >= 5) {
            return 3;
        } else if (this.percentage >= 3) {
            return 2;
        } else if (this.percentage >= 1) {
            return 1;
        } else {
            return 0;
        }
    }
}

