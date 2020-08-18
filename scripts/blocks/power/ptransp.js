const pc = extendContent(PowerNode, "power-circle", {
  load(){
    this.super$load();

    this.region = Core.atlas.find(this.name);
    this.onRegion = Core.atlas.find(this.name + "-on");
    this.baseRegion = Core.atlas.find(this.name + "-tr");
  },

  generateIcons(){
    return [
      Core.atlas.find(this.name)
    ];
  },

  draw(tile){
    const power = tile.entity.power.status;

    Draw.rect(this.region, tile.drawx(), tile.drawy());

    if(power > 0){
      Draw.color(Color.valueOf("ffe600"));
      Draw.rect(this.onRegion, tile.drawx(), tile.drawy());
      Draw.color();
    };
  }
});

const ph = extendContent(PowerNode, "power-hollow", {
  load(){
    this.super$load();

    this.region = Core.atlas.find(this.name);
    this.onRegion = Core.atlas.find(this.name + "-on");
    this.baseRegion = Core.atlas.find(this.name + "-tr");
  },

  generateIcons(){
    return [
      Core.atlas.find(this.name)
    ];
  },

  draw(tile){
    const power = tile.entity.power.status;

    Draw.rect(this.region, tile.drawx(), tile.drawy());

    if(power > 0){
      Draw.color(Color.valueOf("ffe600"));
      Draw.rect(this.onRegion, tile.drawx(), tile.drawy());
      Draw.color();
    };
  }
});
