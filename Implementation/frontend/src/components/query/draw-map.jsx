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

class DrawableMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      polygonEnabled: true,
    };

    this.handleOnCreated = this.handleOnCreated.bind(this);
    this.handleOnDelete = this.handleOnDelete.bind(this);
  }

  handleOnCreated(event) {
    const { onChange } = this.props;

    this.setState({
      polygonEnabled: false,
    });

    onChange(event.layer._latlngs[0]);
  }

  handleOnDelete(event) {
    const { onChange } = this.props;

    this.setState({
      polygonEnabled: true,
    });

    onChange(undefined);
  }

  render() {
    const { center } = this.props;
    const { polygonEnabled } = this.state;
    return (
      <div className={mapContainerStyle}>
        <Map className={height400} center={center} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
          />
          <FeatureGroup>
            <EditControl
              onCreated={this.handleOnCreated}
              onDeleted={this.handleOnDelete}
              position="topleft"
              edit={{
                edit: false,
              }}
              draw={{
                polygon: polygonEnabled,
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
  }
}

export default DrawableMap;
