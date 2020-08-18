const blockSize = Vars.tilesize;
const pressTickp = 30;
const timerIdp = 0;
const button = extendContent(Block, "pedestal", {
  placed(tile){
    this.super$placed(tile);
    tile.ent().timer.reset(timerIdp, pressTickp + 1);
  },

  draw(tile){
    Draw.rect(Core.atlas.find(this.name + ((tile.ent().timer.check(timerIdp, pressTickp)) ? "" : "-on")), tile.drawx(), tile.drawy());
  },

  unitOn(tile, unit){
    if(tile.ent().timer.check(timerIdp, pressTickp)) Sounds.click.at(tile.worldx(), tile.worldy());
    tile.ent().timer.reset(timerIdp, 0);

  },

  update(tile){
    this.super$update(tile);
    Units.nearby(tile.worldx(), tile.worldy(), blockSize, blockSize, cons(e => {
      this.unitOn(tile, e);
    }));
  },

  getPowerProduction(tile){
    return (tile.ent().timer.check(timerIdp, pressTickp)) ? 0 : 6;
  }
});

const pressTickf = 8;
const timerIdf = 0;
const fbutton = extendContent(Block, "floor-button", {

  placed(tile) {
    this.super$placed(tile);
    tile.ent().timer.reset(timerIdf, pressTickf + 1);
  },

  draw(tile) {
    Draw.rect(Core.atlas.find(this.name + ((tile.ent().timer.check(timerIdf, pressTickf)) ? "" : "-b")), tile.drawx(), tile.drawy());
  },

  unitOn(tile, unit){
    if(tile.ent().timer.check(timerIdf, pressTickf)) Sounds.place.at(tile.worldx(), tile.worldy());
    tile.ent().timer.reset(timerIdf, 0);

  },

  update(tile){
    this.super$update(tile);
    Units.nearby(tile.worldx(), tile.worldy(), blockSize, blockSize, cons(e => {
      this.unitOn(tile, e);
    }));
  },

  getPowerProduction(tile){
    return (tile.ent().timer.check(timerIdf, pressTickf)) ? 0 : 6;
  }
});
//Credit: sk7725, check out sk7725/Commandblocks.
