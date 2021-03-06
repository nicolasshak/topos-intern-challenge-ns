import React, { Component } from 'react';
import './css/App.css';
import ChoroplethMap from './ChoroplethMap';
import CompareTable from './CompareTable';
import totalTrees from './TotalTrees.json';

const API = 'https://data.cityofnewyork.us/resource/y75w-icrw.json'

class App extends Component {

  constructor(props) {

    super(props);

    this.state = {
      hover: '00000',
      center: [ -73.915242, 40.730610],
      zoom: 1,
      valueMap: totalTrees
    }

    this.onHover = this.onHover.bind(this);
    this.selectArea = this.selectArea.bind(this);
  }

  /*
   *  Handlers
   */

  onHover(feature, e) {

    this.setState({hover: feature.properties.postalCode})
  }

  selectArea(feature) {

    this.getStats(feature.properties.postalCode);
    this.focus(feature);
  }

  /*
   *  Helpers
   */

  getStats(zipcode) {

    var params = [
      '$select=spc_common, count(spc_common)',
      `$where=zip_new=${zipcode}`,
      '$group=spc_common'
    ]

    var query = API + '?' + params.join('&');
    fetch(query)
      .then(response => response.json())
      .then(data => {
        
        this.setState({
          data: data
        });
      });
  }

  focus(feature) {
    this.setState({
      selected: feature.properties.postalCode,
      center: [feature.properties.longitude, feature.properties.latitude],
      zoom: 2
    });
  }

  recenter() {

    this.setState({
      center: [ -73.915242, 40.730610],
      zoom: 1
    });
  }

  render() {
    return (
      <div className="App">
        <CompareTable selected={this.state.selected} data={this.state.data} />
        <div className="map-wrapper">
          <ChoroplethMap
            valueMap={this.state.valueMap}
            onFeatureHover={this.onHover}
            onFeatureClick={this.selectArea}
            center={this.state.center}
            zoom={this.state.zoom} />
          <div className="current-wrapper" onClick={() => this.recenter()}>  
            <div className="current-code">
              {this.state.hover}
            </div>
            <div className="note">
              (Click to zoom out)
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
