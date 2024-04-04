import React, { useState, useRef } from "react";
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

import warehouseDetailData from "./dataSample/warehouseData";

interface Props {
  cardRefs: React.RefObject<HTMLDivElement>[];
  className: string;
  FlyOn: {
    lat: number;
    lng: number;
  };
  search: string | undefined;
  updLoc: (loc: { lat: number; lng: number }) => void;
  loc: { lat: number; lng: number } | null;
  isClicked: boolean;
  setIsClicked: (isClicked: boolean) => void;
}

const Map = ({
  cardRefs,
  className,
  FlyOn,
  search,
  updLoc,
  loc,
  isClicked,
  setIsClicked,
}: Props) => {
  const markerRef = warehouseDetailData.map(() => useRef<any>(null));
  const mapRef = useRef<any>(null);
  const [routingControlAdded, setRoutingControlAdded] = useState(false);
  const routingMachineRef = useRef<any>(null);

  function LocationMarker() {
    const map = useMap();

    // Calculate the warehouse index which has the same location as the FlyOn
    const index = warehouseDetailData.findIndex(
      (warehouse) =>
        warehouse.location[0] === FlyOn.lat &&
        warehouse.location[1] === FlyOn.lng
    );

    // Use setTimeout to load the popup after the map uses flyto
    if (FlyOn.lat !== 0 && FlyOn.lng !== 0) {
      map.flyTo([FlyOn.lat, FlyOn.lng], 12);
      setTimeout(() => {
        if (markerRef[index]?.current) {
          markerRef[index].current.openPopup();
        }
      }, 500);
    }

    return null;
  }

  React.useEffect(() => {
    if (search?.length === 0 && routingControlAdded) {
      if (routingMachineRef.current) {
        const map = routingMachineRef.current.leafletElement._map; // Get the Leaflet map instance
        map.removeControl(routingMachineRef.current); // Remove the control
        setRoutingControlAdded(false);
      }
    }
    setIsClicked(false);
  }, [search, routingControlAdded]);

  function Test({
    location,
    search,
  }: {
    location: { lat: number; lng: number } | null;
    search: string | undefined;
  }) {
    const map = useMap();
    if (search?.length == 0) map.flyTo([21, 85], 5);
    if (location) map.flyTo(location, 12);

    return location ? (
      <Marker position={location} icon={userIcon}>
        <Popup>You are here: {search}</Popup>
      </Marker>
    ) : null;
  }

  return (
    <>
      <MapContainer
        ref={mapRef}
        center={[21, 85]}
        scrollWheelZoom={true}
        zoom={5}
        className={className}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {search ? (
          <>
            {isClicked && loc ? (
              !routingControlAdded && (
                <RoutingControl
                  ref={routingMachineRef}
                  key={FlyOn.lat}
                  position={"topleft"}
                  start={[loc?.lat, loc?.lng]}
                  end={[FlyOn?.lat, FlyOn?.lng]}
                  color={"#757de8"}
                />
              )
            ) : null}
            <Test location={loc} search={search} />
            <LocationSearch search={search} updLoc={updLoc} />
          </>
        ) : null}
        {warehouseDetailData
          .filter((warehouse) => {
            if (search?.length === 0) return warehouse;
            if (!loc) return warehouse;
            const latDiff = Math.abs(warehouse.location[0] - loc?.lat);
            const lngDiff = Math.abs(warehouse.location[1] - loc?.lng);

            return latDiff <= latLngThreshold && lngDiff <= latLngThreshold;
          })
          .map((warehouse, index) => (
            <Marker
              key={index}
              icon={WarehouseIcon}
              ref={markerRef[index]}
              position={[warehouse.location[0], warehouse.location[1]]}
              eventHandlers={{
                click: (event) => {
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
              }}
            >
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
