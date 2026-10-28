import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (name.trim().split(/\s+/).length < 2) {
      setError('Enter your first and last name.');
      return;
    }
    if (password.length < 6) {
      setError('Use a password with at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
  setError('Passwords do not match.');
  return;
}

    try {
      const result = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(result.user, { displayName: name.trim() });
      await setDoc(doc(db, 'users', result.user.uid), {
        name: name.trim(),
        email: email.trim(),
      });
      await auth.signOut();
      navigate('/login');
    } catch {
      setError('Could not create the account. Check the email and try again.');
    }
  }

  return (
    <main className="form-page">
      <form className="account-form" onSubmit={handleSubmit}>
        <h1>Create a DEV@Deakin account</h1>
        <label>Full name<input required value={name} onChange={e => setName(e.target.value)} /></label>
        <label>Email<input type="email" required value={email} onChange={e => setEmail(e.target.value)} /></label>
        <label>Password<input type="password" required value={password} onChange={e => setPassword(e.target.value)} /></label>
        <label>
  Confirm password
  <input
    type="password"
    required
    value={confirmPassword}
    onChange={e => setConfirmPassword(e.target.value)}
  />
</label>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Sign up</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </main>
  );
}