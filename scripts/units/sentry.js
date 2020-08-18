const sentry = extendContent(UnitType, "sentry", {});

sentry.create(prov(() => extend(GroundUnit, {
	drawStats(unit){}
})));
