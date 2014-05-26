var load_state = {  
    preload: function() { 
      this.game.load.spritesheet('player', 'assets/playerSheet.png', 26, 26);
      this.game.load.image('planet_1', 'assets/planet_1.png');
      game.load.image('background', 'assets/bg.png');
    },

    create: function() {
        // When all assets are loaded, go to the 'menu' state
        this.game.state.start('level_1');
    }
};
