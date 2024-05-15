import React, { useEffect, useRef, useState } from "react";
import {
  TileLayer,
  MapContainer,
  Marker,
  Popup,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  userIcon,
  WarehouseIcon,
} from "@/components/marketPlace/location/MarkerIcons";
import RoutingControl from "@/components/marketPlace/location/RoutingMachine";

function WarehouseLocation({
  className,
  location,
  name,
}: {
  className: string;
  location: number[];
  name: string;
}) {
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const mapRef = useRef<any>(null);
  useEffect(() => {
    setTimeout(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position.coords.latitude, position.coords.longitude);
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        });
      }
    }, 1000);
  }, []);

  useEffect(() => {
    // Check if mapRef and mapRef.current are defined before accessing methods
    if (mapRef.current) {
      const map = mapRef.current.leafletElement;
      // Remove any existing layers before adding new ones
      map?.eachLayer((layer: any) => {
        map?.removeLayer(layer);
      });
    }
  }, [location]);

  return (
    <MapContainer
      center={location ? [location[0],location[1]] : [0, 0]}
      zoom={12}
      className={className}
      ref={mapRef} // Assign ref to map container
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[location[0], location[1]]}
        eventHandlers={{
          click: (event: any) => {
            const map = event.target._map;
            if (map) {
              map.flyTo([location[0], location[1]], 12);
            }
          },
        }}
        icon={WarehouseIcon}>
        <Popup>{name}</Popup>
      </Marker>
      {userLocation.latitude !== 0 && userLocation.longitude !== 0 && (
        <Marker
          eventHandlers={{
            click: (event: any) => {
              const map = event.target._map;
              if (map) {
                map.flyTo([userLocation.latitude, userLocation.longitude], 12);
              }
            },
          }}
          position={[userLocation.latitude, userLocation.longitude]}
          icon={userIcon}>
          <Popup>You are here</Popup>
        </Marker>
      )}
      {userLocation.latitude !== 0 && userLocation.longitude !== 0 && (
        <RoutingControl
          position="topleft"
          end={[
            location[0],
            location[1],
          ]}
          start={[userLocation?.latitude, userLocation?.longitude]}
          color="#757de8"
        />
      )}
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Map">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
      </LayersControl>
    </MapContainer>
  );
}

export default WarehouseLocation;