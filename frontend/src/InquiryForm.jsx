import React, { useState } from 'react';

const InquiryForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch('http://localhost:5000/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('Inquiry sent!');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send inquiry.');
      }
    } catch {
      setStatus('Failed to send inquiry.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required />
      <button type="submit">Send Inquiry</button>
      <div>{status}</div>
    </form>
  );
};

export default InquiryForm;
