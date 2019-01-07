import React from 'react';
import { EditControl } from 'react-leaflet-draw';
import { css } from 'emotion';
import {
  Map, TileLayer, FeatureGroup,
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

const mapContainerStyle = css`
height:400px;
width:100%;
`;

const height400 = css`
height: 400px
`;

const DrawableMap = props => (
  <div className={mapContainerStyle}>
    <Map className={height400} center={props.center} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
      />
      <FeatureGroup>
        <EditControl
          onCreated={e => props.onChange(e.layer._latlngs)}
          position="topleft"
          edit={{
            edit: false,
          }}
          draw={{
            rectangle: false,
            circle: false,
            polyline: false,
            marker: false,
            circlemarker: false,
          }}
        />
      </FeatureGroup>
    </Map>
  </div>
);

export default DrawableMap;
