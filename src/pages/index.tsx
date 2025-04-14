import { useEffect, useState } from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import { LineLayerSpecification } from 'mapbox-gl';

import { Geist, Geist_Mono } from 'next/font/google';
import 'mapbox-gl/dist/mapbox-gl.css';

import { AppConfig } from '../../AppConfig';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function Home() {
  const [geojsonData, setGeojsonData] = useState(null);

  useEffect(() => {
    fetch('https://geo-stage-001.geolava.com/features/parking', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bounds: [
          [-122.5056407510782, 37.61093807429111],
          [-122.37174487836481, 37.84012716451066],
        ],
        date: '2025-04-07 18:00:00+00:00',
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setGeojsonData(data);
      });
  }, []);

  const layerStyle: LineLayerSpecification = {
    id: 'parkingLines',
    type: 'line',
    source: 'string',
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-width': 2,
      'line-color': '#007cbf',
    },
  };

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
      >
        <Source id="parkingLines" type="geojson" data={geojsonData}>
          <Layer {...layerStyle} />
        </Source>
      </Map>
    </div>
  );
}
