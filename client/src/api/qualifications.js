const API = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Helper to handle fetch errors
const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Something went wrong");
  }
  return data;
};

// Get all qualifications
export const getQualifications = async () => {
  const res = await fetch(`${API}/qualifications`);
  return handleResponse(res);
};

// Get one qualification by ID
export const getQualificationById = async (id) => {
  const res = await fetch(`${API}/qualifications/${id}`);
  return handleResponse(res);
};

export const createQualification = async (qualification, token) => {
  try {
    const response = await fetch(`${API}/qualifications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(qualification),
    });

    return await response.json();
  } catch (err) {
    return { error: err.message };
  }
};


// Update a qualification by ID
export const updateQualification = async (id, data, token) => {
  const res = await fetch(`${API}/qualifications/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

// Delete a qualification by ID
export const deleteQualification = async (id, token) => {
  const res = await fetch(`${API}/qualifications/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(res);
};
