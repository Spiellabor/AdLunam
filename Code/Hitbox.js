"use strict";
var AdLunam;
(function (AdLunam) {
    var fudge = FudgeCore;
    class Hitbox extends fudge.Node {
        constructor(_name) {
            if (_name) {
                super(_name);
            }
            else {
                super("Hitbox");
            }
            this.addComponent(new fudge.ComponentTransform());
            //this.addComponent(new fudge.ComponentMaterial(Hitbox.material));
            let cmpMesh = new fudge.ComponentMesh(Hitbox.mesh);
            cmpMesh.pivot = Hitbox.pivot;
            this.addComponent(cmpMesh);
        }
        getRectWorld() {
            let rect = fudge.Rectangle.GET(0, 0, 100, 100);
            let topleft = new fudge.Vector3(-0.5, 0.5, 0);
            let bottomright = new fudge.Vector3(0.5, -0.5, 0);
            let mtxResult = fudge.Matrix4x4.MULTIPLICATION(this.mtxWorld, Hitbox.pivot);
            topleft.transform(mtxResult, true);
            bottomright.transform(mtxResult, true);
            let size = new fudge.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
            rect.position = topleft.toVector2();
            rect.size = size;
            return rect;
        }
        checkCollision() {
            for (let platform of AdLunam.level.getChildren()) {
                for (let child of platform.getChildren()) {
                    if (child.name == "Item" || child.name == "Alien") {
                        let hitbox;
                        if (child.name == "Item")
                            hitbox = child.hitbox;
                        else
                            hitbox = child.hitbox;
                        let hit = false;
                        let rectOfThis = this.getRectWorld();
                        let rectOfThat = hitbox.getRectWorld();
                        let expansionRight = new fudge.Vector2(rectOfThat.size.x);
                        let expansionDown = new fudge.Vector2(0, rectOfThat.size.y);
                        let topRight = fudge.Vector2.SUM(rectOfThat.position, expansionRight);
                        let bottomLeft = fudge.Vector2.SUM(rectOfThat.position, expansionDown);
                        let bottomRight = fudge.Vector2.SUM(rectOfThat.position, expansionDown, expansionRight);
                        if (rectOfThis.isInside(rectOfThat.position)) {
                            hit = true;
                        }
                        else if (rectOfThis.isInside(topRight)) {
                            hit = true;
                        }
                        else if (rectOfThis.isInside(bottomLeft)) {
                            hit = true;
                        }
                        else if (rectOfThis.isInside(bottomRight)) {
                            hit = true;
                        }
                        if (hit && child.name == "Item") {
                            console.log("HIT ITEM");
                            if (AdLunam.astronaut.item == AdLunam.ITEM.NONE) {
                                AdLunam.astronaut.item = child.type;
                                platform.item.activate(false);
                                platform.item = null;
                            }
                        }
                        else if (hit && child.name == "Alien") {
                            console.log("HIT ALIEN");
                            if (AdLunam.astronaut.item == AdLunam.ITEM.SHIELD) {
                                AdLunam.astronaut.item = AdLunam.ITEM.NONE;
                                platform.alien.activate(false);
                                platform.alien = null;
                            }
                        }
                    }
                    else {
                        continue;
                    }
                }
            }
        }
    }
    Hitbox.mesh = new fudge.MeshSprite();
    //private static material: fudge.Material = new fudge.Material("Hitbox", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("red", 0.1)));
    Hitbox.pivot = fudge.Matrix4x4.TRANSLATION(fudge.Vector3.Y(-0.5));
    AdLunam.Hitbox = Hitbox;
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=Hitbox.js.map