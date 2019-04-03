import React, { Component } from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Graticule,
} from 'react-simple-maps';
import { geoMercator } from 'd3-geo';
import { scaleLinear } from "d3-scale"
import { Motion, spring } from 'react-motion';
import './css/ChoroplethMap.css';

const popScale = scaleLinear()
  .domain([0, 7500, 20000])
  .range(['#F0F7DA', '#77AB59', '#234D20']);

function projection(width, height, config) {
  return geoMercator()
    .rotate([ -73.935242, 40.730610])
    .scale(config.scale)
    .translate([(width) / 2, (height)/2.2]);
}

const ChoroplethMap = (props) => {

  return (
    <div className="map-wrapper">
      <Motion
        defaultStyle={{
          zoom: 1,
          lng: -73.935242,
          lat: 40.730610,
        }}
        style={{
          zoom: spring(props.zoom, {stiffness: 310, damping: 50}),
          lng: spring(props.center[0], {stiffness: 310, damping: 50}),
          lat: spring(props.center[1], {stiffness: 310, damping: 50}),
        }}
      >
      {({zoom, lng, lat}) => (
        <ComposableMap
          width={window.innerWidth}
          height={window.innerHeight}
          style={{
            width: "100%",
            height: "100%",
          }}
          projection={projection}
          projectionConfig={{
            scale: 100000,
          }}
          >
          {
           /* 
            * Had to turn off panning since it messed with the animated transition
            */
          }
          <ZoomableGroup center={[lng, lat]} zoom={zoom} disablePanning={true}>
            <Geographies geography="./nyczipcodetabulationareas.json">
              {(geographies, projection) => geographies.map((geography, i) => (
                <Geography
                  key={i}
                  geography={geography}
                  projection={projection}
                  style={{
                    default: {
                      fill: popScale(props.valueMap[geography.properties.postalCode]),
                      stroke: "#000000",
                      strokeWidth: 0.75,
                      outline: "none",
                      cursor: "pointer"
                    },
                    hover: {
                      fill: "#EEEEEE",
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none",
                      cursor: "pointer"
                    },
                    pressed: {
                      fill: "#FF5722",
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none",
                      cursor: "pointer"
                    },
                  }}
                  onClick={props.onFeatureClick}
                  onMouseEnter={props.onFeatureHover}
                />
              ))}
            </Geographies>
            <Graticule />
          </ZoomableGroup>
        </ComposableMap>
      )}
      </Motion>
    </div>
  )
}

export default ChoroplethMap;
