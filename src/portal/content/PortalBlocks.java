package portal.content;

import arc.*;
import arc.graphics.*;
import arc.graphics.g2d.*;
import arc.struct.*;
import mindustry.content.*;
import mindustry.ctype.*;
import mindustry.entities.bullet.*;
import mindustry.gen.*;
import mindustry.graphics.*;
import mindustry.type.*;
import mindustry.world.*;
import mindustry.world.blocks.*;
import mindustry.world.blocks.campaign.*;
import mindustry.world.blocks.defense.*;
import mindustry.world.blocks.defense.turrets.*;
import mindustry.world.blocks.distribution.*;
import mindustry.world.blocks.environment.*;
import mindustry.world.blocks.experimental.*;
import mindustry.world.blocks.legacy.*;
import mindustry.world.blocks.liquid.*;
import mindustry.world.blocks.logic.*;
import mindustry.world.blocks.power.*;
import mindustry.world.blocks.production.*;
import mindustry.world.blocks.sandbox.*;
import mindustry.world.blocks.storage.*;
import mindustry.world.blocks.units.*;
import mindustry.world.consumers.*;
import mindustry.world.draw.*;
import mindustry.world.meta.*;
import portal.world.blocks.environment.*;
import portal.world.blocks.power.*;

import static mindustry.type.ItemStack.*;

public class PortalBlocks implements ContentList{
	public static Block
	
	//environment
	conductorFloor, conductorWall, conductorWallLarge, goo, isolatorFloor, isolatorWall, isolatorWallLarge,
	
	//power
	powerTransferer, powerTransfererHollow, powerTransfererClear;
	
	@Override
	public void load(){
		//region environment
		
		conductorFloor = new FloorPanel("conductor-floor"){{
			isConductor = true;
			size = 1;
			buildVisibility = BuildVisibility.hidden;
		}};
		
		conductorWall = new WallPanel("conductor-wall"){{
			requirements(Category.defense, with(Items.lead, 5, Items.silicon, 2));
			isConductor = true;
			size = 1;
			buildVisibility = BuildVisibility.sandboxOnly;
		}};
		
		conductorWallLarge = new WallPanel("conductor-wall-large"){{
			requirements(Category.defense, with(Items.lead, 20, Items.silicon, 8);
			isConductor = true;
			size = 2;
			buildVisibility = BuildVisibility.sandboxOnly;
		}};
		
		goo = new Floor("goo"){{
			speedMultiplier = 0.001f;
			variants = 0;
			isLiquid = true;
			status = StatusEffects.wet;
			statusDuration = 120f;
			drownTime = 60f;
			cacheLayer = CacheLayer.water;
			albedo = 0.7f;
		}};
		
		isolatorFloor = new FloorPanel("isolator-floor"){{
			isConductor = false;
			size = 1;
			buildVisibility = BuildVisibility.hidden;
		}};
		
		isolatorWall = new WallPanel("isolator-wall"){{
			requirements(Category.defense, with(Items.lead, 5, Items.metaglass, 2));
			isConductor = false;
			size = 1;
			buildVisibility = BuildVisibility.sandboxOnly;
		}};
		
		isolatorWallLarge = new WallPanel("isolator-wall-large"){{
			requirements(Category.defense, with(Items.lead, 20, Items.metaglass, 8);
			isConductor = false;
			size = 2;
			buildVisibility = BuildVisibility.sandboxOnly;
		}};
		
		//endregion
		//region power
		
		powerTransferer = new PowerTransferer("power-transferer"){{
			requirements(Category.power, with(Items.copper, 1, Items.lead, 3, Items.silicon, 5));
			health = 10;
		}};
		
		powerTransfererHollow = new PowerTransferer("power-transferer-hollow"){{
			requirements(Category.power, with(Items.copper, 1, Items.lead, 3, Items.silicon, 5));
			health = 10;
		}};
		
		powerTransfererClear = new PowerTransferer("power-transferer-clear"){{
			requirements(Category.power, with(Items.copper, 1, Items.lead, 3, Items.silicon, 5));
			health = 10;
			isClear = true;
		}};
		
		//endregion
	}
}
