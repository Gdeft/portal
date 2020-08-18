module.exports = {
  drawPortal(color, region, x, y, rotation){
    Draw.mixcol(color, 1)
    Draw.rect(region, x, y, rotation)
    Draw.reset()
  },

  isConductor(tile){
    return tile.block().name.startsWith("portal-conductor")
  }
}
