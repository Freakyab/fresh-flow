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

export function WarehouseExpenseChart({ className }: { className: string }) {
  const [price, setPrice] = React.useState([]);
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
      "http://localhost:5000/warehouse/getWarehouseExpenseChart/661922f36238f64733cc5736",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
export function WarehouseOccupacyPie({ className }: { className: string }) {
  const [pieData, setPieData] = React.useState<WarehouseOccupacyPieProps>({
    occupied: [],
    unoccupied: 0,
    totalSpace: 0,
  });

  useEffect(() => {
    fetch(
      // Change id
      "http://localhost:5000/warehouse/getOccupiedWarehousePie/661922f36238f64733cc5736",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
    labels: ["Free space", ...pieData.occupied?.map((data) => data.type)],
    datasets: [
      {
        data: [
          pieData.unoccupied,
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
