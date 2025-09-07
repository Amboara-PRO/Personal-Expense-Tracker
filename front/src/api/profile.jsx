const API_URL_PROFILE= import.meta.env.VITE_API_URL_PROFILE;

export const getProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const res = await fetch(`${API_URL_PROFILE}/`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const updateProfile = async (password, name) => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const res = await fetch(`${API_URL_PROFILE}/`, {
      method: "PUT",
      headers: {    "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({password, name }),
    });
    return res.json();
  };

export const deleteProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const res = await fetch(`${API_URL_PROFILE}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  };