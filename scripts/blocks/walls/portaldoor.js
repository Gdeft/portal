const openD = newEffect(10, e => {
  Draw.color(Color.valueOf("ffde05"), Color.valueOf("ffe645"), e.fin());
  Lines.stroke(e.fout() * 2.6);
  Lines.square(e.x, e.y, 9 + e.fin() * 2);
});

const closeD = newEffect(10, e => {
  Draw.color(Color.valueOf("0083cf"), Color.valueOf("3da9e8"), e.fin());
  Lines.stroke(e.fout() * 2.6);
  Lines.square(e.x, e.y, 9 + e.fout() * 2);
});

const door = extendContent(Door, "portal-door", {
 load(){
  this.super$load();
   
  this.region = Core.atlas.find(this.name);
  this.openRegion = Core.atlas.find(this.name + "-open");
 }, 
 
 generateIcons(){
  return [
   Core.atlas.find(this.name)
  ]
 },
 
 draw(tile){
  entity = tile.ent();
    
  if(!entity.open){
   Draw.rect(this.region, tile.drawx(), tile.drawy(), tile.rotation() * 90);
  } else {
     Draw.rect(this.openRegion, tile.drawx(), tile.drawy(), tile.rotation() * 90);
    }
 },
 
 update(tile){
  var entity = tile.ent();
  if(entity.open && (!entity.cons.valid())){ 
   tile.block().tapped(tile, null);
  }
  else if((!entity.open) && entity.cons.valid()){
   tile.block().tapped(tile, null);
  }
 },
 
 tapped(tile, player){
  if(player != null){
   return;  
  }
  this.super$tapped(tile, player);
 }
});

door.openfx = closeD;
door.closefx = openD;

//Thank you sk7725 again.
