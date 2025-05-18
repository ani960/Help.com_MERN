export const loginAdmin = async (email, password) => {
    const response = await fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("adminToken", data.token);
      return true;
    }
    return false;
  };
  
  export const isAdminAuthenticated = () => {
    return !!localStorage.getItem("adminToken");
  };
  
  export const logoutAdmin = () => {
    localStorage.removeItem("adminToken");
  };
  