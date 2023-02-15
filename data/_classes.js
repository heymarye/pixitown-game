class Sprite {
  constructor({ position, image, frames = { max: 1, frequency: 15 }, sprites, animate = false }) {
    this.position = position;
    this.image = image;
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
    this.frames = { ...frames, framesNumber: 0, elapsedFrames: 0 };
    this.sprites = sprites;
    this.animate = animate;
  }

  draw() {
    context.drawImage(
      this.image,
      this.frames.framesNumber * this.width, 
      0, 
      this.image.width / this.frames.max, 
      this.image.height, 
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max, 
      this.image.height 
    );

    if (this.animate) {
      if (this.frames.max > 1) {
        this.frames.elapsedFrames++;
      }
      if (this.frames.elapsedFrames % this.frames.frequency === 0) {
        if (this.frames.framesNumber < this.frames.max - 1) {
          this.frames.framesNumber++;
        } else {
          this.frames.framesNumber = 0;
        }
      }
    }
    return;
  }
}

class Boundary {
  static width = 48;
  static height = 48;

  constructor({ position }) {
    this.position = position;
    this.width = Boundary.width;
    this.height = Boundary.height;
  }

  draw() {
    context.fillStyle = 'rgba(255, 0, 0, 0.0)';
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}