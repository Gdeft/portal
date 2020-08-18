const key = Packages.arc.input.KeyCode;
const col = require("clib");
const plib = require("portallib")
const config = require("config")

const bluePortalTrail = newEffect(10, e => {
  Draw.color(col.darkBlue, col.lightBlue, e.fin());
  const tcir = new Floatc2({get(x, y){
    Fill.circle(e.x + x, e.y + y, e.fout() * 3);
  }})
  Angles.randLenVectors(e.id, 3, e.fin() * 5, e.rotation, 5, tcir)
});

const bluePortalShoot = newEffect(24, e => {
  Draw.color(col.darkBlue, col.lightBlue, e.fin());
  const cir = new Floatc2({get(x, y){
    Fill.circle(e.x + x, e.y + y, e.fout() * 3);
    Fill.circle(e.x + x, e.y + y, e.fout() * 4);
    }});
  Angles.randLenVectors(e.id, 10, e.finpow() * 40 , e.rotation, 6, cir);
});

const bluePortalHit = newEffect(14, e => {
  Draw.color(col.darkBlue, col.lightBlue, e.fin());

  Lines.stroke(0.5 + e.fout());
  Lines.circle(e.x, e.y, e.fin() * 5);

  Lines.stroke(0.5 + e.fout())
  const hcir = new Floatc2({get(x, y){
    ang = Mathf.angle(x, y)
    Lines.lineAngle(e.x + x, e.y + y, ang, e.fout() * 8 + 3)
    Fill.circle(e.x + x, e.y + y, e.fout() * 5)
  }});
  Angles.randLenVectors(e.id, 3, e.fin() * 25, e.rotation + 7, 7, hcir)
});

const bluePortal = extend(BasicBulletType, {
  draw(b){
    Draw.color(col.darkBlue, col.lightBlue, b.fin())
    for(i = 0; i < 3; i++) Fill.circle(b.x, b.y, 1 + i)
  },

  collides(b, tile){
    if(tile.block() instanceof Door){
      return (!tile.ent().open);
    }
    if(tile.block().solid){
      return true;
    } else {
      return false;
    }
  },

  update(b){
    if(b.timer.get(1, 3)){
      Effects.effect(bluePortalTrail, b.x, b.y, b.rot());
    }
  }
});

bluePortal.lifetime = Number.MAX_VALUE;
bluePortal.damage = 0;
bluePortal.speed = 7;
bluePortal.collidesTeam = true;
bluePortal.shootEffect = bluePortalShoot;
bluePortal.smokeEffect = Fx.none;
bluePortal.hitEffect = bluePortalHit;
bluePortal.despawnEffect = Fx.none;

const portalGun = extendContent(Weapon, "portal-equip", {
  load(){
    this.region = Core.atlas.find("portal-portal-equip")
  }
});

portalGun.length = 1.5;
portalGun.alternate = true;
portalGun.bullet = bluePortal;
portalGun.reload = 60;
portalGun.shootEffect = Fx.none;

const orangePortalTrail = newEffect(10, e => {
  Draw.color(col.darkOrange, col.lightOrange, e.fin());
  const tcir2 = new Floatc2({get(x, y){
    Fill.circle(e.x + x, e.y + y, e.fout() * 3);
  }})
  Angles.randLenVectors(e.id, 3, e.fin() * 5, e.rotation, 5, tcir2)
});

const orangePortalShoot = newEffect(24, e => {
  Draw.color(col.darkOrange, col.lightOrange, e.fin());
  const cir2 = new Floatc2({get(x, y){
    Fill.circle(e.x + x, e.y + y, e.fout() * 3);
    Fill.circle(e.x + x, e.y + y, e.fout() * 4);
    }});
  Angles.randLenVectors(e.id, 10, e.finpow() * 40 , e.rotation, 6, cir2);
});

const orangePortalHit = newEffect(14, e => {
  Draw.color(col.darkOrange, col.lightOrange, e.fin());

  Lines.stroke(0.5 + e.fout());
  Lines.circle(e.x, e.y, e.fin() * 5);

  Lines.stroke(0.5 + e.fout())
  const hcir2 = new Floatc2({get(x, y){
    ang = Mathf.angle(x, y)
    Lines.lineAngle(e.x + x, e.y + y, ang, e.fout() * 8 + 3)
    Fill.circle(e.x + x, e.y + y, e.fout() * 5)
  }});
  Angles.randLenVectors(e.id, 3, e.fin() * 25, e.rotation + 7, 7, hcir2)
});

const orangePortal = extend(BasicBulletType, {
  draw(b){
    Draw.color(col.darkOrange, col.lightOrange, b.fin())
    for(i = 0; i < 3; i++) Fill.circle(b.x, b.y, 1 + i)
  },

  collides(b, tile){
    if(tile.block() instanceof Door){
      return (!tile.ent().open);
    }
    if(tile.block().solid){
      return true;
    } else {
      return false;
    }
  },

  update(b){
    if(b.timer.get(1, 3)){
      Effects.effect(orangePortalTrail, b.x, b.y, b.rot());
    }
  }
});

orangePortal.lifetime = Number.MAX_VALUE;
orangePortal.damage = 0;
orangePortal.speed = 7;
orangePortal.collidesTeam = true;
orangePortal.shootEffect = orangePortalShoot;
orangePortal.smokeEffect = Fx.none;
orangePortal.hitEffect = orangePortalHit;
orangePortal.despawnEffect = Fx.none;

const testSubject = extendContent(Mech, "test-subject", {
  draw(player){
    if(config.showIndicator) this.weapon.bullet == orangePortal ? plib.drawPortal(col.lightOrange, this.indRegion, player.x + 7, player.y + 7, 0) : plib.drawPortal(col.lightBlue, this.indRegion, player.x + 7, player.y + 7, 0)
  },

  updateAlt(player){
    if(Core.input.keyTap(key[config.switchBlue])){
      this.weapon.bullet = bluePortal;
    }

    else if(Core.input.keyTap(key[config.switchOrange])){
      this.weapon.bullet = orangePortal;
    }

    if(player.isBoosting){
      Call.onPlayerDeath(player)
    }
  },

  load(){
    this.super$load();
    this.indRegion = Core.atlas.find("portal-portal-indicator")
  }
});

testSubject.drillPower = 0;
testSubject.mineSpeed = 0;
testSubject.mass = 3.5;
testSubject.speed = 0.5;
testSubject.itemCapacity = 0;
testSubject.hbuildPower = 0.5;
testSubject.flying = false;
testSubject.health = 360;
testSubject.drawCell = false;
testSubject.engineSize = 0;
testSubject.weapon = portalGun;

const subjectPad = extendContent(MechPad, "test-subject-pad", {});

subjectPad.size = 2;
subjectPad.mech = testSubject;
subjectPad.buildVisibility = BuildVisibility.sandboxOnly;
subjectPad.buildTime = 1;
