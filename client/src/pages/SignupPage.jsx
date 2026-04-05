import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/signup", { email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/tasks");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-ink/10 bg-white/90 p-8 shadow-xl backdrop-blur">
        <h1 className="font-heading text-3xl font-bold text-ink">Create Account</h1>
        <p className="mt-2 text-sm text-ink/70">Start tracking tasks in minutes.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-medium text-ink" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-ink/20 px-4 py-2.5 outline-none transition focus:border-ink"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-ink" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-ink/20 px-4 py-2.5 outline-none transition focus:border-ink"
              required
            />
          </div>

          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-ink px-4 py-2.5 font-medium text-white transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-sm text-ink/70">
          Already have an account? <Link className="font-semibold text-ink underline" to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
