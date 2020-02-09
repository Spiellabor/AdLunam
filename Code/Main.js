"use strict";
var AdLunam;
(function (AdLunam) {
    AdLunam.fudge = FudgeCore;
    window.addEventListener("load", main);
    AdLunam.score = 0;
    AdLunam.gameOver = false;
    let txtImage;
    let txtPlatform;
    let txtBackground;
    function main() {
        const canvas = document.querySelector("canvas");
        AdLunam.args = new URLSearchParams(location.search);
        spriteSetup();
        AdLunam.fudge.RenderManager.initialize(true, true);
        AdLunam.game = new AdLunam.fudge.Node("Game");
        AdLunam.bullets = new AdLunam.fudge.Node("Bullets");
        AdLunam.astronaut = new AdLunam.Astronaut();
        AdLunam.level = new AdLunam.Level();
        AdLunam.game.appendChild(AdLunam.bullets);
        AdLunam.game.appendChild(AdLunam.astronaut);
        AdLunam.game.appendChild(AdLunam.level);
        AdLunam.game.appendChild(new AdLunam.BackgroundHandler());
        AdLunam.camera = new AdLunam.Camera();
        AdLunam.game.appendChild(AdLunam.camera);
        let viewport = new AdLunam.fudge.Viewport();
        viewport.initialize("Viewport", AdLunam.game, AdLunam.camera.cmpCamera, canvas);
        viewport.draw();
        AdLunam.fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        AdLunam.fudge.Loop.start(AdLunam.fudge.LOOP_MODE.TIME_GAME, 20);
        AdLunam.start();
        function update(_event) {
            if (AdLunam.gameOver)
                AdLunam.end();
            else
                AdLunam.processInput();
            if (Math.round(AdLunam.astronaut.cmpTransform.local.translation.x) > AdLunam.score)
                AdLunam.score = Math.round(AdLunam.astronaut.cmpTransform.local.translation.x);
            //remove bullets from game
            for (let bullet of AdLunam.bullets.getChildren()) {
                if (bullet.hit || bullet.lifetime > 99) {
                    AdLunam.bullets.removeChild(bullet);
                    console.log(AdLunam.bullets);
                }
            }
            if (AdLunam.blockItemDrop) {
                AdLunam.itemDropCounter += 1;
                if (AdLunam.itemDropCounter > 20)
                    AdLunam.blockItemDrop = false;
            }
            viewport.draw();
        }
        function spriteSetup() {
            let images = document.querySelectorAll("img");
            txtImage = new AdLunam.fudge.TextureImage();
            txtImage.image = images[0];
            AdLunam.Astronaut.generateSprites(txtImage);
            AdLunam.Alien.generateSprites(txtImage);
            AdLunam.Item.generateSprites(txtImage);
            AdLunam.Bullet.generateSprites(txtImage);
            txtPlatform = new AdLunam.fudge.TextureImage();
            txtPlatform.image = images[1];
            AdLunam.Platform.generateSprites(txtPlatform);
            txtBackground = new AdLunam.fudge.TextureImage();
            txtBackground.image = images[2];
            AdLunam.Background.generateSprites(txtBackground);
        }
    }
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=Main.js.map