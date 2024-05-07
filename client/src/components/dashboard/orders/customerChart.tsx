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
import useUserDetails from "@/redux/dispatch/useUserDetails";
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

export function CustomerExpenseChart({ className }: { className: string }) {
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
      // `http://localhost:5000/customer/getCustomerExpenseChart/${userDetails.userDetails._id}`,
       `https://fresh-flow-backend.vercel.app/customer/getCustomerExpenseChart/${userDetails.userDetails._id}`,
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
        if (data.isFound) {
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
