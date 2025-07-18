import { useEffect, useState } from "react"
import {
  getQualifications,
  createQualification,
  deleteQualification,
} from "../api/qualifications"
import { isAuthenticated } from "../api/auth"

export default function QualificationList() {
  const [qualifications, setQualifications] = useState([])
  const [title, setTitle] = useState("")
  const [institution, setInstitution] = useState("")

  const { token, user } = isAuthenticated()

  const fetchQualifications = async () => {
    const data = await getQualifications()
    if (data && !data.error) {
      setQualifications(data)
    }
  }

  useEffect(() => {
    fetchQualifications()
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    const newQualification = { title, institution }
    await createQualification(newQualification, token)
    setTitle("")
    setInstitution("")
    fetchQualifications()
  }

  const handleDelete = async (id) => {
    await deleteQualification(id, token)
    fetchQualifications()
  }

  return (
    <div>
      <h2>Qualifications</h2>

      <ul>
        {qualifications.map((q) => (
          <li key={q._id}>
            <strong>{q.title}</strong> — {q.institution}
            {user.role === "admin" && (
              <button onClick={() => handleDelete(q._id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>

      {user.role === "admin" && (
        <>
          <h3>Add New Qualification</h3>
          <form onSubmit={handleAdd}>
            <input
              type="text"
              placeholder="Qualification Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Institution"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              required
            />
            <button type="submit">Add</button>
          </form>
        </>
      )}
    </div>
  )
}
