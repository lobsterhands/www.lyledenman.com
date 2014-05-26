var level_1 = {

    // No more preload, since it is already done in the 'load' state

  create: function() { 
    // ***********************
    // BASIC GAME SETTINGS
    // ***********************
    this.game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.LEFT,
      Phaser.Keyboard.RIGHT,
      Phaser.Keyboard.UP,
      Phaser.Keyboard.DOWN,
      Phaser.Keyboard.SPACEBAR
    ]);
    // Movement constants
    this.MAX_SPEED = 250;
    this.ACCELERATION = 300;
    this.DRAG = 1200;
    this.GRAVITY = 500;
    this.JUMP_SPEED = -250;
    // game.physics.arcade.gravity.y = this.GRAVITY;




    // ***********************
    // LEVEL ONE
    // ***********************
    game.add.sprite(0, 0, 'background');

    this.ground = this.game.add.group();
    for(var x = 0; x < this.game.width; x += 32) {
      var groundBlock = this.game.add.sprite(x, this.game.height - 64, 'planet_1');
      this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
      groundBlock.body.immovable = true;
      groundBlock.body.allowGravity = false;
      this.ground.add(groundBlock);
    }
    
    this.planet_1 = this.game.add.sprite((this.game.width/2), this.game.height/2, 'planet_1');
    this.planet_1.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(this.planet_1, Phaser.Physics.ARCADE);
    this.planet_1.body.allowGravity = true; 
    this.planet_1.body.collideWorldBounds = true;
    this.planet_1.body.immovable = true;
    this.planet_1.scale.setTo(1.3, 1.3);

       // Create player
    this.player = this.game.add.sprite((this.game.width/2), this.game.height - 346, 'player');
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.allowGravity = true; 
    this.player.body.collideWorldBounds = true;
    this.player.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED * 10);
    this.player.body.drag.setTo(this.DRAG, 0);
    this.player.body.gravity.y = this.GRAVITY;
    // this.player.body.gravity = new Phaser.Point(this.game.width/2, this.game.height/2);
    this.player.scale.setTo(1, 1);

    this.position = this.game.add.text(20, 50, '', { font: '16px Arial', fill: '#ffffff' });


    this.game.time.advancedTiming = true;
    this.fpsText = this.game.add.text(
    20, 20, '', { font: '16px Arial', fill: '#ffffff' });

    },


    update: function() {
    this.game.input.onDown.add(showPosition, this);

    if (this.game.time.fps !== 0) 
    { this.fpsText.setText(this.game.time.fps + ' FPS'); }
  
    this.game.physics.arcade.collide(this.player, this.planet_1);
    this.game.physics.arcade.collide(this.player, this.ground);
   
    playerHigh = this.player.y > this.game.height/2;
    playerRight = this.player.x > this.game.width/2;
    if (!playerHigh) {
      this.player.body.gravity.y = this.GRAVITY;
    } else {
      this.player.body.gravity.y = -this.GRAVITY;
    }

    if (leftInputIsActive()) {
      this.player.body.acceleration.x = -this.ACCELERATION;
    } else if (rightInputIsActive()) {
      this.player.body.acceleration.x = this.ACCELERATION;
    } else {
        this.player.body.acceleration.x = 0;
    }

    var onTheGround = this.player.body.touching.down;
    if (onTheGround) this.canDoubleJump = true;
    if ((onTheGround && this.input.keyboard.isDown(Phaser.Keyboard.UP)) || (onTheGround && this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))) {
        this.player.body.velocity.y = this.JUMP_SPEED;
    } 


    function leftInputIsActive() {
      var isActive = false;

      isActive = this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
      isActive |= (this.game.input.activePointer.isDown &&
          this.game.input.activePointer.x < this.game.width/4);

      return isActive;
    }

    function rightInputIsActive() {
      var isActive = false;

      isActive = this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
      isActive |= (this.game.input.activePointer.isDown &&
          this.game.input.activePointer.x > this.game.width/2 + this.game.width/4);

      return isActive;
    }

    function showPosition (pointer) {
      this.x = pointer.x;
      this.y = pointer.y;
      this.position.setText('X: ' + this.x + '\nY: ' + this.y);
    }
  }
};
