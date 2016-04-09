var TopDownGame = TopDownGame || {};


TopDownGame.Preload = function(){};

TopDownGame.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    //load game assets
    this.load.tilemap('maze', 'assets/tilemaps/maze.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('dungeon', 'assets/tilemaps/dungeonLast.json', null, Phaser.Tilemap.TILED_JSON);

    this.load.image('gameTiles', 'assets/images/tileset.png');
    this.load.image('dungeonTile', 'assets/images/tilesDun.png');
    this.load.image('greencup', 'assets/images/greencup.png');
    this.load.image('bluecup', 'assets/images/bluecup.png');
    this.load.image('sword', 'assets/images/sword.png');
    this.load.spritesheet('player', 'assets/images/player.png', 32, 48);
    this.load.image('browndoor', 'assets/images/browndoor.png');
    this.load.image('watch', 'assets/images/watch.png');
    this.load.image('treasure', 'assets/images/treasure.png');
    this.load.image('startScreen', 'assets/images/maze2.png');
    this.load.image('winner', 'assets/images/win.png')
    this.load.image('gameOverScreen', 'assets/images/over.png');
    
    //sounds
    this.load.audio('collect', 'assets/audio/coin.mp3');
    this.load.audio('winner', 'assets/audio/win.wav');
    this.load.audio('time', 'assets/audio/time.wav');
    this.load.audio('village', 'assets/audio/village.wav');
    this.load.audio('dungeonSound', 'assets/audio/dungeon.wav');
    
  },
  create: function() {
    this.state.start('StartMenu');
  }
};