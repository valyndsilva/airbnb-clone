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

  const [selectedIndex, setSelectedIndex] = useState(null);
  console.log(selectedIndex);

  // Create a CustomPopup component to display the address after clicking on a marker.
  const CustomPopup = ({ index, marker }) => {
    return (
      <Popup
        latitude={marker.lat}
        longitude={marker.long}
        closeButton={true}
        closeOnClick={false}
        onClose={() => {
          setSelectedLocation({}), setSelectedIndex(null);
        }}
        offsetTop={-30} // popup appears on top of the marker
        className="mapbox-popup-close bg-transparent p-0"
      >
        <img
          src={marker.img}
          className="h-40 w-60 rounded-xl bg-transparent object-cover "
          alt=""
        />
        <div className="absolute font-semibold max-w-[200px] text-white z-20 bottom-5 left-4">
          <div>
            <h3 className="">{marker.title}</h3>
            <h4 className="text-xl">{marker.price}</h4>
          </div>
          <p className="flex items-center">
            <StarIcon className="h-6 text-red-400" />
            {marker.star}
          </p>
          <div></div>
        </div>
        <span className=" w-full absolute rounded-xl  bottom-0 z-10 pointer-events-none transform   p-20 bg-gradient-to-t from-gray-800 "></span>
      </Popup>
    );
  };

  // To make it work, we need to add an onClick on our markers called openPopup. This function will set which marker was clicked thanks to its unique index.
  const CustomMarker = ({ index, marker }) => {
    return (
      <Marker
        longitude={marker.long}
        latitude={marker.lat}
        offsetLeft={-20}
        offsetTop={-10}
        onClick={() => {
          setSelectedLocation(marker), setSelectedIndex(index);
        }}
      >
        <LocationMarkerIcon
          className="w-5 h-5 text-red-400 cursor-pointer animate-bounce"
          role="img"
          aria-label="push-pin"
        />

        <div className="bg-white rounded-2xl hover:bg-black hover:text-white transition duration-150 ease-out cursor-pointer w-28 border font-semibold py-2 px-2 ">
          {marker.price}
        </div>
      </Marker>
    );
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
          <>
            <CustomMarker
              key={`marker-${index}`}
              index={index}
              marker={result}
            />
            {/* PopUp rendered when the user clicks on a marker */}

            {selectedLocation.lat === result.lat ? (
              <CustomPopup marker={result} />
            ) : null}
          </>
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
