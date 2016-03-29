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
        this.load.tilemap('map1', 'assets/tilemaps/map1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('gameTiles1', 'assets/images/tileb.png');
        this.load.image('gameTiles2', 'assets/images/tilea2.png');
        this.load.image('gameTiles4', 'assets/images/tile_custom01.png');
        this.load.image('gameTiles5', 'assets/images/023-FarmVillage01.png');
        this.load.image('gameTiles3', 'assets/images/tileb.png');

        this.load.image('player', 'assets/images/player.png');

    },
    create: function() {
        this.state.start('Game');
    }
};