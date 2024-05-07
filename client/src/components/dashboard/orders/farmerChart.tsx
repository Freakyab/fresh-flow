"use client";
import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import handleToast from "@/components/toastifyNotification";
import useUserDetails from "@/redux/dispatch/useUserDetails";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Warehouse Expense Chart",
    },
  },
};

export function FarmerExpenseChart({ className }: { className: string }) {
  const [price, setPrice] = React.useState([]);
  const { userDetails } = useUserDetails();
  const label = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    fetch(
      // Change id
      // `http://localhost:5000/farmer/getFarmerExpenseChart/${userDetails.userDetails._id}`,
      `https://fresh-flow-backend.vercel.app/farmer/getFarmerExpenseChart/${userDetails.userDetails._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "accept": "/",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setPrice(data);
        }
      });
  }, []);

  let newData = {
    labels: label,
    datasets: [
      {
        label: "Total Earned",
        data: price,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={newData} className={className} />;
}
export function WarehouseInventoryPie({ className }: { className: string }) {
  const [pieData, setPieData] = React.useState<WarehouseOccupacyPieProps>({
    occupied: [],
    unoccupied: 0,
    totalSpace: 0,
  });

  const { userDetails } = useUserDetails();

  useEffect(() => {
    fetch(
      // Change id
      // `http://localhost:5000/farmer/getOccupiedWarehouseInventoryPie/${userDetails.userDetails._id}`,
      `https://fresh-flow-backend.vercel.app/farmer/getOccupiedWarehouseInventoryPie/${userDetails.userDetails._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "accept": "/",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setPieData(data);
        } else {
          handleToast("No data found", "info");
        }
      });
  }, []);

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // ṃake newData in such way that it map all the data in pie chart occupied.type with its quantity and shows unoccupied as well
  let newData = {
    labels: [...pieData.occupied?.map((data) => data.type)],
    datasets: [
      {
        data: [
          // pieData.unoccupied,
          ...pieData.occupied?.map((data) => data.quantity),
        ],
        backgroundColor: [
          "#FF6384",
          ...pieData.occupied?.map(() => getRandomColor()),
        ],
      },
    ],
  };

  return (
    <Pie
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top" as const,
          },
          title: {
            display: true,
            text: "Warehouse Occupancy Pie",
          },
        },
      }}
      data={newData}
      className={className}
    />
  );
}
