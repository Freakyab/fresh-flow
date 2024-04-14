import React from "react";
import { ExpenseChart } from "@/components/dashboard/cartItems/chart";
import { Card } from "@nextui-org/react";
function page() {
  return (
    <Card shadow="sm" className="w-full m-3">
      <div className="w-full h-full">
        <ExpenseChart 
      // return <ExpenseChart />;
          className="w-fit h-fit"
        />
      </div>
    </Card>
  );
}

export default page;
