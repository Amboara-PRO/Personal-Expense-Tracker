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
    date: "",
    category: "",
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
    if (editing) {
      await updateExpense(editing.id, form);
      setMessage("Dépense modifiée !");
    } else {
      await createExpense(form, user.id);
      setMessage("Dépense ajoutée !");
    }
    setForm({ amount: "", description: "", date: "", category: "" });
    setEditing(null);
    if (user) {
      const data = await getExpenses(user.id);
      setExpenses(data);
    }
  };

  const handleEdit = (exp) => {
    setEditing(exp);
    setForm({
      amount: exp.amount,
      description: exp.description,
      date: exp.date.slice(0, 10),
      category: exp.category || "",
    });
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    setMessage("Dépense supprimée !");
    if (user) {
      const data = await getExpenses(user.id);
      setExpenses(data);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Mes dépenses</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
          <input
            type="number"
            name="amount"
            placeholder="Montant"
            value={form.amount}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Catégorie"
            value={form.category}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            {editing ? "Modifier" : "Ajouter"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setForm({ amount: "", description: "", date: "", category: "" });
              }}
              className="bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
            >
              Annuler
            </button>
          )}
        </form>
        {message && <p className="mt-4 text-green-600">{message}</p>}
        {expenses.length === 0 ? (
          <p>Aucune dépense enregistrée.</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr>
                <th>Montant</th>
                <th>Description</th>
                <th>Date</th>
                <th>Catégorie</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr key={exp.id}>
                  <td>{exp.amount} €</td>
                  <td>{exp.description || exp.title || ""}</td>
                  <td>{exp.date ? exp.date.slice(0, 10) : (exp.createdAt ? exp.createdAt.slice(0, 10) : "")}</td>
                  <td>{exp.category || ""}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(exp)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Supprimer
                    </button>
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
