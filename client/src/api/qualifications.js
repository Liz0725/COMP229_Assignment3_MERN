const API = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const getQualifications = async () => {
  const res = await fetch(`${API}/qualifications`)
  return await res.json()
}

export const getQualificationById = async (id) => {
  const res = await fetch(`${API}/qualifications/${id}`)
  return await res.json()
}

export const createQualification = async (data, token) => {
  const res = await fetch(`${API}/qualifications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  return await res.json()
}

export const updateQualification = async (id, data, token) => {
  const res = await fetch(`${API}/qualifications/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  return await res.json()
}

export const deleteQualification = async (id, token) => {
  const res = await fetch(`${API}/qualifications/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return await res.json()
}
