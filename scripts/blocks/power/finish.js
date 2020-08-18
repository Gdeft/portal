const pressTick = 8; 
const timerId = 0; 
const blockSize = Vars.tilesize;
const fbutton = extendContent(Block, "finish", {
  
  placed(tile) {
    this.super$placed(tile);
    tile.ent().timer.reset(timerId, pressTick + 1);
  },
  
  draw(tile) {
    Draw.rect(Core.atlas.find(this.name + ((tile.ent().timer.check(timerId, pressTick)) ? "":"-on")), tile.drawx(), tile.drawy());
  },
  
  unitOn(tile,unit){
    if(tile.ent().timer.check(timerId, pressTick)) Sounds.place.at(tile.worldx(), tile.worldy());
    tile.ent().timer.reset(timerId, 0);
    
    Call.onGameOver(Vars.player.getTeam());
  },
  
  update(tile){
    this.super$update(tile);
    Units.nearby(tile.worldx(), tile.worldy(), blockSize, blockSize, cons(e => {
      this.unitOn(tile, e);
    }));
  },
  
  getPowerProduction(tile){
  return (tile.ent().timer.check(timerId, pressTick)) ? 0: 6;
  }
});

//Credit: sk7725, litteraly copy-pasted from sk7725/Commandblocks
