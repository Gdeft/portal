package portal;

import arc.*;
import arc.util.*;
import mindustry.*;
import mindustry.content.*;
import mindustry.game.EventType.*;
import mindustry.gen.*;
import mindustry.graphics.Pal;
import mindustry.mod.*;
import mindustry.ui.dialogs.*;
import portal.content.*;

public class Portal extends Mod{
	public final String githubURL = "https://github.com/Gdeft/portal";

	public Portal(){
		Log.info("Loaded Portal constructor.");

		Events.on(ClientLoadEvent.class, e -> {
			Time.run(10f, () -> {
				BaseDialog dialog = new BaseDialog("@dialog.startup.title");
				
				dialog.cont.pane(p -> {
					p.add("Portal").center().color(Pal.accent).row();
					p.image().pad(4f).height(4f).fillX().color(Pal.accent).row();
					p.labelWrap("@dialog.startup.info").pad(4f).growX().row();
					
					p.button("@dialog.startup.github", Icon.github, () -> {
						Core.app.openURI(githubURL);
					}).growX().pad(16f).size(210f, 64f).center();
				}).growY().width(540f).center().row();
				
				dialog.cont.button("@ok", dialog::hide).size(105f, 55f).center();
				dialog.show();
			});
		});
	}

	@Override
	public void loadContent(){
		new PortalBlocks().load();
		new PortalUnitTypes().load();
	}

}
