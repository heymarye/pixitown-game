class Sprite {
  constructor({ position, rotation = 0, image, frames = { max: 1, frequency: 15 }, sprites, animate = false, name, isEnemy = false }) {
    this.position = position;
    //this.rotation = rotation;
    this.image = image;
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
    this.frames = { ...frames, framesNumber: 0, elapsedFrames: 0 };
    this.sprites = sprites;
    this.opacity = 1;
    this.animate = animate;
    this.name = name;
    this.health = 100;
    this.isEnemy = isEnemy;
  }

  draw() {
    context.save();
    // context.translate(
    //   this.position.x + this.width / 2, 
    //   this.position.y + this.height / 2
    // );
    // context.rotate(this.rotation);
    // context.translate(
    //   -this.position.x + this.width / 2, 
    //   -this.position.y + this.height / 2
    // );
    context.globalAlpha = this.opacity;
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
    context.restore();

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

  attack({ attack, recipient, renderedSprites }) {
    document.querySelector('#dialogueBox').style.display = 'block';
    document.querySelector('#dialogueBox').innerHTML = this.name + ' used ' + attack.name;

    let healthBar = '#enemyHealth';
    if (this.isEnemy) {
      healthBar = '#playerHealth';
    }
    this.health -= attack.damage;

    // let rotation = 1;
    // if (this.isEnemy) {
    //   rotation = -2.2;
    // }

    let movementDistance = 20;
    if (this.isEnemy) {
      movementDistance = -20;
    }

    switch (attack.name) {
      case 'Tackle':
        const timeline = gsap.timeline();
        timeline.to(this.position, {
          x: this.position.x - movementDistance
        }).to(this.position, {
          x: this.position.x + movementDistance * 2,
          duration: 0.2,
          onComplete: () => {
            //enemy gets hit
            gsap.to(healthBar, {
              width: this.health + '%'
            });
            gsap.to(recipient.position, {
              x: recipient.position.x + movementDistance / 2,
              yoyo: true,
              repeat: 3,
              duration: 0.07
            });
            gsap.to(recipient, {
              opacity: 0,
              yoyo: true,
              repeat: 3,
              duration: 0.07
            });
          }
        }).to(this.position, {
          x: this.position.x
        });
      break;
      case 'Fireball':
        const fireballImg = new Image();
        fireballImg.src = '/assets/fireball.png';

        const fireball = new Sprite({
          position: {
            x: this.position.x,
            y: this.position.y
          },
          //rotation,
          image: fireballImg,
          frames: {
            max: 4,
            frequency: 10
          },
          animate: true
        });

        renderedSprites.splice(1, 0, fireball);
        gsap.to(fireball.position, {
          x: recipient.position.x,
          y: recipient.position.y,
          onComplete: () => {
            gsap.to(healthBar, {
              width: this.health + '%'
            });
            gsap.to(recipient.position, {
              x: recipient.position.x + movementDistance / 2,
              yoyo: true,
              repeat: 3,
              duration: 0.07
            });
            gsap.to(recipient, {
              opacity: 0,
              yoyo: true,
              repeat: 3,
              duration: 0.07
            });
            renderedSprites.splice(1, 1);
          }
        });
      break;
    }
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