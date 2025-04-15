import React, { useEffect, useState, useCallback } from 'react';
import Map, {
  Source,
  Layer,
  NavigationControl,
  MapMouseEvent,
  Popup,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FeatureCollection } from 'geojson';

import { AppConfig } from '../../AppConfig';

export default function ParkingLinesMap() {
  const [parkingLines, setParkingLines] = useState<FeatureCollection | null>(
    null
  );
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [cursor, setCursor] = useState<string>('');
  const [showLines, setShowLines] = useState<boolean>(true);

  useEffect(() => {
    const fetchParkingLines = async () => {
      const response = await fetch(
        'https://geo-stage-001.geolava.com/features/parking',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bounds: [
              [-122.5056407510782, 37.61093807429111],
              [-122.37174487836481, 37.84012716451066],
            ],
            date: '2025-04-07 18:00:00+00:00',
          }),
        }
      );

      const data: FeatureCollection = await response.json();
      setParkingLines(data);
    };

    fetchParkingLines();
  }, []);

  // Handle hover event
  const handleMouseMove = useCallback((event: MapMouseEvent) => {
    const feature = event.features && event.features[0];
    if (feature) {
      setCursor('pointer');
      setHoveredId(feature.properties?.id);
    } else {
      setCursor('auto');
      setHoveredId(null);
    }
  }, []);

  // Handle click event
  const handleClick = useCallback((event: MapMouseEvent) => {
    const feature = event.features && event.features[0];
    if (feature) {
      setSelectedFeature({
        id: feature.properties?.id,
        coordinates: event.lngLat,
      });
    } else {
      setSelectedFeature(null);
    }
  }, []);

  return (
    <div className="w-full h-full absolute">
      <Map
        mapboxAccessToken={AppConfig.map.tileKey}
        initialViewState={{
          longitude: AppConfig.map.defaultLongitude,
          latitude: AppConfig.map.defaultLatitude,
          zoom: AppConfig.map.defaultZoom,
          pitch: 0,
        }}
        mapStyle={AppConfig.map.lightMapStyle}
        interactiveLayerIds={['parking-lines-layer']}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        cursor={cursor}
      >
        {parkingLines && showLines && (
          <Source id="parking-lines-source" type="geojson" data={parkingLines}>
            <Layer
              id="parking-lines-layer"
              type="line"
              paint={{
                'line-color': [
                  'case',
                  ['==', ['get', 'id'], hoveredId],
                  '#FF0000', // highlight color
                  '#007cbf', // default color
                ],
                'line-width': 2.5,
                'line-opacity': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  12,
                  0,
                  14,
                  1,
                ],
              }}
            />
          </Source>
        )}
        {/* Show popup on click */}
        {selectedFeature && (
          <Popup
            longitude={selectedFeature.coordinates.lng}
            latitude={selectedFeature.coordinates.lat}
            closeOnClick={false}
            onClose={() => setSelectedFeature(null)}
            anchor="top"
          >
            <div className="text-sm text-black">
              <strong>Parking Line ID:</strong> {selectedFeature.id}
            </div>
          </Popup>
        )}
        <NavigationControl position="top-left" />
      </Map>
      {/* Toggle button */}
      <button
        onClick={() => setShowLines(!showLines)}
        className="absolute top-4 right-8 z-10 bg-black shadow rounded px-3 py-1 text-sm text-white opacity-60 font-medium hover:bg-gray-700 hover:cursor-pointer"
      >
        {showLines ? 'Hide' : 'Show'} Parking Lines
      </button>
    </div>
  );
}
