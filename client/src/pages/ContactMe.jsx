// File Name: Contact.jsx
// Student Name: Mihyun Kim
// Student ID: 301480772
// Date: May 27, 2025
// Description: Contact page that includes personal contact info and a functional form with state handling.

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout' // ✅ Add Layout import

function Contact() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(form)
    navigate('/')
  }

  return (
    <Layout> {/* ✅ Wrap entire content in Layout to include NavBar */}
      <h1>Contact Me</h1>

      <div style={styles.container}>
        {/* ------------------ Contact Info ------------------ */}
        <div style={styles.infoBox}>
          <p><strong>Email:</strong> ilovewjddntjd@gmail.com</p>
          <p><strong>Phone:</strong> +1-437-734-2508</p>
          <p><strong>Location:</strong> Toronto, Ontario, Canada</p>
        </div>

        {/* ------------------ Contact Form ------------------ */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input name="firstName" type="text" placeholder="First Name" value={form.firstName} onChange={handleChange} style={styles.input} />
          <input name="lastName" type="text" placeholder="Last Name" value={form.lastName} onChange={handleChange} style={styles.input} />
          <input name="phone" type="text" placeholder="Contact Number" value={form.phone} onChange={handleChange} style={styles.input} />
          <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} style={styles.input} />
          <textarea name="message" placeholder="Your Message..." value={form.message} onChange={handleChange} style={styles.textarea} />
          <button type="submit" style={styles.button}>Send</button>
        </form>
      </div>
    </Layout>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '40px',
    marginTop: '20px',
    flexWrap: 'nowrap'
  },
  infoBox: {
    width: '530px',
    backgroundColor: '#11111a',
    padding: '20px',
    borderRadius: '10px',
    lineHeight: '1.8'
  },
  form: {
    width: '100%',
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%'
  },
  textarea: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #aaa',
    height: '120px',
    resize: 'none',
    width: '100%'
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#a5d5ff',
    color: 'black',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    width: '105%'
  }
}

export default Contact
