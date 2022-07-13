import React, { useMemo, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import { LocationMarkerIcon } from "@heroicons/react/solid";
function MapComponent({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});

  console.log({ selectedLocation });
  // Transform the searchResults object to an array of objects with latitude and longitude
  const coordinates = searchResults.map((result) => ({
    latitude: result.lat,
    longitude: result.long,
  }));
  console.log(coordinates);

  // Get the center of the coordinates
  const center = getCenter(coordinates);
  console.log(center);

  const [viewState, setViewState] = useState({
    width: "100vw",
    height: "100vh",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  // The Map  component is rerendered on every animation frame when the user is dragging the map. If it's trying to render hundreds of markers, the performance lag will become quite visible. One way to improve the performance is useMemo
  const markers = useMemo(
    () =>
      searchResults.map((result, index) => (
        <>
          <Marker
            key={index}
            longitude={result.long}
            latitude={result.lat}
            // offsetTop={-48}
            // offsetLeft={-24}
          >
            <LocationMarkerIcon
              className="w-5 h-5 text-red-400 cursor-pointer animate-bounce"
              role="img"
              aria-label="push-pin"
              onClick={() => setSelectedLocation(result)}
            />

            <div className="bg-white rounded-2xl hover:bg-black hover:text-white transition duration-150 ease-out cursor-pointer w-28 border font-semibold py-2 px-2 ">
              {result.price}
            </div>
          </Marker>
          {/* PopUp rendered when the user clicks on a marker */}
          {selectedLocation.long === result.long ? (
            <Popup
              closeOnClick={true}
              onClose={() => setSelectedLocation({})}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </>
      )),
    [searchResults]
  );
  return (
    <>
      <Map
        container="map"
        {...viewState}
        mapStyle="mapbox://styles/valyndsilva/cl5i24lxl008o14rznq22d2v1"
        mapboxAccessToken={process.env.mapbox_key}
        onMove={(e) => setViewState(e.viewState)}
      >
        {markers}
      </Map>
    </>
  );
}

export default MapComponent;
