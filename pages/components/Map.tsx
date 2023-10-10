import React from "react";
import { ZoomableGroup, ComposableMap, Geographies, Geography } from "react-simple-maps";
import features from "../../features.json";
import { SelectedProps } from "../types/props";
import { useSelector } from "react-redux";
import { selectTheme } from "../stores/themeSlice";

const mapWidth = 1000;
const mapHeight = 600;

type MapProps = {
  selected: SelectedProps,
  setSelected: Function
}

const Map = ({ selected, setSelected }: MapProps) => {
  const theme = useSelector(selectTheme);

  return (
    <div style={{ backgroundColor: theme === "dark" ? "rgba(17,24,39, .8)" : "white",  width: "100vw", height: "100vh", display: "flex", justifyContent: "center"}}>
      <ComposableMap style={{ width: "100%" }} data-tip="" projectionConfig={{ scale: 200 }} >
        <ZoomableGroup
          center={[0, 900]}
          zoom={1}
          translateExtent={[
            [0, 0],
            [mapWidth, mapHeight]
          ]}
        >
          <Geographies geography={features}>
              {({ geographies }) => {
                return geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    id="tooltip-anchor-click"
                    onClick={() => {
                      console.log(geo)
                      setSelected({
                        id: geo.id,
                        name: geo.properties.name
                      })
                    }}
                    style={{
                      default: {
                        fill: selected.id === geo.id ? "rgb(59, 130, 246)" : "#D6D6DA",
                        outline: "none"
                      },
                      hover: {
                        fill: "rgb(59, 130, 246)",
                        outline: "none"
                      },
                      pressed: {
                        fill: "rgb(59, 130, 246)",
                        outline: "none"
                      },
                    }}
                  />
                ))
              }
              }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default Map;
