import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const createRoutingMachineLayer = ({ position, start, end, color }) => {
  console.log("position", start, end, color);
  const instance = L.Routing.control({
    position,
    waypoints: [
      L.latLng(start[0], start[1]),
      L.latLng(end[0], end[1]),
    ],
    lineOptions: {
      styles: [
        {
          color,
        },
      ],
    },
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutingMachineLayer);

export default RoutingMachine;
