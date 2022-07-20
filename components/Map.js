import { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import Image from "next/image";
import { LocationMarkerIcon, StarIcon } from "@heroicons/react/solid";

function Map({ resultsData, viewLocation, filterResults }) {
  // Get coordinates from search results
  const coords = resultsData.map((result) => {
    return {
      longitude: result.longitude,
      latitude: result.latitude,
    };
  });

  // Use coordinates from results to get center location for mapbox
  const center = getCenter(coords);

  // State for mapbox info
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 10,
  });

  // State for displaying location popup on map
  const [selectedLocation, setSelectedLocation] = useState({});
  console.log(selectedLocation);
  // Check for any location being sent in via props. Set location on map.
  useEffect(() => {
    setSelectedLocation(viewLocation);
  }, [viewLocation]);

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/valyndsilva/cl5i24lxl008o14rznq22d2v1"
      mapboxAccessToken={process.env.mapbox_key}
      {...viewport}
      onMove={(e) => setViewport(e.viewport)}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {resultsData
        .filter((item) => {
          if (filterResults === "") {
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
        .map((result) => (
          <div key={result.longitude}>
            <Marker
              longitude={result.longitude}
              latitude={result.latitude}
              offsetLeft={-20}
              offsetTop={-10}
              onClick={() => setSelectedLocation(result)}
            >
              <LocationMarkerIcon
                className="w-8 h-8 text-red-400 cursor-pointer animate-bounce"
                role="img"
                aria-label="push-pin"
              />
              <div className="bg-white rounded-2xl hover:bg-black hover:text-white transition duration-150 ease-out cursor-pointer w-28 border font-semibold py-2 px-2 ">
                {result.price}
              </div>
            </Marker>

            {/* Display popup on map for selected location */}
            {selectedLocation.longitude === result.longitude ? (
              <Popup
                onClose={() => setSelectedLocation({})}
                closeOnclick={true}
                closeButton={true}
                latitude={result.latitude}
                longitude={result.longitude}
                className="z-40 map-pop-up"
              >
                <div>
                  <div className="relative w-full h-36">
                    <Image
                      src={result.images[0].url}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                    <h3 className="absolute bottom-0 right-0 font-semibold text-white text-sm px-3 py-1 bg-gray-700">
                      {result.price}
                    </h3>
                  </div>

                  <div className="px-3">
                    <h2 className="font-semibold pt-2">{result.title}</h2>
                    <p className="text-sm font-light">{result.location}</p>
                    <div className="flex items-center">
                      <StarIcon className="w-5 h-5 text-red-400" />{" "}
                      {result.star}
                    </div>
                  </div>
                </div>
              </Popup>
            ) : null}
          </div>
        ))}
    </ReactMapGL>
  );
}

export default Map;
