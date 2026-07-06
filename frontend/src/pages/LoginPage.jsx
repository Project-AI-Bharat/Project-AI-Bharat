import { useContext, useState } from "react";
import loginBg from "../assets/login_bg.png";
import { AuthContext } from "../contexts/authContextValue.js";

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-5 w-5 text-slate-500"
    >
      <path
        d="M4 6.75A2.75 2.75 0 0 1 6.75 4h10.5A2.75 2.75 0 0 1 20 6.75v10.5A2.75 2.75 0 0 1 17.25 20H6.75A2.75 2.75 0 0 1 4 17.25V6.75Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="m6.5 7.5 5.02 4.13c.27.22.66.22.93 0L17.5 7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-5 w-5 text-slate-500"
    >
      <path
        d="M17 10V8a5 5 0 0 0-10 0v2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M6.75 10h10.5A2.75 2.75 0 0 1 20 12.75v4.5A2.75 2.75 0 0 1 17.25 20H6.75A2.75 2.75 0 0 1 4 17.25v-4.5A2.75 2.75 0 0 1 6.75 10Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function EyeIcon({ open }) {
  if (open) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="h-5 w-5 text-slate-500"
      >
        <path
          d="M2.5 12s3.25-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.25 6.5-9.5 6.5S2.5 12 2.5 12Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-5 w-5 text-slate-500"
    >
      <path
        d="M3 3l18 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M10.58 10.58A3 3 0 0 0 12 16.5a3 3 0 0 0 2.12-.88"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M6.64 6.64C4.03 8.32 2.5 12 2.5 12s3.25 6.5 9.5 6.5c1.04 0 1.99-.12 2.87-.35"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M17.36 17.36C19.97 15.68 21.5 12 21.5 12s-3.25-6.5-9.5-6.5c-.87 0-1.69.09-2.44.25"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M21.8 10.4h-9.3v3.9h5.3c-.4 2-2.1 3.8-5.3 3.8-3.2 0-5.8-2.7-5.8-6.1s2.6-6.1 5.8-6.1c1.8 0 3.1.7 4 1.5l2.8-2.7C17.7 3.1 15.4 2 12.5 2 7.2 2 3 6.2 3 12s4.2 10 9.5 10c5.6 0 9.3-3.9 9.3-9.5 0-.6-.1-1.1-.2-2.1Z"
        fill="#fff"
      />
      <path
        d="M21.8 10.4h-9.3v3.9h5.3c-.4 2-2.1 3.8-5.3 3.8-3.2 0-5.8-2.7-5.8-6.1s2.6-6.1 5.8-6.1c1.8 0 3.1.7 4 1.5l2.8-2.7C17.7 3.1 15.4 2 12.5 2 7.2 2 3 6.2 3 12s4.2 10 9.5 10c5.6 0 9.3-3.9 9.3-9.5 0-.6-.1-1.1-.2-2.1Z"
        fill="#EA4335"
        opacity="0.22"
      />
      <path
        d="M5.4 8.2 8.7 10.7c.9-2.3 3-3.9 5.6-3.9 1.8 0 3.1.7 4 1.5l2.8-2.7C17.7 3.1 15.4 2 12.5 2 8.9 2 5.8 4 4 7l1.4 1.2Z"
        fill="#34A853"
        opacity="0.25"
      />
      <path
        d="M3.8 15.4A10 10 0 0 0 12.5 22c2.8 0 5.2-.9 7-2.4l-3-2.4c-1 .7-2.1 1-4 1-3 0-5.5-2-6.4-4.8l-2.3 2Z"
        fill="#FBBC05"
        opacity="0.22"
      />
      <path
        d="M6.1 9.3 4 7c-1 1.6-1.5 3.3-1.5 5s.4 3.1 1.2 4.4l2.4-2c-.2-.7-.4-1.5-.4-2.4 0-.9.2-1.9.4-2.7Z"
        fill="#4285F4"
        opacity="0.22"
      />
    </svg>
  );
}

const featureCards = [
  {
    icon: "↯",
    title: "Works Offline",
    description: "Access information even without internet.",
  },
  {
    icon: "◉",
    title: "Voice Enabled",
    description: "Speak naturally in your language.",
  },
  {
    icon: "🌐",
    title: "Multilingual",
    description: "Supporting 22+ Indian languages.",
  },
  {
    icon: "🛡",
    title: "Secure & Private",
    description: "Your data is safe and stays private.",
  },
];

const stats = [
  { value: "100+", label: "Schemes Covered" },
  { value: "22+", label: "Indian Languages" },
  { value: "24/7", label: "Always Here to Help" },
  { value: "100%", label: "Secure & Private" },
];

const LoginPage = () => {
  const authContext = useContext(AuthContext);
  const login = authContext?.login;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (!login) {
        throw new Error("Login service is not available.");
      }

      await login("Login", { email, password });
    } catch (submitError) {
      setError(submitError.message || "Unable to log in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      className="relative h-screen overflow-hidden bg-[#f4f1e8] text-slate-900"
      style={{
        backgroundImage: `backdrop-blur-xl url(${loginBg})`,
        backgroundSize: "",
        backgroundPosition: "",
      }}
    >
      <div className="absolute inset-0 bg-radial-[at_0%_0%] from-white/65 to-transparent" />
      <div className="absolute inset-0 bg-radial-[at_100%_100%] from-amber-200/10 to-transparent" />
      <div className="absolute -left-32 top-24 h-64 w-64 rounded-full bg-emerald-200/20 blur-3xl" />
      <div className="absolute bottom-10 -right-24 h-72 w-72 rounded-full bg-amber-200/20 blur-3xl" />

      <div className="relative mx-auto flex h-full max-w-[1600px] flex-col px-4 py-4 sm:px-6 lg:px-10">
        <section className="grid flex-1 items-center gap-8 md:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1.05fr)_410px]">
          <div className="max-w-xl pb-2 md:pb-0">
            <header className="flex items-center  gap-3 py-4 sm:py-6">
              <img
                src="/logo.png"
                alt="AI BHARAT"
                className="h-12 w-auto drop-shadow-sm sm:h-14"
              />
              <h1 className="text-7xl font-bold text-blue-950 ">AI</h1>
              <h1 className="text-7xl font-bold text-orange-500 ">BHARAT</h1>
            </header>

            <h1 className="max-w-xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl xl:text-[3.85rem] xl:leading-[1.02]">
              <span className="block">Your AI Assistant for</span>
              <span className="block text-emerald-800">Schemes, Rights &</span>
              <span className="block text-emerald-800">Opportunities</span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-8 text-slate-700 sm:text-lg">
              Empowering every citizen with information in their language,
              anytime, anywhere.
            </p>

            <div className="mt-8 flex max-w-xl flex-col gap-5">
              {featureCards.map((card) => (
                <div key={card.title} className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-white/75 shadow-sm">
                    <span className="text-lg text-emerald-700">
                      {card.icon}
                    </span>
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold text-slate-900">
                      {card.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="">
            <div className="w-full max-w-90 rounded-[30px] border border-white/80 bg-white/88 p-7 shadow-[0_28px_90px_rgba(12,38,20,0.18)] ring-1 ring-white/60 backdrop-blur-2xl sm:p-8">
              <div className="flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-emerald-100 bg-white shadow-[0_12px_30px_rgba(16,89,43,0.08)]">
                  <img
                    src="/logo.png"
                    alt="AI Bharat"
                    className="h-14 w-14 object-contain"
                  />
                </div>
              </div>

              <div className="mt-6 text-center">
                <h2 className="text-[1.65rem] font-bold tracking-tight text-slate-900">
                  Welcome Back!
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Login to continue to AI Bharat
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <label className="block">
                  <span className="sr-only">Email or Mobile Number</span>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition duration-200 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100 hover:-translate-y-0.5 hover:shadow-md">
                    <EmailIcon />
                    <input
                      type="text"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="Email or Mobile Number"
                      className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                      autoComplete="username"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="sr-only">Password</span>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition duration-200 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100 hover:-translate-y-0.5 hover:shadow-md">
                    <LockIcon />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Password"
                      className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      className="text-slate-500 transition hover:text-slate-700"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      <EyeIcon open={showPassword} />
                    </button>
                  </div>
                </label>

                <div className="flex justify-end pt-0.5">
                  <button
                    type="button"
                    className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
                  >
                    Forgot Password?
                  </button>
                </div>

                {error ? (
                  <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {error}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-linear-to-r from-[#1f7b39] to-[#145f2d] px-4 py-3.5 text-base font-semibold text-white shadow-[0_12px_30px_rgba(20,95,45,0.28)] transition duration-200 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span>{isSubmitting ? "Logging in..." : "Login"}</span>
                  <span aria-hidden="true">→</span>
                </button>

                <div className="flex items-center gap-4 py-1 text-sm text-slate-400">
                  <span className="h-px flex-1 bg-slate-200" />
                  <span>or</span>
                  <span className="h-px flex-1 bg-slate-200" />
                </div>

                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-700 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
                >
                  <GoogleIcon />
                  <span>Continue with Google</span>
                </button>

                <p className="pt-1 text-center text-sm text-slate-500">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    className="font-semibold text-emerald-700 transition hover:text-emerald-800"
                  >
                    Sign up
                  </button>
                </p>
              </form>
            </div>
          </div>
        </section>

        <footer className="hidden justify-center gap-4 pb-4 pt-6 lg:absolute lg:bottom-4 lg:left-1/2 lg:flex lg:-translate-x-1/2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 rounded-2xl px-4 py-2 text-center sm:flex-row sm:gap-2 sm:text-left"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-200 bg-white/80 text-emerald-700 shadow-sm">
                <span className="text-sm">◌</span>
              </div>
              <div>
                <p className="text-[15px] font-semibold text-emerald-700">
                  {stat.value}
                </p>
                <p className="text-[11px] text-slate-600">{stat.label}</p>
              </div>
            </div>
          ))}
        </footer>
      </div>
    </main>
  );
};

export default LoginPage;
