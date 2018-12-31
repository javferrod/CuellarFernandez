import React from 'react';
import { css } from 'emotion';
import {
  Map, TileLayer, Marker, Popup,
} from 'react-leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer';

import 'leaflet/dist/leaflet.css';

const R = require('ramda');

const MILANO = [45.4542119, 9.11135096];
const mapStyle = css`
.leaflet-container {
  height: 400px;
  width: 100%;
}
`;

const HeathMap = (props) => {
  const { center, data } = props;

  const points = adequate(data);

  return (
    <div className={mapStyle}>
      <Map center={MILANO} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
        />

        <HeatmapLayer
          fitBoundsOnLoad
          fitBoundsOnUpdate
          points={points}
          longitudeExtractor={m => m[1]}
          latitudeExtractor={m => m[0]}
          intensityExtractor={m => 1}
        />
      </Map>
    </div>
  );
};

export default HeathMap;

const adequate = R.pipe(
  R.defaultTo([]),
  R.project(['latitude', 'longitude']),
);
