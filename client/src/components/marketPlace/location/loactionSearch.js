import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import useMapLoading from "@/redux/dispatch/useMaploading";

function LoactionSearch() {
  const { getSearch, setLoc } = useMapLoading();
  useEffect(() => {
    const geocoder = L.Control.Geocoder.nominatim();
    const search = getSearch();
    if (search) {
      let newSearch = search + ", india";
      geocoder.geocode(newSearch, (results) => {
        var r = results[0];
        console.log(r);
        if (r) {
          const { lat, lng } = r?.center;
          if (lat && lng) setLoc(lat, lng);
        }
      });
    }
  }, [getSearch]);

  return null;
}

export default LoactionSearch;