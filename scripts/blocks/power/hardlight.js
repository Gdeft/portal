
//Sonnicon's shader magic
if(!Vars.headless){
	importPackage(Packages.arc.graphics.gl);
	const shader = new JavaAdapter(Shader, {
		apply(){
			this.setUniformf("u_time", Time.time() / Scl.scl(1.0));
		}
	},
    "uniform mat4 u_projTrans;attribute vec4 a_position;attribute vec2 a_texCoord0;attribute vec4 a_color;varying vec4 v_color;varying vec2 v_texCoord;void main(){gl_Position = u_projTrans * a_position;v_texCoord = a_texCoord0;v_color = a_color;}", "#ifdef GL_ES\nprecision mediump float;precision mediump int;\n#endif\nuniform sampler2D u_texture;uniform float u_time;varying vec4 v_color;varying vec2 v_texCoord;void main(){vec4 color = texture2D(u_texture, v_texCoord.xy);float t = clamp((sin(u_time * .02 + gl_FragCoord.x * .01 + gl_FragCoord.y * .005) + 1.) / 2., 0., 1.);vec3 c = vec3(mix(0., 1., t), mix(.89, .39, t), mix(1., .85, t));gl_FragColor = vec4(color.rgb, mix(.50, 1., t));}");
}
				       		       
const door = extendContent(Door, "hard-light", {
 load(){
  this.super$load();
   
  this.region = Core.atlas.find(this.name);
  this.onRegion = Core.atlas.find(this.name + "-on");
 }, 
 
 generateIcons(){
  return [
   Core.atlas.find(this.name + "-on")
  ]
 },
 
 draw(tile){
  entity = tile.ent();
   
  if(!entity.open){
   Draw.rect(this.region, tile.drawx(), tile.drawy(), tile.rotation() * 90);
  } else {
     Draw.blend(Blending.additive);
     Draw.shader(shader);
     Draw.alpha(0.5);
     Draw.rect(this.onRegion, tile.drawx(), tile.drawy(), tile.rotation() * 90);
    }
   
  Draw.blend();
  Draw.shader();
 },
  
	
 update(tile){
  this.super$update(tile);
  
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

door.openfx = Fx.none;
door.closefx = Fx.none;

//Thank you sk7725 again.
