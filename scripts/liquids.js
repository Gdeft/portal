//Conversion Gel: Portal Conductor
const cLightColor = Color.valueOf("ededed");
const cDarkColor = Color.valueOf("f7f7f7");

const conductor = new StatusEffect("conductor");
  conductor.damageMultiplier = 1;
  conductor.speedMultiplier = 1;
  conductor.armorMultiplier = 1;
  conductor.damage = 0;
  conductor.color = cDarkColor;

const conversion = extendContent(Liquid, "conversion-gel", {});
  conversion.viscosity = 1.4;
  conversion.flammability = 0;
  conversion.color = cLightColor;
  conversion.barColor = cDarkColor;
  conversion.effect = conductor;

//Propulsion Gel: Speed
const sLightColor = Color.valueOf("ef7834");
const sDarkColor = Color.valueOf("f7700f");

const speed = new StatusEffect("speed");
  speed.damageMultiplier = 1;
  speed.speedMultiplier = 1.4;
  speed.armorMultiplier = 1;
  speed.damage = 0;
  speed.color = sDarkColor;

const propulsion = extendContent(Liquid, "propulsion-gel", {});
  propulsion.viscosity = 1.4;
  propulsion.flammability = 0;
  propulsion.color = sLightColor;
  propulsion.barColor = sDarkColor;
  propulsion.effect = speed;

//Repulsion Gel: ???
const pLightColor = Color.valueOf("098ae6");
const pDarkColor = Color.valueOf("1fa5ff");

const hop = new StatusEffect("hop");
  hop.damageMultiplier = 1;
  hop.speedMultiplier = 1;
  hop.armorMultiplier = 1;
  hop.damage = 0;
  hop.color = pDarkColor;

const repulsion = extendContent(Liquid, "repulsion-gel", {});
  repulsion.viscosity = 1.4;
  repulsion.flammability = 0;
  repulsion.color = pLightColor;
  repulsion.barColor = pDarkColor;
  repulsion.effect = hop;
