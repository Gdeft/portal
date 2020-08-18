const h = "portal";

const bWall = extendContent(Wall, "isolator-wall", {
  handleBulletHit(entity, b){
    entity.damage(0);
  }
});

const bWallLarge = extendContent(Wall, "isolator-wall-large", {
  handleBulletHit(entity, b){
    entity.damage(0);
  }
});

const bWallP = extendContent(PowerDistributor, "isolator-wallp", {
  load(){
    this.region = Core.atlas.find(h + "-isolator-wall");
  },

  generateIcons(){
    return [
      Core.atlas.find(h + "-isolator-wall"),
      Core.atlas.find(h + "-pmark")
    ]
  },

  handleBulletHit(entity, b){
    entity.damage(0);
  }
});

const bWallLargeP = extendContent(PowerDistributor, "isolator-wall-largep", {
  load(){
    this.region = Core.atlas.find(h + "-isolator-wall-large");
  },

  generateIcons(){
    return [
      Core.atlas.find(h + "-isolator-wall-large"),
      Core.atlas.find(h + "-pmark-large")
    ]
  },

  handleBulletHit(entity, b){
    entity.damage(0);
  }
});

const wWall = extendContent(Wall, "conductor-wall", {
  handleBulletHit(entity, b){
    entity.damage(0);
  }
});

const wWallLarge = extendContent(Wall, "conductor-wall-large", {
  handleBulletHit(entity, b){
    entity.damage(0);
  }
});

const wWallP = extendContent(PowerDistributor, "conductor-wallp", {
  load(){
    this.region = Core.atlas.find(h + "-conductor-wall");
  },

  generateIcons(){
    return [
      Core.atlas.find(h + "-conductor-wall"),
      Core.atlas.find(h + "-pmark")
    ]
  },

  handleBulletHit(entity, b){
    entity.damage(0);
  }
});

const wWallLargeP = extendContent(PowerDistributor, "conductor-wall-largep", {
  load(){
    this.region = Core.atlas.find(h + "-conductor-wall-large");
  },

  generateIcons(){
    return [
      Core.atlas.find(h + "-conductor-wall-large"),
      Core.atlas.find(h + "-pmark-large")
    ]
  },

  handleBulletHit(entity, b){
    entity.damage(0);
  }
});
