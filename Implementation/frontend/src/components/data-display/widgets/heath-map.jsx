import React from 'react';
import { css } from 'emotion';
import {
  Map, TileLayer,
} from 'react-leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer';

import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
const R = require('ramda');

const MILANO = [45.4542119, 9.11135096];
const mapStyle = css`
.leaflet-container {
  height: 400px;
  width: 100%;
}
`;

const HeathMap = (props) => {
  const { data } = props;
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
          latitudeExtractor={m => m[0]}
          longitudeExtractor={m => m[1]}
          intensityExtractor={m => 100}
        />
      </Map>
    </div>
  );
};

export default HeathMap;

const adequate = R.pipe(
  R.defaultTo([]),
  R.map(
    R.pipe(
      R.pick(['latitude', 'longitude']),
      R.values,
      values => [parseFloat(values[0]), parseFloat(values[1])],
    ),
  ),
);
