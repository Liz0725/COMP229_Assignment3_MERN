// QualificationList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getQualifications,
  createQualification,
  deleteQualification,
} from "../api/qualifications";
import Layout from "./Layout";

export default function QualificationList() {
  const [qualifications, setQualifications] = useState([]);
  const [title, setTitle] = useState("");
  const [institution, setInstitution] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const authData = localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt"))
    : null;

  const token = authData?.token || "";
  const role = authData?.user?.role || "";

  useEffect(() => {
    if (role !== "admin") {
      alert("Access Denied: Admins only");
      navigate("/dashboard");
    } else {
      loadQualifications();
    }
  }, []);

  const loadQualifications = async () => {
    try {
      const data = await getQualifications();
      console.log("🔍 Loaded qualifications (raw):", data);
      if (data && !data.error) {
        setQualifications(data.reverse()); // Show newest first
      }
    } catch (err) {
      console.error("Error loading qualifications:", err);
    }
  };

  const handleAdd = async (e) => {
  e.preventDefault();

  // 🔍 Log auth data and check admin info
  console.log("🔐 Auth Data from localStorage:", authData);
  console.log("🧑‍💼 User Role:", role);
  console.log("🔑 Token:", token);

  if (role !== "admin") {
    alert("Only admin can add qualifications.");
    return;
  }

  if (!title.trim() || !institution.trim()) {
    alert("Please fill in both fields.");
    return;
  }

  const newQualification = {
    title: title.trim(),
    institution: institution.trim(),
  };

  console.log("📤 Sending to server:", newQualification);

  const result = await createQualification(newQualification, token);

  if (!result.error) {
    setTitle("");
    setInstitution("");
    setSuccessMsg("✅ Qualification added!");
    loadQualifications();
    setTimeout(() => setSuccessMsg(""), 2000);
  } else {
    alert(result.error || "Error adding qualification.");
  }
};


  const handleDelete = async (id) => {
    if (window.confirm("Delete this qualification?")) {
      const result = await deleteQualification(id, token);
      if (!result.error) {
        loadQualifications();
      } else {
        alert(result.error || "Delete failed.");
      }
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h2 style={styles.heading}>Qualifications</h2>

        <form onSubmit={handleAdd} style={styles.form}>
          <div style={styles.row}>
            <input
              type="text"
              placeholder="Qualification Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
              required
            />
            <input
              type="text"
              placeholder="Institution"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              style={styles.input}
              required
            />
            <button type="submit" style={styles.button}>
              Add
            </button>
          </div>
        </form>

        {successMsg && (
          <p style={{ color: "lightgreen", marginBottom: "15px" }}>{successMsg}</p>
        )}

        <div style={styles.projectList}>
          {qualifications.length === 0 ? (
            <p style={{ textAlign: "center" }}>No qualifications added yet.</p>
          ) : (
            qualifications.map((q) => (
              <div key={q._id} style={styles.card}>
                <p>
                  <strong>Qualification Title:</strong> {q.title}
                </p>
                <p>
                  <strong>Institution:</strong>{" "}
                  {q.institution ? q.institution : <em style={{ color: "#aaa" }}>Not specified</em>}
                </p>
                <button
                  onClick={() => handleDelete(q._id)}
                  style={styles.deleteBtn}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
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
};
