import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import axios from "axios";
import Layout from "../components/layout.jsx";
export default function Dashboard({ userId, token }) {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    axios.get(`/api/dashboard/summary/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setSummary(res.data));
  }, [userId, token]);

  if (!summary) return <p>Loading...</p>;

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const pieData = Object.entries(summary.expenseByCategory || {}).map(([k, v]) => ({
  name: k,
  value: v
}));

const barData = Object.entries(summary.monthlySpending || {}).map(([k, v]) => ({
  month: k,
  amount: v
}));


  return (
    <Layout>
      <div className="grid grid-cols-2 gap-6 p-6">
        {/* Résumé chiffré */}
        <div className="col-span-2 flex gap-6">
          <div className="p-4 bg-white rounded-xl shadow-md w-1/3">
            <h3>Total Income</h3>
          <p className="text-green-600 font-bold text-xl">{summary.totalIncome} €</p>
        </div>
        <div className="p-4 bg-white rounded-xl shadow-md w-1/3">
          <h3>Total Expenses</h3>
          <p className="text-red-600 font-bold text-xl">{summary.totalExpenses} €</p>
        </div>
        <div className="p-4 bg-white rounded-xl shadow-md w-1/3">
          <h3>Balance</h3>
          <p className="text-blue-600 font-bold text-xl">{summary.balance} €</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="mb-2 font-semibold">Expenses by Category</h3>
        <PieChart width={400} height={300}>
          <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={120} label>
            {pieData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="mb-2 font-semibold">Monthly Spending</h3>
        <BarChart width={500} height={300} data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  </Layout>
  );
}
