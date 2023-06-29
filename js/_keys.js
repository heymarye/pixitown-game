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

let playSound = false;
window.addEventListener('keydown', ({ keyCode }) => {
  switch (keyCode) {
    case 87: //up
      keys.w.pressed = true;
      lastKey = 'w';
      if (!playSound) {
        audio.map.play();
      }
      playSound = true;
      break;
    case 38:
      keys.ArrowUp.pressed = true;
      lastKey = 'ArrowUp';
      if (!playSound) {
        audio.map.play();
      }
      playSound = true;
      break;
    case 83: //down
      keys.s.pressed = true;
      lastKey = 's';
      if (!playSound) {
        audio.map.play();
      }
      playSound = true;
      break;
    case 40:
      keys.ArrowDown.pressed = true;
      lastKey = 'ArrowDown';
      if (!playSound) {
        audio.map.play();
      }
      playSound = true;
      break;
    case 65: //left
      keys.a.pressed = true;
      lastKey = 'a';
      if (!playSound) {
        audio.map.play();
      }
      playSound = true;
      break;
    case 37:
      keys.ArrowLeft.pressed = true;
      lastKey = 'ArrowLeft';
      if (!playSound) {
        audio.map.play();
      }
      playSound = true;
      break;
    case 68: //right
      keys.d.pressed = true;
      lastKey = 'd';
      if (!playSound) {
        audio.map.play();
      }
      playSound = true;
      break;
    case 39:
      keys.ArrowRight.pressed = true;
      lastKey = 'ArrowRight';
      if (!playSound) {
        audio.map.play();
      }
      playSound = true;
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