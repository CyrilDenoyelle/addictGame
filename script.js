$(document).ready(function(){
	var game = new Phaser.Game(600, 580, Phaser.AUTO, "#app", {preload: preload, create: create, update: update});

	var fond,
	seringue,
	bullets,
	player;

	function preload(){
		game.load.image("seringue", "syringe.png");
		game.load.image("fond", "fond.jpg");
		game.load.spritesheet("player", "dude.png", 32, 48);
	}
	function create(){
		game.physics.startSystem(Phaser.Physics.ARCADE);

		fond = game.add.sprite(0, 0, "fond");

		bullets = game.add.group();
		bullets.enableBody = true;

		var seringue = bullets.create( 200, 0, "seringue");
		seringue.body.gravity.y = 600;

		player = game.add.sprite(32, game.world.height - 150, 'player');

		weapon = game.add.weapon(30, 'seringue');
		weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		weapon.bulletSpeed = 600;

		weapon.trackSprite(player, 0, -400)

		weapon.fireRate = 100;

		cursors = game.input.keyboard.createCursorKeys();
		game.physics.arcade.enable(player);

		player.animations.add("left", [0, 1, 2, 3], 10, true);
		player.animations.add("right", [5, 6, 7, 8], 10, true);
	}
	function update(){

		weapon.fire();

		game.physics.arcade.overlap(player, bullets, collectStar, null, this);

		player.body.velocity.x = 0;
		if(cursors.left.isDown){
			player.body.velocity.x = -600;

			player.animations.play('left')
		}
		else if(cursors.right.isDown){
			player.body.velocity.x = 600;

			player.animations.play('right');
		}
		else{
			player.animations.stop();
			player.frame = 4;
		}

		function collectStar(player, seringue){
			seringue.kill();
			// // score+=10;
			// scoreText.text = "Score: " + score;
		}

		game.world.wrap(player, 16);
	}
});