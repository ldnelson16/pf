import React, { useState } from 'react';
import formstyles from '../styles/contactform.module.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Email sent successfully!');
        // Clear the form fields
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        console.error('Failed to send email.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form className={formstyles.form} onSubmit={handleSubmit}>
      <h1 className={formstyles.title}>Submit Feedback</h1>
      <label className={formstyles.label} htmlFor="name">
        <span className={formstyles.required}>*</span>Name:
      </label>
      <input
        className={formstyles.input}
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label className={formstyles.label} htmlFor="email">
        <span className={formstyles.required}>*</span>Email:
      </label>
      <input
        placeholder="leave blank for anonymous"
        className={formstyles.input}
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label className={formstyles.label} htmlFor="subject">
        <span className={formstyles.required}>*</span>Subject:
      </label>
      <input
        className={formstyles.input}
        type="text"
        id="subject"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        required
      />

      <label className={formstyles.label} htmlFor="message">
        <span className={formstyles.required}>*</span>Message:
      </label>
      <div className={formstyles.textarea}>
        <textarea
          placeholder="maximum of 999 characters"
          className={formstyles.textinput}
          id="message"
          name="message"
          rows="6"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button className={formstyles.button} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}