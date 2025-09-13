const API_URL = import.meta.env.VITE_API_URL_EXPENSES;

export const createExpense = async (expense, userId) => {
  const token = localStorage.getItem("token");

  const payload = {
    description: expense.description || "",
    amount: parseFloat(expense.amount),
    type: expense.type,
    category: expense.category || "",
    userId,
  };

  if (expense.type === "ONE_TIME") payload.date = expense.date;
  if (expense.type === "RECURRING") {
    payload.startDate = expense.startDate;
    if (expense.endDate) payload.endDate = expense.endDate;
  }

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create the expense");
  return res.json();
};

export const getExpenses = async (userId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/user/${userId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to load expenses");
  return res.json();
};

export const updateExpense = async (id, expense) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(expense),
  });
  if (!res.ok) throw new Error("Failed to update the expense");
  return res.json();
};

export const deleteExpense = async (id) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete");
  return res.json();
};

export const uploadReceipt = async (expenseId, file) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("receipt", file);

  const res = await fetch(`${API_URL}/${expenseId}/receipt`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to upload receipt");
  return res.json();
};
