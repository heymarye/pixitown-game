const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);

const map = new Image();
map.src = '/img/pelletTown.png';

const player = new Image();
player.src = '/img/playerDown.png';

map.onload = () => {
  context.drawImage(map, -735, -600);
  context.drawImage(player,
    0, //x-coordinate to begin cropping from
    0, //y-coordinate to begin cropping from
    player.width / 4, //crop width
    player.height, //crop height
    canvas.width / 2 - (player.width / 4) / 2, //actual x-coordinate
    canvas.height / 2 - player.height / 2, //actual y-coordinate
    player.width / 4, //actual width
    player.height, //actual height
    );
};