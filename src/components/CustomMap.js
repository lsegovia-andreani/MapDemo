
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Map, TileLayer, Marker, Polyline } from 'react-leaflet'


const tailUrl = "http://mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}";

export default class CustomMap extends Component {
  constructor(props) {

    super(props)

    this.zoom = 14
    this.state = {
      positions: props.positions,
      currentIndex: 0,
      currentPosition: props.positions[0],
      overridePolyline : []
    }

    this.lines = [];
    this.markers = [];
    this.trackMarker = [];

    // this.PlayContinuedPolyline = this.PlayContinuedPolyline.bind(this);

  }

  // PlayContinuedPolyline() {
  //   let positionsOverride = []
  //   for (let i = 0; i < this.state.positions.length - 1; i++) {
  //     const polyline = <Polyline key={"line-" + i} positions={[this.state.positions[i], this.state.positions[(i + 1)]]} color={"green"}></Polyline>;
        
  //     setTimeout(function(){ positionsOverride.push(polyline); this.setState({overridePolyline: positionsOverride});

  //     }.bind(this), 1000);
  //   }
  // }

  GenerateContinuedPolylines() {
    for (let i = 0; i < this.state.positions.length - 1; i++) {
      const polyline = <Polyline key={"line-" + i} positions={[this.state.positions[i], this.state.positions[(i + 1)]]} color={"red"}></Polyline>;
      this.lines.push(polyline);
    }
  }

  GenerateMarkers() {
    for (let i = 0; i < this.state.positions.length - 1; i++) {
      this.lines.push(<Marker key={"marker-" + i} position={this.state.positions[i]}></Marker>);
    }
  }

  AddTrackingMarker() {
    this.trackMarker = <Marker position={this.state.currentPosition}></Marker>;
  }

  render() {

    this.GenerateContinuedPolylines();
    // this.GenerateMarkers();
    this.AddTrackingMarker();

    // this.PlayContinuedPolyline();

    return (
      <div>
        <Map center={this.state.currentPosition} zoom={this.zoom}  >
          <TileLayer url={tailUrl} />

          {this.lines}

          {/* {this.state.overridePolyline} */}

          {this.markers}

          {this.trackMarker}

        </Map>
        <div>
          {/* <Button variant="success" onClick={() => this.PlayContinuedPolyline()}>Reproducir</Button>
          <Button variant="danger">Detener</Button> */}
          <Button variant="default">Atras</Button>
          <Button variant="primary" onClick={() => { this.setState({ currentIndex: this.state.currentIndex + 1, currentPosition: this.state.positions[this.state.currentIndex + 1] }) }}>Adelante</Button>
        </div>
      </div>
    )
  }
}