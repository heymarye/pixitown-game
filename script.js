const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

context.fillRect(0, 0, canvas.width, canvas.height);

const mapImg = new Image();
mapImg.src = "/img/pelletTown.png";

const playerImg = new Image();
playerImg.src = "/img/playerDown.png";

let lastKey = "";

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

window.addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 87: //up
      keys.w.pressed = true;
      lastKey = "w";
      break;
    case 38:
      keys.ArrowUp.pressed = true;
      lastKey = "ArrowUp";
      break;
    case 83: //down
      keys.s.pressed = true;
      lastKey = "s";
      break;
    case 40:
      keys.ArrowDown.pressed = true;
      lastKey = "ArrowDown";
      break;
    case 65: //left
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case 37:
      keys.ArrowLeft.pressed = true;
      lastKey = "ArrowLeft";
      break;
    case 68: //right
      keys.d.pressed = true;
      lastKey = "d";
      break;
    case 39:
      keys.ArrowRight.pressed = true;
      lastKey = "ArrowRight";
      break;
  }
});

window.addEventListener("keyup", ({ keyCode }) => {
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
  constructor({ position, image }) {
    this.position = position;
    this.image = image;
  }

  draw() {
    context.drawImage(this.image, this.position.x, this.position.y);
  }
}

const map = new Sprite({
  position: {
    x: -735,
    y: -600,
  },
  image: mapImg,
});

function animate() {
  window.requestAnimationFrame(animate);
  map.draw();
  context.drawImage(
    playerImg,
    0, //x-coordinate to begin cropping from
    0, //y-coordinate to begin cropping from
    playerImg.width / 4, //crop width
    playerImg.height, //crop height
    canvas.width / 2 - playerImg.width / 4 / 2, //actual x-coordinate
    canvas.height / 2 - playerImg.height / 2, //actual y-coordinate
    playerImg.width / 4, //actual width
    playerImg.height //actual height
  );

  if (
    (keys.w.pressed && lastKey === "w") ||
    (keys.ArrowUp.pressed && lastKey === "ArrowUp")
  ) {
    map.position.y += 3;
  } else if (
    (keys.s.pressed && lastKey === "s") ||
    (keys.ArrowDown.pressed && lastKey === "ArrowDown")
  ) {
    map.position.y -= 3;
  } else if (
    (keys.a.pressed && lastKey === "a") ||
    (keys.ArrowLeft.pressed && lastKey === "ArrowLeft")
  ) {
    map.position.x += 3;
  } else if (
    (keys.d.pressed && lastKey === "d") ||
    (keys.ArrowRight.pressed && lastKey === "ArrowRight")
  ) {
    map.position.x -= 3;
  }
}
animate();