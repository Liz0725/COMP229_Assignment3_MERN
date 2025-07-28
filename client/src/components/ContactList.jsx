import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  getContacts,
  createContact,
  deleteContact,
} from "../api/contacts"
import Layout from "./Layout"

export default function ContactList() {
  const [contacts, setContacts] = useState([])
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const authData = localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt"))
    : null

  const token = authData?.token || ""
  const role = authData?.user?.role || ""

  useEffect(() => {
  const checkAccessAndLoad = async () => {
    if (!authData || role !== "admin") {
      alert("Access Denied: Admins only")
      navigate("/dashboard")
    } else {
      await loadContacts()
    }
  }

  checkAccessAndLoad()
}, [])


  const loadContacts = async () => {
    const data = await getContacts()
    if (data && !data.error) {
      setContacts(data)
    }
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      alert("Please fill in all fields.")
      return
    }

    const newContact = { firstName, lastName, email }
    const result = await createContact(newContact, token)
    if (result && !result.error) {
      setFirstName("")
      setLastName("")
      setEmail("")
      loadContacts()
    } else {
      alert(result.error || "Error adding contact.")
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Delete this contact?")) {
      const result = await deleteContact(id, token)
      if (!result.error) {
        loadContacts()
      } else {
        alert(result.error || "Delete failed.")
      }
    }
  }

  return (
    <Layout>
      <div style={styles.container}>
        <h2 style={styles.heading}>Contacts</h2>

        <form onSubmit={handleAdd} style={styles.form}>
          <div style={styles.row}>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Add</button>
          </div>
        </form>

        <div style={styles.projectList}>
          {contacts.map((contact) => (
            <div key={contact._id} style={styles.card}>
              <h3>{contact.firstName} {contact.lastName}</h3>
              <p><strong>Email:</strong> {contact.email}</p>
              <button
                onClick={() => handleDelete(contact._id)}
                style={styles.deleteBtn}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "60px auto",
    color: "#fff",
    padding: "0 20px",
  },
  heading: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "30px",
  },
  form: {
    marginBottom: "30px",
  },
  row: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
    minWidth: "200px",
  },
  button: {
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  projectList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  card: {
    backgroundColor: "#1e1f26",
    padding: "15px 20px",
    borderRadius: "6px",
    lineHeight: "1.6",
  },
  deleteBtn: {
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  },
}
