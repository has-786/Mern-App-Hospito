import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 22.5738752,
      lng: 	88.35399679999999	
    },
    zoom: 11
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDvCnNUcUV7qf1bwriEwEdRb8M-FGRODuQ' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
		 >
          <AnyReactComponent
            lat={22.5738752}
            lng={	88.35399679999999}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export  {SimpleMap};