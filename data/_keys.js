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