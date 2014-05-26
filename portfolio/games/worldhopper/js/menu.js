var menu_state = {

  create: function() {
    game.add.sprite(0, 0, 'background');

},
    // Start the actual game
    start: function() {
        this.game.state.start('level_1');
    }
};
