import { useState } from "react";
import { signin, authenticate } from "../api/auth";
import { useNavigate } from "react-router-dom";
import Layout from './Layout';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    const data = await signin(user);

    if (data.error) {
      setError(data.error);
    } else {
      authenticate(data, () => navigate("/dashboard"));
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h2>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </Layout>
  );
}

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
  },
  error: {
    color: 'red',
    marginBottom: '10px'
  }
};
