const battle = new Sprite({
  position: {
    x: 0,
    y: 0 
  },
  image: battleImg,
  initiated: false
});

const draggle = new Sprite({
  position: {
    x: 800,
    y: 100
  },
  image: draggleImg,
  frames: {
    max: 4,
    frequency: 35
  },
  animate: true,
  name: 'Draggle',
  isEnemy: true
});

const emby = new Sprite({
  position: {
    x: 280,
    y: 325
  },
  image: embyImg,
  frames: {
    max: 4,
    frequency: 35
  },
  animate: true,
  name: 'Emby'
});

const renderedSprites = [draggle, emby];

function animateBattle() {
  window.requestAnimationFrame(animateBattle);
  battle.draw();
  renderedSprites.forEach(sprite => {
    sprite.draw();
  });
}

const queue = [];

//event listeners for attacks
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', (e) => {
    const selectedAttack = attacks[e.currentTarget.innerHTML];
    emby.attack({
      attack: selectedAttack,
      recipient: draggle,
      renderedSprites
    });

    queue.push(() => {
      draggle.attack({
        attack: attacks.Tackle,
        recipient: emby,
        renderedSprites
      });
    });
  });
});

document.querySelector('#dialogueBox').addEventListener('click', (e) => {
  if (queue.length > 0) {
    queue[0]();
    queue.shift();
  } else {
    e.currentTarget.style.display = 'none';
  }
}); 