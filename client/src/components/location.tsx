import { TileLayer, MapContainer, Marker, Popup } from "react-leaflet";
// import { FaMapMarker } from "react-icons/fa";

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

  return (
    <MapContainer zoom={4} scrollWheelZoom={false} 
      className="w-screen h-screen"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker
        // icon={<FaMapMarker />}
        position={[location.latitude, location.longitude]}>
        <Popup>
          { "Nagpur" }
        </Popup>       
      </Marker>
    </MapContainer>
  );
}

export default Map;