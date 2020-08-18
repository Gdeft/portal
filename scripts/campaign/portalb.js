const plib = require("portallib")
const clib = require("clib")
const hPortal = extendContent(ItemBridge, "portal-blue", {
  setBars(){
    this.bars.add("portal", new Func({
      get: function(entity){
        return new Bar(prov(() => (Core.bundle.get("bar.portal") + ": " + entity.bundlePortal())), prov(() => clib.darkOrange), new Floatp({get: function(){
          return entity.getSignal();
          }
        }));
      }
    }));
  },

  draw(tile){
    if(tile.getNearbyLink(0) && plib.isConductor(tile.getNearbyLink(0))) plib.drawPortal(clib.darkBlue, this.region, tile.drawx(), tile.drawy(), 0)
    else if(tile.getNearbyLink(1) && plib.isConductor(tile.getNearbyLink(1))) plib.drawPortal(clib.darkBlue, this.region, tile.drawx(), tile.drawy(), 90)
    else if(tile.getNearbyLink(2) && plib.isConductor(tile.getNearbyLink(2))) plib.drawPortal(clib.darkBlue, this.region, tile.drawx(), tile.drawy(), 180)
    else if(tile.getNearbyLink(3) && plib.isConductor(tile.getNearbyLink(3))) plib.drawPortal(clib.darkBlue, this.region, tile.drawx(), tile.drawy(), 270)
    else return;
  },

  update(tile){
    entity = tile.ent()
    linkedP = Vars.world.tile(entity.link)

    this.super$update(tile);
    rad = 5
    if(linkedP != null && linkedP.block().name == "portal-portal-orange"){
      entity.setPortal(true)
      entity.setSignal(1)
      Vars.bulletGroup.intersect(tile.drawx() - rad, tile.drawy() - rad, rad * 2, rad * 2, cons(b => {
        if(b == null) return;
        if(Mathf.within(tile.drawx(), tile.drawy(), b.x, b.y, rad)) b.set(linkedP.getX(), linkedP.getY())
      }));
    } else {
      entity.setPortal(false)
      entity.setSignal(0)
    }

    if(plib.isConductor(tile.getNearbyLink(0)) || plib.isConductor(tile.getNearbyLink(1)) || plib.isConductor(tile.getNearbyLink(2)) || plib.isConductor(tile.getNearbyLink(3))) return;
    else { tile.remove() }
  },

  unitOn(tile, unit){
    entity = tile.ent()
    linkedP = Vars.world.tile(entity.link)
    if(linkedP == null || linkedP.block().name != "portal-portal-orange") return;

    if(unit instanceof Player) unit.set(linkedP.getX(), linkedP.getY())
    if(unit instanceof GroundUnit) unit.move(linkedP.getX() - tile.getX(), linkedP.getY() - tile.getY())
  },

  drawLayer(tile){},

  linkValid(tile, other, checkDouble){
    if(other == null || tile == null || other == tile) return false;
    if(tile.x == other.x){
        if(Math.abs(tile.y - other.y) > this.range) return false;
    } else if(tile.y == other.y){
        if(Math.abs(tile.x - other.x) > this.range) return false;
    } else {
        return false;
    }
    return other.block().name == "portal-portal-orange" && (!checkDouble || other.ent().link != tile.pos());
  }
});

hPortal.buildVisibility = BuildVisibility.sandboxOnly;
hPortal.update = true;
hPortal.destructible = false;
hPortal.solid = false;
hPortal.hasShadow = false;
hPortal.requirements = ItemStack.with(Items.copper, 1)
hPortal.range = 90;
hPortal.entityType = prov(() => {
  const entity = extend(ItemBridge.ItemBridgeEntity, {
    hasPortal(){
      return this._hasportal;
    },

    setPortal(bool){
      this._hasportal = bool;
    },

    getSignal(){
      return this._signal;
    },

    setSignal(int){
      this._signal = int;
    },

    bundlePortal(){
      if(entity.hasPortal()) return "Enabled";
      else { return "Disabled"; }
    }
  });
  entity.setSignal(0);
  entity.setPortal(false);
  return entity;
});
