const battle = new Sprite({
  position: {
    x: 0,
    y: 0 
  },
  image: battleImg,
  initiated: false
});

let battleAnimation;
let draggle;
let emby;
let renderedSprites;
let queue;

function initBattle() {
  document.querySelector('#dialogueBox').style.display = 'none';
  document.querySelector('#enemyHealth').style.width = '100%';
  document.querySelector('#playerHealth').style.width = '100%';
  document.querySelector('#attacksBox').replaceChildren();
  draggle = new Monster(monsters.Draggle);
  emby = new Monster(monsters.Emby);
  renderedSprites = [draggle, emby];
  queue = [];

  emby.attacks.forEach(attack => {
    const button = document.createElement('button');
    button.innerHTML = attack.name;
    document.querySelector('#attacksBox').append(button);
  });

  //event listeners for attacks
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
      //emby (player) attacks
      const selectedAttack = attacks[e.currentTarget.innerHTML];
      emby.attack({
        attack: selectedAttack,
        recipient: draggle,
        renderedSprites
      });
      if (draggle.health <= 0) {
        queue.push(() => {
          draggle.faint();
        });
        queue.push(() => {
          gsap.to('#overlappingBackground', {
            opacity: 1,
            onComplete() {
              cancelAnimationFrame(battleAnimation);
              battle.initiated = false;
              animate();
              document.querySelector('#userInterface').style.display = 'none';
              gsap.to('#overlappingBackground', {
                opacity: 0
              });
            }
          });
        });
      }
      //draggle attacks
      const randomAttack = draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)];
      queue.push(() => {
        draggle.attack({
          attack: randomAttack,
          recipient: emby,
          renderedSprites
        });
        if (emby.health <= 0) {
          queue.push(() => {
            emby.faint();
          });
          queue.push(() => {
            gsap.to('#overlappingBackground', {
              opacity: 1,
              onComplete() {
                cancelAnimationFrame(battleAnimation);
                battle.initiated = false;
                animate();
                document.querySelector('#userInterface').style.display = 'none';
                gsap.to('#overlappingBackground', {
                  opacity: 0
                });
              }
            });
          });
        }
      });
    });
    button.addEventListener('mouseenter', (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML];
      document.querySelector('#attackType').innerHTML = selectedAttack.type;
    });
  });
}

function animateBattle() {
  battleAnimation = window.requestAnimationFrame(animateBattle);
  battle.draw();
  renderedSprites.forEach(sprite => {
    sprite.draw();
  });
}

//initBattle();
//animateBattle();

document.querySelector('#dialogueBox').addEventListener('click', (e) => {
  if (queue.length > 0) {
    queue[0]();
    queue.shift();
  } else {
    e.currentTarget.style.display = 'none';
  }
}); 