const monsters = {
  Draggle: {
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
    isEnemy: true,
    attacks: [attacks.Tackle]
  },
  Emby: {
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
    name: 'Emby',
    attacks: [attacks.Tackle, attacks.Fireball]
  }
}