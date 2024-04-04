import React, {  useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";

function LoactionSearch({ search, updLoc }) {
  useEffect(() => {
    const geocoder = L.Control.Geocoder.nominatim();
    if (search) {
      let newSearch = search.toLowerCase() + ", india";
      geocoder.geocode(newSearch, (results) => {
        //console.log(results);
        var r = results[0];
        if (r) {
          const { lat, lng } = r?.center;
          if(lat && lng)
          updLoc({ lat, lng });
          //console.log(r);
        }
      });
    }
  }, [search]);

  return null;
}

export default LoactionSearch;
