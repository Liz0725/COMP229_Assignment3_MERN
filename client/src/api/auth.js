const API = import.meta.env.VITE_API || "http://localhost:3000/api";

export const signin = async (user) => {
  try {
    const res = await fetch(`${API}/auth/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    return await res.json()
  } catch (err) {
    console.error("Signin error", err)
  }
}

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data))
    next()
  }
}

export const isAuthenticated = () => {
  if (typeof window == "undefined") return false
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"))
  } else {
    return false
  }
}

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt")
    next()
  }
}
