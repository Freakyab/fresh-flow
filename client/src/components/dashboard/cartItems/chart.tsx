"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import useCustomerOrderCardItem from "@/redux/dispatch/useCustomerOrderCardItem";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const label = ["January", "February", "March", "April", "May", "June", "July"];

export function ExpenseChart() {
  const { getTotalSpend } = useCustomerOrderCardItem();
  const [price, setPrice] = React.useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  // const [label, setLabel] = React.useState([]);
  React.useEffect(() => {
    if (getTotalSpend().length === 0) {
      return;
    } else {
      // if the getTotalSpend is not empty then merge the data having same month
      let mergedData: TotalSpend[] = [];

      getTotalSpend().forEach((item) => {
        let existingItem = mergedData.find(
          (element) => element.month === item.month
        );
        if (!existingItem) {
          mergedData.push({
            month: item.month,
            price: item.price,
          });
        } else {
          existingItem.price += item.price;
        }
      });

      setPrice(
        price.map((item, index) => {
          let existingItem = mergedData.find(
            (element) => element.month === label[index]
          );
          if (existingItem) {
            return existingItem.price;
          } else {
            return item;
          }
        })
      );
    }
  }, [getTotalSpend()]);
  let newData = {
    labels: label,
    datasets: [
      {
        label: "Total Spend",
        data: price,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={newData} />;
}
