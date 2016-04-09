var TopDownGame = TopDownGame || {};


TopDownGame.Dungeon = function(){
	this.collectedCoins = 0;
	
	this.timerText;
    this.timerImage;
    this.seconds = 60;
};

TopDownGame.Dungeon.prototype = {
  create: function() {
	var _this = this;
	  
    this.map = this.game.add.tilemap('dungeon');

    this.map.addTilesetImage('dungeon', 'dungeonTile');

    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    
    this.backgroundlayer.resizeWorld();
    
    this.blockedLayer = this.map.createLayer('blockedLayer');

    //collision on blockedLayer
    this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');
    
    
    
    
    this.createItems();
    this.createDoors();    

    //create player
    var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer')
    this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
    this.player.frame=12;
    this.player.animations.add('up', [12, 13, 14, 15], 10, true);
    this.player.animations.add('bottom', [0, 1, 2, 3], 10, true);
    this.player.animations.add('left', [4, 5, 6, 7], 10, true);
    this.player.animations.add('right', [8, 9, 10, 11], 10, true);
    this.player.animations.play('up');
    
   // var walk = this.player.animations.add('walk');
   //this.player.animations.play('walk', 20, false);

    this.game.physics.arcade.enable(this.player);
    this.player.body.drag = 300;
    

    //camera follows the player
    this.game.camera.follow(this.player);

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.text = this.game.add.text(20, 20, "Coins: ", { font: "30px Arial", fill: "#fff", align: "center" });
	this.text.fixedToCamera = true;
	var timerIndex = null;
    function timer() {
  	 
  	timerIndex = setTimeout(function() {
  		  _this.seconds -= 1;
  		 _this.timerText.setText(_this.seconds);
  		 timer();
  		 
  		 if(_this.seconds <= 0) {
  	            _this.gameOver();
  	            clearInterval(timerIndex);
  	            _this.seconds = 60;
  	            }
  	  },1000);
  	 
    }
    
    timer();
  },
  createItems: function() {
    //create items
    this.items = this.game.add.group();
    this.items.enableBody = true;
    var item;    
    result = this.findObjectsByType('item', this.map, 'objectsLayer');
    result.forEach(function(element){
      this.createFromTiledObject(element, this.items);
    }, this);
  },
  createDoors: function() {
    //create doors
    this.doors = this.game.add.group();
    this.doors.enableBody = true;
    result = this.findObjectsByType('door', this.map, 'objectsLayer');

    result.forEach(function(element){
      this.createFromTiledObject(element, this.doors);
    }, this);
  },

  findObjectsByType: function(type, map, layer) {
    var result = new Array();
    map.objects[layer].forEach(function(element){
      if(element.properties.type === type) {

        element.y -= map.tileHeight;
        result.push(element);
      }      
    });
    return result;
  },
  //create a sprite from an object
  createFromTiledObject: function(element, group) {
    var sprite = group.create(element.x, element.y, element.properties.sprite);

      //copy all properties to the sprite
      Object.keys(element.properties).forEach(function(key){
        sprite[key] = element.properties[key];
      });
      
    //create countdown time
      
      this.timerImage = this.add.image(20, 60, 'watch');
      this.timerImage.fixedToCamera = true;

      //this.timer = 40;
      this.timerText = this.add.text(60, 65,' ', { fontSize: 20, fill: 'white' });
      this.timerText.fixedToCamera = true;
      //console.log(this.timerText);
      
  },
     update: function() {
	 var _this = this;
	 
    //collision
    this.game.physics.arcade.collide(this.player, this.blockedLayer);
    this.game.physics.arcade.overlap(this.player, this.items, function(player,collectable){
    	
    	if(collectable.key == 'greencup') {
    		_this.collectedCoins++;
        	_this.text.text = 'Coins: ' + _this.collectedCoins;

    	}
    	else if(collectable.key == 'bluecup'){
    	      _this.seconds += 10;
    	      _this.timerText.setText(_this.seconds);
    	      
    	    
    	}
    	collectable.destroy();

    	//console.log(collectable);
    });
    this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, null, this);

    //player movement
    
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;


    if(this.cursors.up.isDown) {
    	this.player.body.velocity.y = -140;
    	this.player.animations.play('up');
    }
    if(this.cursors.down.isDown) {
    	this.player.body.velocity.y = 140;
    	this.player.animations.play('bottom');
    }
    if(this.cursors.left.isDown) {
    	this.player.body.velocity.x = -140;
    	this.player.animations.play('left');
    }
    if(this.cursors.right.isDown) {
    	this.player.body.velocity.x = 140;
    	this.player.animations.play('right');
    }
  },
  collect: function(player, collectable) {
    //console.log('Got it!');
	

  },
  enterDoor: function(player, door) {
   // console.log('entering door that will take you to '+door.targetTilemap+' on x:'+door.targetX+' and y:'+door.targetY);
	  this.state.start('winner');
  },
};

TopDownGame.Dungeon.prototype.die = function(){
	this.state.start('DungeonOver');
}

TopDownGame.Dungeon.prototype.gameOver = function(){
	this.state.start('gameOver');
}
    