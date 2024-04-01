import { TileLayer, MapContainer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import {Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

interface CurrentLocation {
  latitude: number;
  longitude: number;
  //   display_name:string
}

interface Props {
  location: CurrentLocation; // Fix the prop name here
}
const  Map = ({ location }: Props) => {
  //   const currentCity: Location = location;

  const icon = new Icon({
    iconUrl: "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <MapContainer center={{ lat: 20, lng: 80 }} zoom={5} scrollWheelZoom={false} 
      className="w-screen h-screen"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker
        icon={icon}
        position={[location.latitude, location.longitude]}>
        <Popup>
          { "Nagpur" }
        </Popup>       
      </Marker>
    </MapContainer>
  );
}

export default Map;