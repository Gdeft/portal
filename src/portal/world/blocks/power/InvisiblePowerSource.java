package portal.world.blocks.power;

import mindustry.world.blocks.power.*;
import portal.world.blocks.power.*;

public class InvisiblePowerSource extends PowerTransferer{

    public float powerProduction = 10000f;

    public InvisiblePowerSource(String name){
        super(name);
        maxNodes = 0;
        outputsPower = true;
        consumesPower = false;
    }

    public class InvisiblePowerSourceBuild extends PowerTransfererBuild{
        @Override
        public float getPowerProduction(){
            return enabled ? powerProduction : 0f;
        }
    }

}
