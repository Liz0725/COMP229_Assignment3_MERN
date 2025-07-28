// File: ProjectList.jsx
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  getProjects,
  createProject,
  deleteProject,
} from "../api/projects"
import Layout from "./Layout"

export default function ProjectList() {
  const [projects, setProjects] = useState([])
  const [title, setTitle] = useState("")
  const [technologies, setTechnologies] = useState("")
  const navigate = useNavigate()

  const authData = localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt"))
    : null

  const token = authData?.token || ""
  const role = authData?.user?.role || ""

  useEffect(() => {
    if (role !== "admin") {
      alert("Access Denied: Admins only")
      navigate("/dashboard")
    } else {
      loadProjects()
    }
  }, [])

  const loadProjects = async () => {
    const data = await getProjects()
    if (data && !data.error) {
      setProjects(data)
    }
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!title.trim() || !technologies.trim()) {
      alert("Please fill in both fields.")
      return
    }

    const newProject = { title, technologies }
    const result = await createProject(newProject, token)
    if (result && !result.error) {
      setTitle("")
      setTechnologies("")
      loadProjects()
    } else {
      alert(result.error || "Error adding project.")
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Delete this project?")) {
      const result = await deleteProject(id, token)
      if (!result.error) {
        loadProjects()
      } else {
        alert(result.error || "Delete failed.")
      }
    }
  }

  return (
    <Layout>
      <div style={styles.container}>
        <h2 style={styles.heading}>Projects</h2>

        <form onSubmit={handleAdd} style={styles.form}>
          <div style={styles.row}>
            <input
              type="text"
              placeholder="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Technologies"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Add</button>
          </div>
        </form>

        <div style={styles.projectList}>
          {projects.map((project) => (
            <div key={project._id} style={styles.card}>
              <p><strong>Project Title:</strong> {project.title}</p>
              <p><strong>Technologies:</strong> {project.technologies}</p>
              <button
                onClick={() => handleDelete(project._id)}
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
