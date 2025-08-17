export async function loginUser({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const formData = new URLSearchParams()
  formData.append('username', email)
  formData.append('password', password)

  const res = await fetch('http://localhost:1124/token/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData.toString(),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.detail || 'Login failed')
  }

  return data
}
