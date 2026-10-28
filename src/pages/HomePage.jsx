export default function HomePage({ user }) {
  return (
    <main className="page">
      <section className="hero">
        <h1>Welcome to DEV@Deakin</h1>
        <p>Discover articles, tutorials, and projects from the community.</p>
        {user && <p>Signed in as {user.displayName || user.email}</p>}
      </section>
      <section className="content-card">
        <h2>Explore and share</h2>
        <p>Use the navigation above to sign in or create an account.</p>
      </section>
    </main>
  );
}