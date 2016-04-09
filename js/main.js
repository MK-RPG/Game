var TopDownGame = TopDownGame || {};

TopDownGame.game = new Phaser.Game(640, 640, Phaser.AUTO, '');

TopDownGame.game.state.add('Boot', TopDownGame.Boot);
TopDownGame.game.state.add('Preload', TopDownGame.Preload);
TopDownGame.game.state.add('StartMenu',TopDownGame.StartMenu);
TopDownGame.game.state.add('GameOver',TopDownGame.GameOver);
TopDownGame.game.state.add('Game', TopDownGame.Game);
TopDownGame.game.state.add('Dungeon', TopDownGame.Dungeon);

TopDownGame.game.state.start('Boot');
