import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ added
import Layout from './Layout';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate(); // ✅ added

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/signup', formData);
      alert('Signup successful!');
      console.log(res.data);
      navigate('/login'); // ✅ redirect to login page
    } catch (err) {
      alert('Signup failed.');
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h2>Signup</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Signup</button>
        </form>
      </div>
    </Layout>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    paddingTop: '50px',
    textAlign: 'center',
    color: '#fff'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '20px'
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #888',
    backgroundColor: '#1e1e1e',
    color: '#fff'
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};

export default Signup;
