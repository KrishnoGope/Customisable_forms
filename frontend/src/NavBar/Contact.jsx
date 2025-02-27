import { useState } from 'react';
import axios from 'axios';
import FooterArea from '../FooterArea';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/contact', formData);
            alert(response.data.message);
            setFormData({ name: '', email: '', message: '' }); // Reset form
        } catch (error) {
            console.error(error);
            alert('Error sending message. Please try again later.');
        }
    };

    return (
        <>
            <div className="container mt-5 mb-5 ">
                <h2 className="text-center mb-4">Contact Us</h2>
                <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow border border-primary  border-2">
                    <div className="mb-3">
                        <label className="form-label">Full Name:</label>
                        <input 
                            type="text" 
                            name="name"
                            className="form-control"
                            placeholder='Enter your name'
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input
                            type="email"
                            name="email"
                            placeholder='Enter your email'
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Message:</label>
                        <textarea
                            name="message"
                            className="form-control"
                            placeholder='Write your message'
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={3}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Send</button>
                </form>
            </div>
            <FooterArea />
        </>
    );
};

export default Contact;