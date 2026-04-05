import { Link } from "react-router-dom";

const LandingPage = () => {
  const token = localStorage.getItem("token");

  return (
    <div
      className="relative mx-auto min-h-screen w-full overflow-hidden px-4 py-10 sm:px-6 sm:py-14"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.84), rgba(255,255,255,0.84)), url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-mint/10"
      />
      <div className="pointer-events-none absolute -left-12 top-12 h-36 w-36 rounded-full bg-peach/60 blur-2xl" />
      <div className="pointer-events-none absolute -right-12 bottom-16 h-44 w-44 rounded-full bg-mint/60 blur-2xl" />

      <section className="relative grid gap-10 md:grid-cols-2 md:items-stretch">
        <div className="flex min-h-[32rem] flex-col justify-center py-2 md:min-h-[36rem] md:py-4">
          <div className="flex flex-col gap-6">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ink/80 sm:text-base">
              Task Tracker
            </p>
            <h1 className="font-heading text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Plan smart.
              <br />
              Finish faster.
            </h1>
            <p className="max-w-xl text-base leading-7 text-ink/80 sm:text-lg">
              A clean place to add daily tasks, mark progress, and stay focused. Sign up or log in to manage your personal task board.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/signup"
                className="rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-ink/90"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="rounded-xl border border-ink px-5 py-2.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-ink hover:text-white"
              >
                Log In
              </Link>
              {token ? (
                <Link
                  to="/tasks"
                  className="rounded-xl border border-mint bg-mint/50 px-5 py-2.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-mint/70"
                >
                  Open My Tasks
                </Link>
              ) : null}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <article className="rounded-2xl border border-ink/10 bg-white/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/60">Quick Add</p>
                <p className="mt-1 text-sm text-ink/80">Create tasks in seconds.</p>
              </article>
              <article className="rounded-2xl border border-ink/10 bg-white/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/60">Private</p>
                <p className="mt-1 text-sm text-ink/80">Only your account sees tasks.</p>
              </article>
              <article className="rounded-2xl border border-ink/10 bg-white/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/60">Focused</p>
                <p className="mt-1 text-sm text-ink/80">Mark done and move ahead.</p>
              </article>
            </div>
          </div>
        </div>

        <div className="flex items-center md:justify-end">
          <div className="flex min-h-[28rem] w-full flex-col justify-between rounded-3xl border border-ink/10 bg-white/55 p-5 shadow-lg backdrop-blur-sm sm:min-h-[32rem] sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-ink/80">Today</p>
              <span className="rounded-lg border border-ink/10 bg-white px-2.5 py-1 text-xs font-medium text-ink/70">3 tasks</span>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl border border-ink/10 bg-white p-3">
                <p className="text-sm font-medium text-ink">Finish assignment README</p>
                <p className="mt-1 text-xs text-ink/60">In progress</p>
              </div>
              <div className="rounded-xl border border-mint/70 bg-mint/40 p-3">
                <p className="text-sm font-medium text-ink line-through opacity-80">Create login flow</p>
                <p className="mt-1 text-xs text-ink/60">Completed</p>
              </div>
              <div className="rounded-xl border border-ink/10 bg-white p-3">
                <p className="text-sm font-medium text-ink">Add tomorrow priorities</p>
                <p className="mt-1 text-xs text-ink/60">Pending</p>
              </div>
            </div>

            <p className="mt-5 text-xs text-ink/60">Log in to start organizing your own tasks.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;