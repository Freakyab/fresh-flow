// Require libs
import React from "react";
import { TileLayer, MapContainer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

import warehouseDetailData from "./dataSample/warehouseData";

interface Props {
  cardRefs: React.RefObject<HTMLDivElement>[];
  className: string;
  FlyOn: {
    lat: number;
    lng: number;
  };
}

const Map = ({ cardRefs, className, FlyOn }: Props) => {
  const mapRef = React.useRef<any>(null);

  function LocationMarker() {
    const map = useMap();
    if (FlyOn.lat !== 0 && FlyOn.lng !== 0) {
      map.flyTo([FlyOn.lat, FlyOn.lng], 12);
      if (mapRef) {
        mapRef.current.interactive = true;
        // mapRef.current.openPopup = true;
      }
    }
    return null;
  }

  const icon = new Icon({
    iconUrl:
      "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png",
    iconSize: [40, 40],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <>
      <MapContainer
       
        center={[21, 85]}
        scrollWheelZoom={true}
        zoom={5}
        className={className}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        {warehouseDetailData.map((warehouse, index) => (
          <Marker
            key={index}
            icon={icon}
            ref={mapRef}
            position={[warehouse.location[0], warehouse.location[1]]}
            // riseOnHover={true}
            eventHandlers={{
              click: (event) => {
                const map = event.target._map;
                if (map) {
                  map.flyTo([warehouse.location[0], warehouse.location[1]], 12);
                }
                cardRefs[index].current?.scrollIntoView({
                  behavior: "smooth",
                });
              },
            }}>
            <Popup >{warehouse.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default Map;
