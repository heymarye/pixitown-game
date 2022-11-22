const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const mapImg = new Image();
mapImg.src = '/assets/pelletTown.png';

const foregroundImg = new Image();
foregroundImg.src = '/assets/foreground.png';

const playerImg = new Image();
playerImg.src = '/assets/playerDown.png';

const offset = {
  x: -735,
  y: -625 
};

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

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: foregroundImg
});

const boundaries = [];
const collisionsOnMap = [];

for (let collision = 0; collision < collisions.length; collision += 70) {
  collisionsOnMap.push(collisions.slice(collision, 70 + collision));
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

function rectangularCollision({ firstRectangle, secondRectangle }) {
  return firstRectangle.position.x + firstRectangle.width >= secondRectangle.position.x &&
  firstRectangle.position.x <= secondRectangle.position.x + secondRectangle.width &&
  firstRectangle.position.y + firstRectangle.height >= secondRectangle.position.y &&
  firstRectangle.position.y <= secondRectangle.position.y + secondRectangle.height;
}

const statics = [map, ...boundaries, foreground];  

function animate() {
  window.requestAnimationFrame(animate);
  map.draw();
  boundaries.forEach(boundary => {
    boundary.draw();
  });
  player.draw();
  foreground.draw();
  
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