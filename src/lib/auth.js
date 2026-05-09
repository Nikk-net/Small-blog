export async function login(email, password) {
  const res = await fetch("http://localhost:3001/users", { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const data = await res.json();

  const foundUser = data.find(
    (user) => user.email === email && user.password === password,
  );

  return foundUser;
}

export function getSessionUser() {
  return JSON.parse(localStorage.getItem("user"));
}

export function logout() {
  localStorage.removeItem("user");
}
