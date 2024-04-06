import React, { useState, useRef } from "react";
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

import warehouseDetailData from "./dataSample/warehouseData";

interface Props {
  cardRefs: React.RefObject<HTMLDivElement>[];
  className: string;
}

const Map = ({
  cardRefs,
  className,
}: Props) => {
  const markerRef = warehouseDetailData.map(() => useRef<any>(null));
  const { getFlyOn, getLoc, getSearch, setIsClicked,getIsClicked } = useMapLoading();
  const mapRef = useRef<any>(null);
  const [routingControlAdded, setRoutingControlAdded] = useState(false);
  const routingMachineRef = useRef<any>(null);

  function LocationMarker() {
    const map = useMap();

    // Calculate the warehouse index which has the same location as the FlyOn
    const index = warehouseDetailData.findIndex(
      (warehouse) =>
        warehouse.location[0] === getFlyOn().lat &&
        warehouse.location[1] === getFlyOn().lng
    );

    // Use setTimeout to load the popup after the map uses flyto
    if (getFlyOn().lat !== 0 && getFlyOn().lng !== 0) {
      map.flyTo([getFlyOn().lat, getFlyOn().lng], 12);
      setTimeout(() => {
        if (markerRef[index]?.current) {
          markerRef[index].current.openPopup();
        }
      }, 500);
    }

    return null;
  }

  React.useEffect(() => {
    if (getSearch()?.length === 0 && routingControlAdded) {
      
      if (routingMachineRef.current) {
        const map = routingMachineRef.current.leafletElement._map; // Get the Leaflet map instance
        map.center = [21, 85]; // Set the center of the map
        map.removeControl(routingMachineRef.current); // Remove the control
        setRoutingControlAdded(false);
      }
    }
    setIsClicked(false);
  }, [getSearch(), routingControlAdded]);

  function Test() {
    const map = useMap();
    if (getSearch()?.length == 0) map.flyTo([21, 85], 5);
    if (getLoc()) map.flyTo(getLoc(), 12);

    return location ? (
      <Marker position={getLoc()} icon={userIcon}>
        <Popup>You are here: {getSearch()}</Popup>
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
        {getSearch() ? (
          <>
            {getIsClicked() && getLoc() ? (
              !routingControlAdded && (
                <RoutingControl
                  ref={routingMachineRef}
                  key={getFlyOn().lat}
                  position={"topleft"}
                  start={[getLoc()?.lat, getLoc()?.lng]}
                  end={[getFlyOn()?.lat, getFlyOn()?.lng]}
                  color={"#757de8"}
                />
              )
            ) : null}
            <Test />
            <LocationSearch />
          </>
        ) : null}
        {warehouseDetailData
          .filter((warehouse) => {
            if (getSearch()?.length === 0) return warehouse;
            if (!getLoc()) return warehouse;
            const latDiff = Math.abs(warehouse.location[0] - getLoc()?.lat);
            const lngDiff = Math.abs(warehouse.location[1] - getLoc()?.lng);

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
