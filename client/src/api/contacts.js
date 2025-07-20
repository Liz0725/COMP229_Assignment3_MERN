// api/contacts.js
import axios from "axios"
const API = "https://comp229-assignment3-mern.onrender.com/api/projects"

export const getContacts = async () => {
  try {
    const res = await axios.get(API)
    return res.data
  } catch (err) {
    return { error: err.response?.data?.error }
  }
}

export const createContact = async (contact, token) => {
  try {
    const res = await axios.post(API, contact, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  } catch (err) {
    return { error: err.response?.data?.error }
  }
}

export const deleteContact = async (id, token) => {
  try {
    const res = await axios.delete(`${API}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  } catch (err) {
    return { error: err.response?.data?.error }
  }
}
