import { Link, Route, Routes } from "react-router-dom";

function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Todomoro</h1>
      <p className="mt-3 text-slate-600">A little progress every day.</p>

      <nav className="mt-8 flex gap-4">
        <Link className="text-blue-600 underline" to="/login">
          Login
        </Link>
        <Link className="text-blue-600 underline" to="/register">
          Register
        </Link>
        <Link className="text-blue-600 underline" to="/dashboard">
          Dashboard
        </Link>
      </nav>
    </main>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link to="/" className="text-blue-600 underline">
        Back home
      </Link>
      <h1 className="mt-6 text-3xl font-bold">{title}</h1>
      <p className="mt-3 text-slate-600">
        We'll build this page in a later step.
      </p>
    </main>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<PlaceholderPage title="Login" />} />
      <Route path="/register" element={<PlaceholderPage title="Register" />} />
      <Route
        path="/dashboard"
        element={<PlaceholderPage title="Dashboard" />}
      />

      <Route path="*" element={<PlaceholderPage title="Page not found" />} />
    </Routes>
  );
}

export default App;
