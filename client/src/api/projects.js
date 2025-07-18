const API = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const getProjects = async () => {
  const res = await fetch(`${API}/projects`)
  return await res.json()
}

export const getProjectById = async (id) => {
  const res = await fetch(`${API}/projects/${id}`)
  return await res.json()
}

export const createProject = async (projectData, token) => {
  const res = await fetch(`${API}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(projectData)
  })
  return await res.json()
}

export const updateProject = async (id, projectData, token) => {
  const res = await fetch(`${API}/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(projectData)
  })
  return await res.json()
}

export const deleteProject = async (id, token) => {
  const res = await fetch(`${API}/projects/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return await res.json()
}
