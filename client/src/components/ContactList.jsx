import React, { useEffect, useState } from "react"
import { getContacts, createContact, deleteContact } from "../api/contacts"
import { isAuthenticated } from "../api/auth"

export default function ContactList() {
  const [contacts, setContacts] = useState([])
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const { token, user } = isAuthenticated()

  const fetchContacts = async () => {
    const data = await getContacts()
    if (data && !data.error) setContacts(data)
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    const newContact = { firstname, lastname, email }
    await createContact(newContact, token)
    setFirstname("")
    setLastname("")
    setEmail("")
    fetchContacts()
  }

  const handleDelete = async (id) => {
    await deleteContact(id, token)
    fetchContacts()
  }

  return (
    <div>
      <h2>Contact List</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id}>
            {contact.firstname} {contact.lastname} - {contact.email}
            {user.role === "admin" && (
              <button onClick={() => handleDelete(contact._id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>

      {user.role === "admin" && (
        <form onSubmit={handleAdd}>
          <h3>Add New Contact</h3>
          <input
            type="text"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Add</button>
        </form>
      )}
    </div>
  )
}
