import { useState } from 'react';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '', // changed from username to email
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData; // destructuring email and password from formData

    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: formData.email,
            password: formData.password,
        }),
      });

      const data = await response.json();

      if (data.jwtToken) {
        // TODO: Store the JWT token for future authenticated requests.
        alert('Login successful!');
      } else {
        alert('Login failed!');
      }
    } catch (error) {
      console.log("Error logging in:", error);
      alert("Login failed!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input className="mt-1 p-2 w-full border rounded-md" 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input className="mt-1 p-2 w-full border rounded-md" 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} required />
          </div>
          <div>
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
