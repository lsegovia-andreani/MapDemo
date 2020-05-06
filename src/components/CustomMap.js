
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Map, TileLayer, Marker, Polyline } from 'react-leaflet'

const tailUrl = "https://{s}.tile.osm.org/{z}/{x}/{y}.png ";

export default class CustomMap extends Component {
  constructor(props) {

    super(props)

    this.state = {
      zoom: 15,
      positions: props.positions,
      currentIndex: 0,
      currentPosition: props.positions[0],
      overridePolyline: []
    }

    this.lines = [];
    this.markers = [];
    this.trackMarker = [];

    console.log(this.state.currentPosition)

    // this.PlayContinuedPolyline = this.PlayContinuedPolyline.bind(this);

  }


  GenerateContinuedPolylines() {
    for (let i = 0; i < this.state.positions.length - 1; i++) {
      const polyline = <Polyline key={"line-" + i} positions={[this.state.positions[i], this.state.positions[(i + 1)]]} color={"red"}></Polyline>;
      this.lines.push(polyline);
    }
  }

  GenerateMarkers() {
    for (let i = 0; i < this.state.positions.length - 1; i++) {
      this.markers.push(<Marker key={"marker-" + i} position={this.state.positions[i]}></Marker>);
    }
  }

  AddTrackingMarker() {
    this.trackMarker = <Marker position={this.state.currentPosition}></Marker>;
  }

  render() {

    this.GenerateContinuedPolylines();
    //  this.GenerateMarkers();
    this.AddTrackingMarker();

    return (
      <div>
        <Map center={this.state.currentPosition} zoom={this.state.zoom}  >
          <TileLayer url={tailUrl} />

          {this.lines}

          {this.trackMarker}

          {this.markers}

          {/* <Marker key="current" position={this.state.currentPosition}></Marker> */}

        </Map>
        <div>
          <Button variant="default">Atras</Button>
          <Button variant="primary" onClick={() => {
            if (this.state.currentIndex < this.state.positions.length - 1)
              this.setState({ currentIndex: this.state.currentIndex + 1, currentPosition: this.state.positions[this.state.currentIndex + 1] })
          }}>Adelante</Button>
        </div>
      </div>
    )
  }
}