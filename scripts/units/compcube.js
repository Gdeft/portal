const gone = newEffect(20, e => {
  Draw.color(Color.valueOf("f0f0f0"), Color.valueOf("f5bfe1"), e.fin());
  Lines.stroke(e.fout() * 5);
  Lines.square(e.x, e.y, 10);
});

var t = this;
t.global.compcubea = 100;
const white = Color.valueOf("ffffff");

const compcube = extendContent(UnitType, "companion-cube", {
  load(){
    this.region = Core.atlas.find(this.name);
  }
});
compcube.weapon = UnitTypes.draug.weapon;
compcube.create(prov(() => extend(GroundUnit, {
  behavior(){
    //Does nothing
  },

  updateTargeting(){
    if(this.target != null) this.target = null;
  },

  onDeath(){
    Effects.effect(gone, this);
    Effects.shake(2, 2, this);

    Sounds.bang.at(this);
    this.item.amount = 0;
    this.drownTime = 0;
    Events.fire(EventType.UnitDestroyEvent(this));
  },

  update(){
    if(this.isDead()){
      this.remove();
      return;
    }

    this.hitTime -= Time.delta();
    if(Vars.net.client()){
      this.interpolate();
      this.status.update(this);
      return;
    }

    if(!this.isFlying() && (Vars.world.tileWorld(this.x, this.y) != null && !(Vars.world.tileWorld(this.x,this.y).block() instanceof BuildBlock) && Vars.world.tileWorld(this.x, this.y).solid())){}
    this.avoidOthers();
    if(this.spawner != this.noSpawner && (Vars.world.tile(this.spawner) == null)){}

    this.updateTargeting();
    this.updateVelocityStatus();

    if(!this.isFlying()){
      this.clampPosition();
    }

    this.stuckTime = !this.vec.set(this.x, this.y).sub(this.lastPosition()).isZero(0.0001) ? 0 : this.stuckTime + Time.delta();
    if(!this.velocity().isZero()){
      this.baseRotation = Mathf.slerpDelta(this.baseRotation, this.velocity().angle(), 0.05);
    }
    if(this.stuckTime < 1.0){
      this.walkTime += Time.delta();
    }
  },

  countsAsEnemy(){
    return false;
  },

  drawStats(){
    if(t.global.compcubea > 0){
      this.drawBackItems(this.item.amount > 0 ? 1 : 0, false);
      this.drawLight();
    }
  },

  draw(){
    Draw.mixcol(white.a(t.global.compcubea / 100), this.hitTime / this.hitDuration);

    var floor = this.getFloorOn();
    if(floor.isLiquid){
      Draw.color(white.a(t.global.compcubea / 100), floor.color.a(t.global.compcubea / 100), 0.5);
    }
    if(floor.isLiquid){
      Draw.color(white.a(t.global.compcubea / 100), floor.color.a(t.global.compcubea / 100), this.drownTime * 0.4);
    } else {
      Draw.color(white.a(t.global.compcubea / 100));
    }

    Draw.rect(this.type.region, this.x, this.y, this.rotation - 90);
    Draw.mixcol();
  }
})));

this.global.compcube = compcube;
