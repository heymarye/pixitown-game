const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const collisionsOnMap = [];
const boundaries = [];

const offset = {
  x: -735,
  y: -625 
};

for (let collision = 0; collision < collisions.length; collision += 70) {
  collisionsOnMap.push(collisions.slice(collision, 70 + collision));
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

collisionsOnMap.forEach((row, rowIndex) => {
  row.forEach((symbol, symbolIndex) => {
    if (symbol === 1025) {
      boundaries.push(
        new Boundary({ 
          position: {
            x: symbolIndex * Boundary.width + offset.x,
            y: rowIndex * Boundary.height + offset.y
      }}));
    }
  });
});

const mapImg = new Image();
mapImg.src = '/assets/pelletTown.png';

const playerImg = new Image();
playerImg.src = '/assets/playerDown.png';

let lastKey = '';

const keys = {
  w: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
  ArrowDown: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
};

window.addEventListener('keydown', ({ keyCode }) => {
  switch (keyCode) {
    case 87: //up
      keys.w.pressed = true;
      lastKey = 'w';
      break;
    case 38:
      keys.ArrowUp.pressed = true;
      lastKey = 'ArrowUp';
      break;
    case 83: //down
      keys.s.pressed = true;
      lastKey = 's';
      break;
    case 40:
      keys.ArrowDown.pressed = true;
      lastKey = 'ArrowDown';
      break;
    case 65: //left
      keys.a.pressed = true;
      lastKey = 'a';
      break;
    case 37:
      keys.ArrowLeft.pressed = true;
      lastKey = 'ArrowLeft';
      break;
    case 68: //right
      keys.d.pressed = true;
      lastKey = 'd';
      break;
    case 39:
      keys.ArrowRight.pressed = true;
      lastKey = 'ArrowRight';
      break;
  }
});

window.addEventListener('keyup', ({ keyCode }) => {
  switch (keyCode) {
    case 87: //up
      keys.w.pressed = false;
      break;
    case 38:
      keys.ArrowUp.pressed = false;
      break;
    case 83: //down
      keys.s.pressed = false;
      break;
    case 40:
      keys.ArrowDown.pressed = false;
      break;
    case 65: //left
      keys.a.pressed = false;
      break;
    case 37:
      keys.ArrowLeft.pressed = false;
      break;
    case 68: //right
      keys.d.pressed = false;
      break;
    case 39:
      keys.ArrowRight.pressed = false;
      break;
  }
});

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

const map = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: mapImg
});

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2
  },
  image: playerImg,
  frames: {
    max: 4
  }
});

function rectangularCollision({ firstRectangle, secondRectangle }) {
  return firstRectangle.position.x + firstRectangle.width >= secondRectangle.position.x &&
  firstRectangle.position.x <= secondRectangle.position.x + secondRectangle.width &&
  firstRectangle.position.y + firstRectangle.height >= secondRectangle.position.y &&
  firstRectangle.position.y <= secondRectangle.position.y + secondRectangle.height;
}

const statics = [map, ...boundaries];  

function animate() {
  window.requestAnimationFrame(animate);
  map.draw();
  boundaries.forEach(boundary => {
    boundary.draw();
  });
  player.draw();
  
  let isMoving = true;
  if (
    (keys.w.pressed && lastKey === 'w') ||
    (keys.ArrowUp.pressed && lastKey === 'ArrowUp')
  ) {
    for (let boundary = 0; boundary < boundaries.length; boundary++) {
      if (rectangularCollision({
        firstRectangle: player,
        secondRectangle: {...boundaries[boundary], 
          position: {
            x: boundaries[boundary].position.x,
            y: boundaries[boundary].position.y + 3
        }}
      })) {
        isMoving = false;
        break;
      }
    }
    if (isMoving) {
      statics.forEach(static => {
        static.position.y += 3;
      });
    }
  } else if (
    (keys.s.pressed && lastKey === 's') ||
    (keys.ArrowDown.pressed && lastKey === 'ArrowDown')
  ) {
    for (let boundary = 0; boundary < boundaries.length; boundary++) {
      if (rectangularCollision({
        firstRectangle: player,
        secondRectangle: {...boundaries[boundary], 
          position: {
            x: boundaries[boundary].position.x,
            y: boundaries[boundary].position.y - 3
        }}
      })) {
        isMoving = false;
        break;
      }
    }
    if (isMoving) {
      statics.forEach(static => {
        static.position.y -= 3;
      });
    }
  } else if (
    (keys.a.pressed && lastKey === 'a') ||
    (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft')
  ) {
    for (let boundary = 0; boundary < boundaries.length; boundary++) {
      if (rectangularCollision({
        firstRectangle: player,
        secondRectangle: {...boundaries[boundary], 
          position: {
            x: boundaries[boundary].position.x + 3,
            y: boundaries[boundary].position.y
        }}
      })) {
        isMoving = false;
        break;
      }
    }
    if (isMoving) {
      statics.forEach(static => {
        static.position.x += 3;
      });
    }
  } else if (
    (keys.d.pressed && lastKey === 'd') ||
    (keys.ArrowRight.pressed && lastKey === 'ArrowRight')
  ) {
    for (let boundary = 0; boundary < boundaries.length; boundary++) {
      if (rectangularCollision({
        firstRectangle: player,
        secondRectangle: {...boundaries[boundary], 
          position: {
            x: boundaries[boundary].position.x - 3,
            y: boundaries[boundary].position.y
        }}
      })) {
        isMoving = false;
        break;
      }
    }
    if (isMoving) {
      statics.forEach(static => {
        static.position.x -= 3;
      });
    }
  }
}
animate();