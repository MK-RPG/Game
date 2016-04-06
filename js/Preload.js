var TopDownGame = TopDownGame || {};

//loading the game assets
TopDownGame.Preload = function(){};

TopDownGame.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    //load game assets
    this.load.tilemap('maze', 'assets/tilemaps/maze.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('gameTiles', 'assets/images/tileset.png');
    this.load.image('greencup', 'assets/images/greencup.png');
    this.load.image('bluecup', 'assets/images/bluecup.png');
    this.load.image('sword', 'assets/images/sword.png');
    this.load.image('player', 'assets/images/player.png');
    this.load.image('browndoor', 'assets/images/browndoor.png');
    this.load.image('space', 'assets/images/space.png');
    
  },
  create: function() {
    this.state.start('Game');
  }
};