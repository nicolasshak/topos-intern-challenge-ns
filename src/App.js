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
      selected: undefined,
      activePath: undefined,
      center: [ -73.915242, 40.730610],
      zoom: 1,
      valueMap: totalTrees
    }

    this.onHover = this.onHover.bind(this);
    this.onClick = this.onClick.bind(this);
    this.selectArea = this.selectArea.bind(this);
  }

  recenter() {

    this.setState({
      center: [ -73.915242, 40.730610],
      zoom: 1
    });
  }

  selectArea(feature) {

    this.getStats(feature.properties.postalCode)

    this.setState({
      selected: feature.properties.postalCode,
      center: [feature.properties.longitude, feature.properties.latitude],
      zoom: 2
    });
  }

  onHover(feature, e) {

    this.setState({hover: feature.properties.postalCode})
  }

  onClick(feature, e) {

    this.handleHighlight(e);
    this.selectArea(feature);
  }

  /*
   *  Helpers
   */

  handleHighlight(e) {
    console.log(e.target.className);
  } 

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

  render() {
    return (
      <div className="App">
        <CompareTable selected={this.state.selected} data={this.state.data} />
        <div className="map-wrapper">
          <ChoroplethMap
            selected={this.state.select}
            valueMap={this.state.valueMap}
            onFeatureHover={this.onHover}
            onFeatureClick={this.onClick}
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
