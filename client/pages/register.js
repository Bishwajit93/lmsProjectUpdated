import { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    institution: '',
    email: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send formData to the backend
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">First Name</label>
            <input className="mt-1 p-2 w-full border rounded-md" 
                    type="text" name="firstName" 
                    value={formData.firstName} 
                    onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Last Name</label>
            <input className="mt-1 p-2 w-full border rounded-md" 
                    type="text" 
                    name="lastName" 
                    value={formData.lastName} 
                    onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Institution</label>
            <input className="mt-1 p-2 w-full border rounded-md" 
                    type="text" 
                    name="institution" 
                    value={formData.institution} 
                    onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input className="mt-1 p-2 w-full border rounded-md" 
                    type="email"
                     name="email" 
                     value={formData.email} 
                     onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Username</label>
            <input className="mt-1 p-2 w-full border rounded-md" 
                    type="text" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input className="mt-1 p-2 w-full border rounded-md" 
                    type="passwo
                    rd" name="password" 
                    value={formData.password} 
                    onChange={handleChange} required />
          </div>
          <div>
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
