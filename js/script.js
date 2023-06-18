const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

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

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: foregroundImg
});

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2
  },
  image: playerDownImg,
  frames: {
    max: 4,
    frequency: 15
  },
  sprites: {
    up: playerUpImg,
    down: playerDownImg,
    left: playerLeftImg,
    right: playerRightImg
  }
});

// const fireball = new Sprite({
//   position: {
//     x: emby.position.x,
//     y: emby.position.y
//   },
//   image: fireballImg,
//   frames: {
//     max: 4,
//     frequency: 10
//   },
//   animate: true
// });

const collisions = [];
const battleZones = [];
const collisionsOnMap = []; //2d array to convert data from json to map
const battleZonesOnMap = [];

for (let collision = 0; collision < collisionsData.length; collision += 70) {
  collisionsOnMap.push(collisionsData.slice(collision, 70 + collision));
}

for (let battleZone = 0; battleZone < battleZonesData.length; battleZone += 70) {
  battleZonesOnMap.push(battleZonesData.slice(battleZone, 70 + battleZone));
}

collisionsOnMap.forEach((row, rowIndex) => {
  row.forEach((symbol, symbolIndex) => {
    if (symbol === 1025) {
      collisions.push(
        new Boundary({ 
          position: {
            x: symbolIndex * Boundary.width + offset.x,
            y: rowIndex * Boundary.height + offset.y
      }}));
    }
  });
});

battleZonesOnMap.forEach((row, rowIndex) => {
  row.forEach((symbol, symbolIndex) => {
    if (symbol === 1025) {
      battleZones.push(
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

const statics = [map, foreground, ...collisions, ...battleZones];  

function animate() {
  const animation = window.requestAnimationFrame(animate);
  map.draw();
  collisions.forEach(boundary => {
    boundary.draw();
  });
  battleZones.forEach(boundary => {
    boundary.draw();
  });
  player.draw();
  foreground.draw();

  let isMoving = true;
  player.animate = false;
  if (battle.initiated) {
    return;
  }
  if (
    (keys.w.pressed && lastKey === 'w') ||
    (keys.ArrowUp.pressed && lastKey === 'ArrowUp')
  ) {
    player.animate = true;
    player.image = player.sprites.up;
    for (let boundary = 0; boundary < collisions.length; boundary++) {
      if (rectangularCollision({
        firstRectangle: player,
        secondRectangle: {...collisions[boundary], 
          position: {
            x: collisions[boundary].position.x,
            y: collisions[boundary].position.y + 3
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
    player.animate = true;
    player.image = player.sprites.down;
    for (let boundary = 0; boundary < collisions.length; boundary++) {
      if (rectangularCollision({
        firstRectangle: player,
        secondRectangle: {...collisions[boundary], 
          position: {
            x: collisions[boundary].position.x,
            y: collisions[boundary].position.y - 3
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
    player.animate = true;
    player.image = player.sprites.left;
    for (let boundary = 0; boundary < collisions.length; boundary++) {
      if (rectangularCollision({
        firstRectangle: player,
        secondRectangle: {...collisions[boundary], 
          position: {
            x: collisions[boundary].position.x + 3,
            y: collisions[boundary].position.y
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
    player.animate = true;
    player.image = player.sprites.right;
    for (let boundary = 0; boundary < collisions.length; boundary++) {
      if (rectangularCollision({
        firstRectangle: player,
        secondRectangle: {...collisions[boundary], 
          position: {
            x: collisions[boundary].position.x - 3,
            y: collisions[boundary].position.y
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

  //battle activation
  if (
    (keys.w.pressed || keys.ArrowUp.pressed) ||
    (keys.s.pressed || keys.ArrowDown.pressed) ||
    (keys.a.pressed || keys.ArrowLeft.pressed) ||
    (keys.d.pressed || keys.ArrowRight.pressed)
  ) {
    for (let boundary = 0; boundary < battleZones.length; boundary++) {
      //activate battle only if the player is halfway in the battle zones
      const overlappingArea = 
      (Math.min(player.position.x + player.width, battleZones[boundary].position.x + battleZones[boundary].width) - 
      Math.max(player.position.x, battleZones[boundary].position.x)) *
      (Math.min(player.position.y + player.height, battleZones[boundary].position.y + battleZones[boundary].height) -
      Math.max(player.position.y, battleZones[boundary].position.y));
      
      if (rectangularCollision({
        firstRectangle: player,
        secondRectangle: battleZones[boundary]
      }) && 
      overlappingArea > (player.width + player.height) / 2 &&
      Math.random() < 0.01 //1% chance to activate a battle
      ) {
        //deactivate current animation loop
        window.cancelAnimationFrame(animation);
        battle.initiated = true;
        gsap.to('#overlappingBackground', {
          opacity: 1,
          repeat: 3,
          yoyo: true,
          duration: 0.4,
          onComplete() {
            gsap.to('#overlappingBackground', {
              opacity: 1,
              duration: 0.4,
              onComplete() {
                //activate a new animation loop
                animateBattle();
                gsap.to('#overlappingBackground', {
                  opacity: 0,
                  duration: 0.4
                });
              }
            });
          }
        });
        break;
      }
    }
  }
}
animate();