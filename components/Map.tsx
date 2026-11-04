import React from "react";
import { ZoomableGroup, ComposableMap, Geographies, Geography } from "react-simple-maps";
import { SelectedProps } from "@/types/props";
import { useSelector } from "react-redux";
import { selectTheme } from "@/stores/themeSlice";

const mapWidth = 980;
const mapHeight = 560;

type MapProps = {
  selected: SelectedProps,
  setSelected: (selected: SelectedProps) => void
}

const Map = ({ selected, setSelected }: MapProps) => {
  const theme = useSelector(selectTheme);
  const isDark = theme === "dark";

  return (
    <div className="w-full max-w-[1400px]">
      <ComposableMap
        width={mapWidth}
        height={mapHeight}
        style={{ width: "100%", height: "auto" }}
        data-tip=""
        projectionConfig={{ scale: 200 }}
      >
        <ZoomableGroup
          center={[0, 0]}
          zoom={1}
          translateExtent={[
            [0, 0],
            [mapWidth, mapHeight]
          ]}
        >
          <Geographies geography="/features.json">
            {({ geographies }) => {
              return geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  id="tooltip-anchor-click"
                  onClick={() => {
                    setSelected({
                      id: geo.id,
                      name: geo.properties.name
                    })
                  }}
                  style={{
                    default: {
                      fill: selected.id === geo.id ? "rgb(37, 99, 235)" : isDark ? "#1f2937" : "#D6D6DA",
                      stroke: isDark ? "#111827" : "#ffffff",
                      strokeWidth: 0.5,
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
