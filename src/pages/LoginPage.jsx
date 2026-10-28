import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate('/');
    } catch {
      setError('Login failed. Check your details or create an account.');
    }
  }

  return (
    <main className="form-page">
      <form className="account-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>Email<input type="email" required value={email} onChange={e => setEmail(e.target.value)} /></label>
        <label>Password<input type="password" required value={password} onChange={e => setPassword(e.target.value)} /></label>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
        <p>New here? <Link to="/signup">Create an account</Link></p>
      </form>
    </main>
  );
}