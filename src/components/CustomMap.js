
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Map, TileLayer, Marker, Polyline ,ZoomControl} from 'react-leaflet'

const tailUrl = "https://{s}.tile.osm.org/{z}/{x}/{y}.png ";

export default class CustomMap extends Component {
  constructor(props) {

    super(props)

    this.state = {
      zoom: 17,
      positions: props.positions,
      otherPositions: props.otherPositions,
      currentIndex: 0,
      currentPosition: props.positions[0],
      overridePolyline: []
    }

    this.lines = [];
    this.markers = [];
    this.trackMarker = [];

  }


  GenerateContinuedPolylines() {
    for (let i = 0; i < this.state.positions.length - 1; i++) {
      const polyline = <Polyline key={"line-" + i} positions={[this.state.positions[i], this.state.positions[(i + 1)]]} color={"red"}></Polyline>;
      this.lines.push(polyline);
    }

    for (let i = 0; i < this.state.otherPositions.length - 1; i++) {
      const polyline = <Polyline key={"line-" + i} positions={[this.state.otherPositions[i], this.state.otherPositions[(i + 1)]]} color={"blue"}></Polyline>;
      this.lines.push(polyline);
    }
  }

  GenerateMarkers() {
    for (let i = 0; i < this.state.positions.length - 1; i++) {
      this.markers.push(<Marker key={"marker-" + i} position={this.state.positions[i]}></Marker>);
    }

    for (let i = 0; i < this.state.otherPositions.length - 1; i++) {
      this.markers.push(<Marker key={"marker-" + i} position={this.state.otherPositions[i]}></Marker>);
    }
  }

  AddTrackingMarker() {
    this.trackMarker = <Marker position={this.state.currentPosition}></Marker>;
  }

  render() {

    this.GenerateContinuedPolylines();
    this.GenerateMarkers();
    this.AddTrackingMarker();

    return (
      <div>
        <Map center={this.state.currentPosition} zoom={this.state.zoom} zoomControl={false} >
          <TileLayer url={tailUrl} />

          {this.lines}

          {this.trackMarker}

          {this.markers}

          {/* <Marker key="current" position={this.state.currentPosition}></Marker> */}
          <ZoomControl position="topright" />
        </Map>
        <div>
          <Button variant="danger" onClick={() => {
            if (this.state.currentIndex > 0)
              this.setState({ currentIndex: this.state.currentIndex - 1, currentPosition: this.state.positions[this.state.currentIndex - 1] })
          }}>Atras</Button>
          <Button variant="primary" onClick={() => {
            if (this.state.currentIndex < this.state.positions.length - 1)
              this.setState({ currentIndex: this.state.currentIndex + 1, currentPosition: this.state.positions[this.state.currentIndex + 1] })
          }}>Adelante</Button>
        </div>
      </div>
    )
  }
}