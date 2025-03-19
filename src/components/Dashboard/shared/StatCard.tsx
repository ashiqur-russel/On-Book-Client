import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
    <div className="text-blue-500 text-3xl">{icon}</div>
    <div className="ml-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{value}</p>
    </div>
  </div>
);

export default StatCard;
