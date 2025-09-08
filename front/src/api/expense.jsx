
const API_URL = import.meta.env.VITE_API_URL_EXPENSES;


export const createExpense = async (expense, userId) => {
  const token = localStorage.getItem('token');
  
  const payload = {
    title: expense.description || expense.title || "",
    amount: parseFloat(expense.amount),
    userId: userId
  };
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
  return res.json();
};


export const getExpenses = async (userId) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/user/${userId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

export const updateExpense = async (id, expense) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(expense),
  });
  return res.json();
};

export const deleteExpense = async (id) => {
  const token = localStorage.getItem('token');
  await fetch(`${API_URL}/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
};
