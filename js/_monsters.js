const monsters = {
  Draggle: {
    position: {
      x: 800,
      y: 100
    },
    image: {
      src: '/assets/draggleSprite.png'
    },
    frames: {
      max: 4,
      frequency: 35
    },
    animate: true,
    name: 'Draggle',
    isEnemy: true,
    attacks: [attacks.Tackle, attacks.Fireball]
  },
  Emby: {
    position: {
      x: 280,
      y: 325
    },
    image: {
      src: '/assets/embySprite.png'
    },
    frames: {
      max: 4,
      frequency: 35
    },
    animate: true,
    name: 'Emby',
    attacks: [attacks.Tackle, attacks.Fireball]
  }
}