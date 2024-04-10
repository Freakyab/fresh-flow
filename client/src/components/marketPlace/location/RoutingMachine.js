import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import {WarehouseIcon,userIcon} from "@/components/marketPlace/location/MarkerIcons";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const createRoutingMachineLayer = ({ position, start, end, color }) => {
  let marker_icon;

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
    addWaypoints: false,
    draggableWaypoints: false,
    fitSelectedRoutes: false,
    createMarker: function (i, wp, n) {
      if (i === 0) {
         marker_icon = userIcon
    } else {
        marker_icon = WarehouseIcon
      }
      return L.marker(wp.latLng, {
        draggable: false,
        icon: marker_icon,
      })
    },
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutingMachineLayer);

export default RoutingMachine;
