import React, { useEffect, useState } from "react"
import {
  getProjects,
  createProject,
  deleteProject
} from "../api/projects"

export default function ProjectList() {
  const [projects, setProjects] = useState([])
  const [title, setTitle] = useState("")
  const [technologies, setTechnologies] = useState("")
  const token = localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt")).token
    : ""

  const loadProjects = async () => {
    const data = await getProjects()
    if (data && !data.error) {
      setProjects(data)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    

    if (!title.trim() || !technologies.trim()) {
      alert("Please fill in both fields.")
      return
    }
    console.log("What I'm sending:", { title, technologies });
    

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
            <button onClick={() => handleDelete(project._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Add New Project</h3>
      <form onSubmit={handleAdd} style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "10px" }}>
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
        <button type="submit" style={{ padding: "8px 16px" }}>Add</button>
      </form>
    </div>
  )
}
