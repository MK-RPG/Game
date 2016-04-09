TopDownGame.GameOver = function(game) {
    this.winner;
}

TopDownGame.GameOver.prototype = {

    create: function() {
        this.win = this.add.image(0, 0, 'gameOverScreen');
        this.winner.scale.setTo(0.667,0.667);
        this.winner.inputEnabled = true;
        this.winner.events.onInputDown.addOnce(this.showStartMenu, this);
    },

    showStartMenu: function(pointer) {
        this.state.start('StartMenu');
    }
}