import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const PaymentInfoPage = () => {
  const [totalPayments, setTotalPayments] = useState(120); // Total payments
  const [totalBenefits, setTotalBenefits] = useState(60000); // Total benefits
  const [monthlyPayments, setMonthlyPayments] = useState([
    8000, 7500, 9000, 7000, 6500, 9000, 6000, 8500, 7800, 7400, 6900, 7200,
  ]); // Monthly payments data
  const [dailyPayments, setDailyPayments] = useState([
    500, 600, 450, 700, 800, 900, 650,
  ]); // Daily payments data

  const paymentDetails = Array.from({ length: 20 }, (_, i) => ({
    id: `#${i + 1}`,
    name: `Customer ${i + 1}`,
    amount: `$${(Math.random() * 1000).toFixed(2)}`,
    date: `12/${i + 1}/2024`,
  }));

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const monthsOfYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const barChartData = {
    labels: monthsOfYear,
    datasets: [
      {
        label: "Payments Per Month ($)",
        data: monthlyPayments,
        backgroundColor: "#4ADE80",
      },
    ],
  };

  const pieChartData = {
    labels: daysOfWeek,
    datasets: [
      {
        label: "Payments Per Day ($)",
        data: dailyPayments,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#E3E36A",
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Payment Information Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Total Payments */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Total Payments</h2>
          <p className="text-lg">Total Number of Payments: {totalPayments}</p>
          <p className="text-lg mt-2">Total Benefits: ${totalBenefits}</p>
        </div>

        {/* Payments Chart (Bar) */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Monthly Payments</h2>
          <Bar
            data={barChartData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
            }}
          />
        </div>

        {/* Daily Payments Chart (Pie) */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Daily Payments</h2>
          <Pie data={pieChartData} options={{ responsive: true }} />
        </div>

        {/* Latest Payment Details */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Latest Payment Details
          </h2>
          <table className="min-w-full text-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left">Payment ID</th>
                <th className="py-2 px-4 text-left">Customer Name</th>
                <th className="py-2 px-4 text-left">Amount</th>
                <th className="py-2 px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {paymentDetails.map((payment) => (
                <tr key={payment.id}>
                  <td className="py-2 px-4">{payment.id}</td>
                  <td className="py-2 px-4">{payment.name}</td>
                  <td className="py-2 px-4">{payment.amount}</td>
                  <td className="py-2 px-4">{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-gray-800 p-6 mt-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Summary</h2>
        <p className="text-lg">
          We have received a total of {totalPayments} payments this year,
          generating a benefit of ${totalBenefits}. Monthly and daily analysis
          is available in the charts above for a detailed breakdown.
        </p>
      </div>
    </div>
  );
};

export default PaymentInfoPage;
