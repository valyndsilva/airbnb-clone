import React, { useMemo, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import getCenter from "geolib/es/getCenter";
import { LocationMarkerIcon, StarIcon } from "@heroicons/react/solid";
function MapComponent({ searchResults, filterResults }) {
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
    width: "100%",
    height: "100%",
    longitude: center.longitude,
    latitude: center.latitude,
    pitch: 55, // pitch in degrees
    bearing: -50, // bearing in degrees
    zoom: 12, // zoom level
  });

  const [selectedMarker, setSelectedMarker] = useState(null);
  console.log(selectedMarker);
  const closePopup = () => {
    setSelectedMarker(null);
  };

  const openPopup = (index) => {
    setSelectedMarker(index);
  };

  // The Map  component is rerendered on every animation frame when the user is dragging the map. If it's trying to render hundreds of markers, the performance lag will become quite visible. One way to improve the performance is useMemo
  const markers = useMemo(
    () =>
      searchResults
        .filter((item) => {
          if (filterResults === "") {
            console.log({ item });
            return item;
          } else if (
            item.price
              .toLowerCase()
              .includes(filterResults.toString().toLowerCase()) ||
            item.description
              .toLowerCase()
              .includes(filterResults.toString().toLowerCase()) ||
            item.title
              .toLowerCase()
              .includes(filterResults.toString().toLowerCase())
          ) {
            return item;
          }
        })
        .map((result, index) => (
          <div key={`marker-${index}`}>
            <Marker
              longitude={result.long}
              latitude={result.lat}
              offsetLeft={-20}
              offsetTop={-10}
              onClick={() => {
                setSelectedLocation(result), openPopup(index);
              }}
            >
              <LocationMarkerIcon
                className="w-5 h-5 text-red-400 cursor-pointer animate-bounce"
                role="img"
                aria-label="push-pin"
              />

              <div className="bg-white rounded-2xl hover:bg-black hover:text-white transition duration-150 ease-out cursor-pointer w-28 border font-semibold py-2 px-2 ">
                {result.price}
              </div>
            </Marker>

            {/* PopUp rendered when the user clicks on a marker */}
            {openPopup ? (
              <Popup
                latitude={result.lat}
                longitude={result.long}
                className="mapbox-popup-close bg-transparent p-0"
                offsetTop={-30}
                closeButton={true}
                closeOnClick={false}
                // closeOnClick={true}
                onClose={() => {
                  setSelectedLocation({}), closePopup();
                }}
              >
                <img
                  src={result.img}
                  className="h-40 w-60 rounded-xl bg-transparent object-cover "
                  alt=""
                />
                <div className="absolute font-semibold max-w-[200px] text-white z-20 bottom-5 left-4">
                  <div>
                    <h3 className="">{result.title}</h3>
                    <h4 className="text-xl">{result.price}</h4>
                  </div>
                  <p className="flex items-center">
                    <StarIcon className="h-6 text-red-400" />
                    {result.star}
                  </p>
                  <div></div>
                </div>
                <span className=" w-full absolute rounded-xl  bottom-0 z-10 pointer-events-none transform   p-20 bg-gradient-to-t from-gray-800 "></span>
              </Popup>
            ) : (
              false
            )}
          </div>
        )),
    [searchResults, filterResults]
  );
  return (
    <>
      <Map
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
