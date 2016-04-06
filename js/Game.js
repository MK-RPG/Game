var TopDownGame = TopDownGame || {};

//title screen
TopDownGame.Game = function(){
	this.collectedCoins = 0;
};

TopDownGame.Game.prototype = {
  create: function() {
	  
    this.map = this.game.add.tilemap('maze');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('tiles', 'gameTiles');

    //create layer
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    
    this.backgroundlayer.resizeWorld();
    
    this.blockedLayer = this.map.createLayer('blockedLayer');

    //collision on blockedLayer
    this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');

    //resizes the game world to match the layer dimensions
    
    
    this.createItems();
    this.createDoors();    

    //create player
    var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer')
    this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
    this.game.physics.arcade.enable(this.player);
    this.player.body.drag = 300;
    
    //var rectangle = new Phaser.Rectangle(0,0,160,160);
    //this.game.camera.bounds = rectangle;
   // this.game.camera.follow(this.player);
    
    

    //the camera will follow the player in the world
    this.game.camera.follow(this.player);

    //move player with cursor keys
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.text = this.game.add.text(20, 20, "Coins: ", { font: "50px Arial", fill: "#ff0044", align: "center" });
	this.text.fixedToCamera = true;
	
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

  //find objects in a Tiled layer that containt a property called "type" equal to a certain value
  findObjectsByType: function(type, map, layer) {
    var result = new Array();
    map.objects[layer].forEach(function(element){
      if(element.properties.type === type) {
        //Phaser uses top left, Tiled bottom left so we have to adjust
        //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
        //so they might not be placed in the exact position as in Tiled
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
      
      
  },
  update: function() {
	 var _this=this;
	 
    //collision
    this.game.physics.arcade.collide(this.player, this.blockedLayer);
    this.game.physics.arcade.overlap(this.player, this.items, function(player,collectable){
    	_this.collectedCoins++;
    	_this.text.text = 'Coins: ' + _this.collectedCoins;
    	collectable.destroy();
    });
    this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, null, this);

    //player movement
    
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;


    if(this.cursors.up.isDown) {
    	this.player.body.velocity.y = -140;
    }
    if(this.cursors.down.isDown) {
    	this.player.body.velocity.y = 140;
    }
    if(this.cursors.left.isDown) {
    	this.player.body.velocity.x = -140;
    }
    if(this.cursors.right.isDown) {
    	this.player.body.velocity.x = 140;
    }
  },
  collect: function(player, collectable) {
    //console.log('yummy!');

  },
  enterDoor: function(player, door) {
    console.log('entering door that will take you to '+door.targetTilemap+' on x:'+door.targetX+' and y:'+door.targetY);
  },
};