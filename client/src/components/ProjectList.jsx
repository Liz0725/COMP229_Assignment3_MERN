import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  getProjects,
  createProject,
  deleteProject,
} from "../api/projects"

export default function ProjectList() {
  const [projects, setProjects] = useState([])
  const [title, setTitle] = useState("")
  const [technologies, setTechnologies] = useState("")
  const navigate = useNavigate()

  // ✅ Get token and role from localStorage
  const authData = localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt"))
    : null

  const token = authData?.token || ""
  const role = authData?.user?.role || ""

  // ✅ Block unauthorized users
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
    <div style={{ padding: "20px" }}>
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project._id} style={{ marginBottom: "10px" }}>
            <strong>{project.title || "(No title provided)"}</strong>
            <br />
            Technologies: {project.technologies || "(None)"}
            <br />
            {/* ✅ Admin-only Delete button */}
            {role === "admin" && (
              <button onClick={() => handleDelete(project._id)}>
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* ✅ Admin-only Add Form */}
      {role === "admin" && (
        <>
          <h3>Add New Project</h3>
          <form
            onSubmit={handleAdd}
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "10px",
            }}
          >
            <input
              type="text"
              placeholder="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ flex: "1 1 200px", padding: "8px" }}
            />
            <input
              type="text"
              placeholder="Technologies"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
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
