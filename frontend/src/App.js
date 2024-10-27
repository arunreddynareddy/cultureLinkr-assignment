import {useState} from "react";
import './App.css';

function App() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = e => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  const handleSubmit = e => {
    e.preventDefault();  // Prevent the form from refreshing the page
    setSuccessMessage('Thank you');
    setFormData({ name: '', email: '', message: '' }); // Reset form fields

  }


  return (
    <div className="container">
      <div className="card">
        <h1 className="main-heading">Simple Form</h1>
        <form className="form-container" onSubmit={handleSubmit}>
            <label htmlFor="name" className="form-label">Name</label>
            <input 
             type="text"
             name="name" 
             id="name" 
             value={formData.name} 
             onChange={handleChange} 
             placeholder="Enter your name" 
             className="form-input" 
             required
            />
            <label htmlFor="email" className="form-label">Email</label>
            <input 
             type="email" 
             name="email" 
             id="email" 
             value={formData.email} 
             onChange={handleChange} 
             placeholder="Enter your email" 
             className="form-input" 
             required
            />
            <label htmlFor="message" className="form-label">Message</label>
            <input
             type="text" 
             name="message" 
             id="message" 
             value={formData.message} 
             onChange={handleChange} 
             placeholder="Enter your message" 
             className="form-input" 
             required
            />
            <button type="submit" className="form-button">Submit</button>
        </form>
        {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
        )}
      </div>
    </div>
  )
}

export default App;
