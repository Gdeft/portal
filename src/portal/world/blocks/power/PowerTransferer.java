package portal.world.blocks.power;

import arc.*;
import arc.func.*;
import arc.graphics.*;
import arc.graphics.g2d.*;
import arc.math.*;
import arc.math.geom.*;
import arc.struct.*;
import arc.util.*;
import mindustry.core.*;
import mindustry.entities.units.*;
import mindustry.game.*;
import mindustry.gen.*;
import mindustry.graphics.*;
import mindustry.ui.*;
import mindustry.world.*;
import mindustry.world.blocks.power.*;
import mindustry.world.meta.*;
import mindustry.world.modules.*;

import static mindustry.Vars.*;

public class PowerTransferer extends PowerNode{
	public TextureRegion region, topRegion;
	public boolean isClear = false;
	
	public PowerTransferer(String name){
		super(name);
		
		hasShadow = false;
		configurable = false;
		laserRange = 0;
		maxNodes = 0;
	}
	
	@Override
	public void load(){
		super.load();
		
		region = Core.atlas.find(name);
		topRegion = Core.atlas.find(name + "-top");
	}
	
	@Override
	public void setStats(){
		super.setStats();
		
		Stats.remove(BlockStat.powerRange);
		Stats.remove(BlockStat.powerConnections);
	}
	
	@Override
	public void drawPlace(int x, int y, int rotation, boolean valid){
		
	}
	
	public class PowerTransfererBuild extends PowerNodeBuild{
		@Override
		public void draw(){
			if(isClear){
				Draw.rect(Core.atlas.find("clear"), x, y);
			}else{
				Draw.rect(region, x, y);
				if(power.graph.getSatisfaction() > 0.0001){
					Draw.rect(topRegion, x, y);
				}
			}
		}
		
		@Override
		public void drawSelect(){
			
		}
	}
}
