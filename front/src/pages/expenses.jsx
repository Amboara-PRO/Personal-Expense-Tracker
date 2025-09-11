import { useEffect, useState, useContext } from "react";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../api/expense";
import { AuthContext } from "../context/authContext";
import Layout from "../components/layout.jsx";

export default function Expenses() {
  const { user } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    amount: "",
    description: "",
    category: "",
    date: "",
    type: "ONE_TIME",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    async function fetchExpenses() {
      if (user) {
        const data = await getExpenses(user.id);
        setExpenses(data);
      }
    }
    fetchExpenses();
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let expenseData;
      if (editing) {
        expenseData = await updateExpense(editing.id, form);
        setExpenses(
          expenses.map((e) => (e.id === editing.id ? expenseData : e))
        );
        setMessage("Expense updated !");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      } else {
        expenseData = await createExpense(form, user.id);
        setExpenses([expenseData, ...expenses]);
        setMessage("Expense added !");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }

      setForm({
        amount: "",
        description: "",
        category: "",
        date: "",
        type: "ONE_TIME",
        startDate: "",
        endDate: "",
      });
      setEditing(null);
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleEdit = (exp) => {
    setEditing(exp);
    setForm({
      amount: exp.amount,
      description: exp.description || "",
      category: exp.category || "",
      date: exp.type === "ONE_TIME" ? exp.date?.slice(0, 10) : "",
      type: exp.type || "ONE_TIME",
      startDate: exp.startDate ? exp.startDate.slice(0, 10) : "",
      endDate: exp.endDate ? exp.endDate.slice(0, 10) : "",
    });
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    setExpenses(expenses.filter((e) => e.id !== id));
    setMessage("Expense deleted !");
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <Layout>
      <div className="max-w-[51rem] mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">My expenses</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            maxLength="60"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            maxLength="60"
            required
          />

          <div>
            <label className="block font-medium">Types</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="ONE_TIME">One-time</option>
              <option value="RECURRING">Recurring</option>
            </select>
          </div>

          {form.type === "ONE_TIME" && (
            <div>
              <label className="block font-medium">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              />
            </div>
          )}

          {form.type === "RECURRING" && (
            <>
              <div>
                <label className="block font-medium">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            {editing ? "Update" : "Add"}
          </button>

          {editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setForm({
                  amount: "",
                  description: "",
                  category: "",
                  date: "",
                  type: "ONE_TIME",
                  startDate: "",
                  endDate: "",
                });
              }}
              className="bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </form>

        {message && <p className="mt-4 text-green-600">{message}</p>}

        {expenses.length === 0 ? (
          <p>No expenses recorded</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Amount</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Category</th>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr key={exp.id}>
                  <td className="px-4 py-2 border">{exp.amount} $</td>
                  <td className="px-4 py-2 border">{exp.description || ""}</td>
                  <td className="px-4 py-2 border">{exp.category || ""}</td>
                  <td className="px-4 py-2 border">{exp.type}</td>
                  <td className="px-4 py-2 border">
                    {exp.type === "ONE_TIME"
                      ? exp.date?.slice(0, 10)
                      : `${exp.startDate?.slice(0, 10)} → ${
                          exp.endDate ? exp.endDate.slice(0, 10) : "ongoing"
                        }`}
                  </td>
                  <td className="px-4 py-2 border">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(exp)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(exp.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}
