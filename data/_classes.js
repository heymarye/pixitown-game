class Sprite {
  constructor({ position, image, frames = { max: 1 } }) {
    this.position = position;
    this.image = image;
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
    this.frames = frames;
  }

  draw() {
    context.drawImage(
      this.image,
      0, 
      0, 
      this.image.width / this.frames.max, 
      this.image.height, 
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max, 
      this.image.height 
    );
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