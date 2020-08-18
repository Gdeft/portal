if(Vars.ui.hudGroup){
  Core.app.post(run(() => {
    Vars.ui.showInfoText(Core.bundle.get("note.title"), Core.bundle.get("note.info"));
  }));
}
