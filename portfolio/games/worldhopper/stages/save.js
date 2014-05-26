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
    this.GRAVITY = 450;
    this.JUMP_SPEED = -250;
    // game.physics.arcade.gravity.y = this.GRAVITY;




    // ***********************
    // LEVEL ONE
    // ***********************
    game.add.sprite(0, 0, 'background');

    // this.ground = this.game.add.group();
    // for(var x = 0; x < this.game.width; x += 32) {
    //   var groundBlock = this.game.add.sprite(x, this.game.height - 64, 'planet_1');
    //   this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
    //   groundBlock.body.immovable = true;
    //   groundBlock.body.allowGravity = false;
    //   this.ground.add(groundBlock);
    // }
    
    this.planet_1 = this.game.add.sprite((this.game.width/2), this.game.height/2, 'planet_1');
    this.planet_1.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(this.planet_1, Phaser.Physics.ARCADE);
    this.planet_1.body.allowGravity = true;
    // this.planet_1.body.gravity = 10000;
    this.planet_1.body.collideWorldBounds = true;
    this.planet_1.body.immovable = true;
    this.planet_1.scale.setTo(1.3, 1.3);

       // Create player
    this.player = this.game.add.sprite((this.game.width/2), this.game.height - 346, 'player');
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.allowGravity = true; 
    this.player.body.collideWorldBounds = true;
    this.player.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED * 10);
    // this.player.body.drag.setTo(this.DRAG, 0);
    // this.player.body.gravity.y = this.GRAVITY;
    // this.player.body.gravity = new Phaser.Point(this.game.width/2, this.game.height/2);
    // this.player.scale.setTo(1, 1);
    // this.player.animations.add('above', [0], 10, true);
    // this.player.animations.add('below', [2], 10, true);
    // this.player.animations.add('right', [1], 10, true);
    // this.player.animations.add('left',  [3], 10, true);


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
   
    playerHigh = this.player.y < 160;
    playerLow = this.player.y > 287;
    playerRight = this.player.x > 650;
    playerLeft = this.player.x < 170;
    if (playerHigh) {
      this.player.body.gravity.y = this.GRAVITY;
      this.player.frame = 0;
      this.player.body.drag.setTo(this.DRAG, 0);
    } else if (playerLow) {
      this.player.body.gravity.y = -this.GRAVITY;
      this.player.frame = 2;
      this.player.body.drag.setTo(this.DRAG, 0);
    } else {
      this.player.body.gravity.y = 0;
      this.player.body.drag.setTo(0, this.DRAG);
      if (playerRight) {
        this.player.body.gravity.x = -this.GRAVITY;      
      } else if (playerLeft) {
        this.player.body.gravity.x = this.GRAVITY;
      } else {
        this.player.body.gravity.x = 0;
      }
    }

    if (playerRight) {
      // this.player.body.gravity.x = -this.GRAVITY;
      // this.player.body.drag.setTo(0, this.DRAG);
      this.player.frame = 1;
    } else if (playerLeft) {
      this.player.body.gravity.x = this.GRAVITY;
      this.player.frame = 3;
    } else {
      this.player.body.gravity.x = 0;
    }

    var onTheGround = this.player.body.touching.down;
    if ((onTheGround && this.input.keyboard.isDown(Phaser.Keyboard.UP)) || (onTheGround && this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))) {
        this.player.body.velocity.y = this.JUMP_SPEED;
        this.player.body.drag.setTo(this.DRAG, 0);
    } 

    var onTheCeiling = this.player.body.touching.up;
    if ((onTheCeiling && this.input.keyboard.isDown(Phaser.Keyboard.UP)) || (onTheCeiling && this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))) {
        this.player.body.velocity.y = -this.JUMP_SPEED;
        this.player.body.drag.setTo(this.DRAG, 0);
    }

    var onLeft = this.player.body.touching.right;
    if (onLeft) this.player.body.drag.setTo(0, this.DRAG);
    if ((onLeft && this.input.keyboard.isDown(Phaser.Keyboard.UP)) || (onLeft && this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))) {
        this.player.body.velocity.x = this.JUMP_SPEED;
    }

    var onRight = this.player.body.touching.left;
    if (onRight) this.player.body.drag.setTo(0, this.DRAG);
    if ((onRight && this.input.keyboard.isDown(Phaser.Keyboard.UP)) || (onRight && this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))) {
        this.player.body.velocity.x = -this.JUMP_SPEED;
        this.player.body.drag.setTo(0, this.DRAG);
    }

    if (leftInputIsActive()) {
      this.player.body.acceleration.x = -this.ACCELERATION;
    } else if (rightInputIsActive() || (leftInputIsActive() && onTheCeiling)) {
      this.player.body.acceleration.x = this.ACCELERATION;
    } else {
        this.player.body.acceleration.x = 0;
    }

    if ((leftInputIsActive() && onLeft) || (rightInputIsActive() && onRight)) {
      this.player.body.acceleration.y = this.ACCELERATION;
    } else if ((leftInputIsActive() && onRight) || (rightInputIsActive() && onLeft)) {
      this.player.body.acceleration.y = -this.ACCELERATION;
    } else {
      this.player.body.acceleration.y = 0;
    }


    // var onTheGround = this.player.body.touching.down;
    // if ((onTheGround && this.input.keyboard.isDown(Phaser.Keyboard.UP)) || (onTheGround && this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))) {
    //     this.player.body.velocity.y = this.JUMP_SPEED;
    // } 
    // var onTheCeiling = this.player.body.touching.up;
    // if ((onTheCeiling && this.input.keyboard.isDown(Phaser.Keyboard.UP)) || (onTheCeiling && this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))) {
    //     this.player.body.velocity.y = -this.JUMP_SPEED;
    // }
    // var onLeft = this.player.body.touching.right;
    // if ((onLeft && this.input.keyboard.isDown(Phaser.Keyboard.UP)) || (onLeft && this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))) {
    //     this.player.body.velocity.x = this.JUMP_SPEED;
    //     this.player.body.drag.setTo(0, this.DRAG);
    // }

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
