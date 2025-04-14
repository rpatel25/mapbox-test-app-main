export const AppConfig = {
  defaultLanguage: 'en',
  defaultMarkerCount: 500,
  defaultClusterRadius: 80,
  ui: {
    barHeight: 10,
    barIconSize: 32,
    bigIconSize: 48,
    markerIconSize: 32,
    twBorderRadius: 'rounded',
    mapIconSizeSmall: 28,
    mapIconSizeBig: 56,
  },
  map: {
    deadzone: 50,
    tileKey: process.env.NEXT_PUBLIC_MAPTILER_KEY,
    defaultZoom: 12,
    defaultLatitude: 37.74183465425861,
    defaultLongitude: -122.4093443229233,
    lightMapStyle: process.env.NEXT_PUBLIC_MAPBOX_LIGHT_STYLE || '',
  },
};

