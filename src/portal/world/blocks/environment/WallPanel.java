package portal.world.blocks.environment;

import arc.*;
import arc.graphics.*;
import arc.graphics.g2d.*;
import arc.math.*;
import arc.scene.ui.layout.*;
import arc.util.*;
import mindustry.entities.*;
import mindustry.gen.*;
import mindustry.graphics.*;
import mindustry.ui.*;
import mindustry.world.*;
import mindustry.world.blocks.defense.*;
import mindustry.world.meta.*;

public class WallPanel extends Wall{
	public boolean isConductor;
	
	public WallPanel(String name){
		super(name);
		
		health = 1;
		flashHit = false;
		//deflect = false;
	}
	
	@Override
	public void setStats(){
		super.setStats();
		
		//stats.remove(BlockStat.health);
	}
	
	@Override
	public void setBars(){
		super.setBars();
		
		bars.remove("health");
	}
	
	public class WallPanelBuild extends WallBuild{
		@Override
		public float handleDamage(float amount){
			return 0;
		}
	}
}
