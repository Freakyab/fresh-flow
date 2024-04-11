import React, { useState, useRef, useEffect } from "react";
import useMapLoading from "@/redux/dispatch/useMaploading";
import {
  TileLayer,
  MapContainer,
  Marker,
  Popup,
  useMap,
  LayersControl,
} from "react-leaflet";
import RoutingControl from "@/components/marketPlace/location/RoutingMachine";

import "leaflet/dist/leaflet.css";
import LocationSearch from "@/components/marketPlace/location/loactionSearch";
import { userIcon, WarehouseIcon } from "./marketPlace/location/MarkerIcons";
import { latLngThreshold } from "@/components/marketPlace/location/filter";

// import warehouseDetailData from "./dataSample/warehouseData";

interface Props {
  cardRefs: React.RefObject<HTMLDivElement>[];
  className: string;
  warehouseDetailData : warehouseDetailDataProps[];
}

const Map = ({ cardRefs, className,warehouseDetailData }: Props) => {
        const [routingControlAdded, setRoutingControlAdded] = useState(false);
  const markerRef = warehouseDetailData.map(() => useRef<any>(null));
  const mapRef = useRef<any>(null);
  const routingMachineRef = useRef<any>(null);

  const { getFlyOn ,getSearch , getIsClicked ,getLoc,changeIsClicked} = useMapLoading();

  function LocationMarker() {
    const map = useMap();

    // Calculate the warehouse index which has the same location as the FlyOn
    const index = warehouseDetailData.findIndex(
      (warehouse) =>
        warehouse.location[0] === getFlyOn().lat &&
        warehouse.location[1] === getFlyOn().lng
    );

    // Use setTimeout to load the popup after the map uses flyto

    if (
      (getFlyOn().lat !== 0 &&
        getFlyOn().lng !== 0 &&
        getSearch().length == 0) ||
      (getSearch().length !== 0 &&
        getLoc().lat !== 0 &&
        getLoc().lng !== 0 &&
        getIsClicked())
    ) {
      map.flyTo([getFlyOn().lat, getFlyOn().lng], 12);
      setTimeout(() => {
        if (markerRef[index]?.current) {
          markerRef[index].current.openPopup();
        }
      }, 500);
    }

    return null;
  }

  useEffect(() => {
    if (getSearch()?.length === 0 && routingControlAdded) {
      if (routingMachineRef.current) {
        const map = routingMachineRef.current.leafletElement._map; // Get the Leaflet map instance
        map.center = [21, 85]; // Set the center of the map
        map.removeControl(routingMachineRef.current); // Remove the control
        setRoutingControlAdded(false);
      }
      changeIsClicked(false);
    }
  }, [getSearch(), routingControlAdded]);

  function Test() {
    const map = useMap();
    if (getSearch()?.length == 0) map.flyTo([21, 85], 5);
    if (getLoc()) map.flyTo(getLoc(), 12);

    return location ? (
      <Marker position={getLoc()} draggable={true} icon={userIcon}>
        <Popup>You are here: {getSearch()}</Popup>
      </Marker>
    ) : null;
  }
  return (
    <>
      <MapContainer
        ref={mapRef}
        // @ts-ignore
        center={[19, 76]}
        scrollWheelZoom={true}
        zoom={7}
        className={className}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {getSearch() ? (
          <>
            {getIsClicked() && getLoc()
              ? !routingControlAdded && (
                  <RoutingControl
                    ref={routingMachineRef}
                    key={getFlyOn().lat}
                    position={"topleft"}
                    start={[getLoc()?.lat, getLoc()?.lng]}
                    end={[getFlyOn()?.lat, getFlyOn()?.lng]}
                    color={"#757de8"}
                  />
                )
              : null}
            <Test />
            <LocationSearch />
          </>
        ) : null}
        {warehouseDetailData
          .filter((warehouse) => {
            const searchLength = getSearch()?.length;
            const userLocation = getLoc();

            if (searchLength === 0 || !userLocation) return true; // No filtering required

            const earthRadius = 6371; // Earth's radius in kilometers
            const lat1 = userLocation.lat * (Math.PI / 180); // Convert latitude to radians
            const lat2 = warehouse.location[0] * (Math.PI / 180);
            const lon1 = userLocation.lng * (Math.PI / 180); // Convert longitude to radians
            const lon2 = warehouse.location[1] * (Math.PI / 180);

            const latDiff = Math.abs(lat2 - lat1); // Calculate absolute latitude difference
            const lonDiff = Math.abs(lon2 - lon1); // Calculate absolute longitude difference

            // Haversine formula to calculate distance between two points on a sphere
            const a =
              Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
              Math.cos(lat1) *
                Math.cos(lat2) *
                Math.sin(lonDiff / 2) *
                Math.sin(lonDiff / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = earthRadius * c; // Distance in kilometers

            return distance <= latLngThreshold; // Compare distance with threshold in kilometers
          })
          .map((warehouse, index) => (
            <Marker
              key={index}
              icon={WarehouseIcon}
              ref={markerRef[index]}
              position={[warehouse.location[0], warehouse.location[1]]}
              eventHandlers={{
                // @ts-ignore
                click: (event: any) => {
                  const map = event.target._map;
                  if (map) {
                    map.flyTo(
                      [warehouse.location[0], warehouse.location[1]],
                      12
                    );
                  }
                  cardRefs[index].current?.scrollIntoView({
                    behavior: "smooth",
                  });
                },
              }}>
              <LocationMarker />
              <Popup>{warehouse.name}</Popup>
            </Marker>
          ))}
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Map">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
      </MapContainer>
    </>
  );
};

export default Map;
