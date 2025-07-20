import { useEffect, useState } from "react"
import {
  getQualifications,
  createQualification,
  deleteQualification,
} from "../api/qualifications"
import { isAuthenticated } from "../api/auth"
import { useNavigate } from "react-router-dom"

export default function QualificationList() {
  const [qualifications, setQualifications] = useState([])
  const [title, setTitle] = useState("")
  const [institution, setInstitution] = useState("")
  const navigate = useNavigate()

  const { token, user } = isAuthenticated()

  const fetchQualifications = async () => {
    const data = await getQualifications()
    if (data && !data.error) {
      setQualifications(data)
    }
  }

  useEffect(() => {
    if (user.role !== "admin") {
      alert("Access Denied: Admins only")
      navigate("/dashboard")
    } else {
      fetchQualifications()
    }
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    const newQualification = { title, institution }
    const result = await createQualification(newQualification, token)
    if (!result.error) {
      setTitle("")
      setInstitution("")
      fetchQualifications()
    } else {
      alert(result.error || "Error adding qualification")
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Delete this qualification?")) {
      const result = await deleteQualification(id, token)
      if (!result.error) {
        fetchQualifications()
      } else {
        alert(result.error || "Delete failed.")
      }
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Qualifications</h2>
      <ul>
        {qualifications.map((q) => (
          <li key={q._id} style={{ marginBottom: "10px" }}>
            <strong>{q.title}</strong> — {q.institution}
            <br />
            {user.role === "admin" && (
              <button onClick={() => handleDelete(q._id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>

      {user.role === "admin" && (
        <>
          <h3>Add New Qualification</h3>
          <form onSubmit={handleAdd} style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "10px" }}>
            <input
              type="text"
              placeholder="Qualification Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ flex: "1 1 200px", padding: "8px" }}
            />
            <input
              type="text"
              placeholder="Institution"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
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
