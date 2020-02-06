"use strict";
var AdLunam;
(function (AdLunam) {
    var fudge = FudgeCore;
    let ACTION;
    (function (ACTION) {
        ACTION["IDLE"] = "Idle";
        ACTION["WALK"] = "Walk";
        ACTION["JUMP"] = "Jump";
    })(ACTION = AdLunam.ACTION || (AdLunam.ACTION = {}));
    let DIRECTION;
    (function (DIRECTION) {
        DIRECTION[DIRECTION["RIGHT"] = 0] = "RIGHT";
        DIRECTION[DIRECTION["LEFT"] = 1] = "LEFT";
    })(DIRECTION = AdLunam.DIRECTION || (AdLunam.DIRECTION = {}));
    class Astronaut extends fudge.Node {
        constructor() {
            super("Astronaut");
            this.speed = fudge.Vector3.ZERO();
            this.item = AdLunam.ITEM.NONE;
            this.isOnFloor = false;
            this.update = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
                let timeFrame = fudge.Loop.timeFrameGame / 1000;
                this.speed.y += Astronaut.gravity.y * timeFrame;
                let distance = fudge.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.checkCollision();
                if (this.speed.y == 0)
                    this.isOnFloor = true;
                else
                    this.isOnFloor = false;
                this.hitbox.cmpTransform.local.translation = this.cmpTransform.local.translation;
                this.hitbox.cmpTransform.local.translateY(0.55);
                this.hitbox.checkCollision();
            };
            this.addComponent(new fudge.ComponentTransform());
            for (let sprite of Astronaut.sprites) {
                let nodeSprite = new AdLunam.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.appendChild(nodeSprite);
            }
            this.show(ACTION.IDLE, this.item);
            this.hitbox = this.createHitbox();
            AdLunam.game.appendChild(this.hitbox);
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_txtImage) {
            Astronaut.sprites = [];
            //WALKING DEFAULT
            let sprite = new AdLunam.Sprite(ACTION.WALK + "." + AdLunam.ITEM.NONE);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(18, 0, 18, 18), 2, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //IDLE DEFAULT
            sprite = new AdLunam.Sprite(ACTION.IDLE + "." + AdLunam.ITEM.NONE);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 0, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //JUMP DEFAULT
            sprite = new AdLunam.Sprite(ACTION.JUMP + "." + AdLunam.ITEM.NONE);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(54, 0, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //WALKING GUN
            sprite = new AdLunam.Sprite(ACTION.WALK + "." + AdLunam.ITEM.GUN);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(18, 18, 18, 18), 2, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //IDLE GUN
            sprite = new AdLunam.Sprite(ACTION.IDLE + "." + AdLunam.ITEM.GUN);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 18, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //JUMP GUN
            sprite = new AdLunam.Sprite(ACTION.JUMP + "." + AdLunam.ITEM.GUN);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(54, 18, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //WALKING SHIELD
            sprite = new AdLunam.Sprite(ACTION.WALK + "." + AdLunam.ITEM.SHIELD);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(18, 36, 18, 18), 2, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //WALKING SHIELD
            sprite = new AdLunam.Sprite(ACTION.IDLE + "." + AdLunam.ITEM.SHIELD);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 36, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //JUMP SHIELD
            sprite = new AdLunam.Sprite(ACTION.JUMP + "." + AdLunam.ITEM.SHIELD);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(54, 36, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //WALKING JETPACK
            sprite = new AdLunam.Sprite(ACTION.WALK + "." + AdLunam.ITEM.JETPACK);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(18, 54, 17, 18), 2, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //WALKING JETPACK
            sprite = new AdLunam.Sprite(ACTION.IDLE + "." + AdLunam.ITEM.JETPACK);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(0, 54, 18, 18), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
            //JUMP JETPACK
            sprite = new AdLunam.Sprite(ACTION.JUMP + "." + AdLunam.ITEM.JETPACK);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(54, 54, 18, 23), 1, fudge.Vector2.ZERO(), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Astronaut.sprites.push(sprite);
        }
        show(_action, _item) {
            for (let child of this.getChildren())
                child.activate(child.name == _action + "." + _item);
        }
        act(_action, _direction) {
            let direction = (_direction == DIRECTION.RIGHT ? 1 : -1);
            switch (_action) {
                case ACTION.IDLE:
                    this.speed.x = 0;
                    break;
                case ACTION.WALK:
                    this.speed.x = Astronaut.speedMax.x;
                    this.cmpTransform.local.rotation = fudge.Vector3.Y(90 - 90 * direction);
                    break;
                case ACTION.JUMP:
                    if (this.isOnFloor) {
                        this.speed.y = 3;
                        if (_direction != null) {
                            this.speed.x = Astronaut.speedMax.x;
                            this.cmpTransform.local.rotation = fudge.Vector3.Y(90 - 90 * direction);
                        }
                    }
                    break;
            }
            this.show(_action, this.item);
        }
        createHitbox() {
            let hitbox = new AdLunam.Hitbox("PlayerHitbox");
            hitbox.cmpTransform.local.scaleX(0.35);
            hitbox.cmpTransform.local.scaleY(0.55);
            this.hitbox = hitbox;
            return hitbox;
        }
        checkCollision() {
            for (let platform of AdLunam.level.getChildren()) {
                let rect = platform.getRectWorld();
                let hit = rect.isInside(this.cmpTransform.local.translation.toVector2());
                if (hit) {
                    let translation = this.cmpTransform.local.translation;
                    translation.y = rect.y;
                    this.cmpTransform.local.translation = translation;
                    this.speed.y = 0;
                }
            }
        }
    }
    Astronaut.speedMax = new fudge.Vector2(2, 2); // units per second
    Astronaut.gravity = fudge.Vector2.Y(-3);
    AdLunam.Astronaut = Astronaut;
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=Astronaut.js.map