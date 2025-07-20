import React, { useEffect, useState } from "react"
import { getContacts, createContact, deleteContact } from "../api/contacts"
import { isAuthenticated } from "../api/auth"
import { useNavigate } from "react-router-dom"

export default function ContactList() {
  const [contacts, setContacts] = useState([])
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const { token, user } = isAuthenticated()
  const navigate = useNavigate()

  const fetchContacts = async () => {
    const data = await getContacts()
    if (data && !data.error) setContacts(data)
  }

  useEffect(() => {
    if (user.role !== "admin") {
      alert("Access Denied: Admins only")
      navigate("/dashboard")
    } else {
      fetchContacts()
    }
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    const newContact = { firstname, lastname, email }
    const result = await createContact(newContact, token)
    if (!result.error) {
      setFirstname("")
      setLastname("")
      setEmail("")
      fetchContacts()
    } else {
      alert(result.error || "Error adding contact")
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Delete this contact?")) {
      const result = await deleteContact(id, token)
      if (!result.error) {
        fetchContacts()
      } else {
        alert(result.error || "Delete failed.")
      }
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Contact List</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id} style={{ marginBottom: "10px" }}>
            {contact.firstname} {contact.lastname} - {contact.email}
            {user.role === "admin" && (
              <button onClick={() => handleDelete(contact._id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>

      {user.role === "admin" && (
        <>
          <h3>Add New Contact</h3>
          <form
            onSubmit={handleAdd}
            style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "10px" }}
          >
            <input
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              style={{ flex: "1 1 150px", padding: "8px" }}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              style={{ flex: "1 1 150px", padding: "8px" }}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ flex: "1 1 200px", padding: "8px" }}
            />
            <button type="submit" style={{ padding: "8px 16px" }}>
              Add
            </button>
          </form>
        </>
      )}
    </div>
  )
}
