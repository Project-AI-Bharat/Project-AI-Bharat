import { useContext, useState } from "react";
import heroImage from "./assets/hero.png";
import loginBg from "./assets/login_bg.png";
import { AuthContext } from "./contexts/authContextValue.js";
import ChatPage from "./pages/ChatPage.jsx";

const schemes = [
  {
    title: "Government Schemes",
    text: "Find central and state benefits with clear eligibility steps.",
    tone: "green",
    icon: "heart",
  },
  {
    title: "Healthcare Support",
    text: "Get guidance on Ayushman Bharat, NHA benefits, and care access.",
    tone: "purple",
    icon: "pulse",
  },
  {
    title: "Education & Scholarships",
    text: "Discover scholarships, documents, courses, and exam support.",
    tone: "amber",
    icon: "book",
  },
  {
    title: "Legal Awareness",
    text: "Know your rights and understand public services in simple language.",
    tone: "blue",
    icon: "scale",
  },
];

const featureCards = [
  ["wifiOff", "Offline First", "Designed for low-connectivity access."],
  ["mic", "Voice Enabled", "Ask naturally in your own language."],
  ["language", "Multilingual", "Built for Indian language support."],
  ["shield", "Secure & Private", "Auth-backed access keeps account data private."],
];

const steps = [
  ["mic", "Ask in Your Language", "Speak or type a question."],
  ["search", "AI Understands", "Relevant scheme knowledge is retrieved."],
  ["bookmark", "Get Simple Answers", "Receive direct, local-language guidance."],
  ["check", "Take Action", "Follow next steps with confidence."],
];

function Icon({ name, size = 22 }) {
  const paths = {
    leaf: (
      <>
        <path d="M12 21c4.5-2.5 7-6.4 7-11.5V4h-5.5C8.4 4 4.5 6.5 2 11c3.3.2 6.1 1.7 8 4.5" />
        <path d="M8 14c2.5-2.2 5.2-3.7 8-4.5" />
      </>
    ),
    heart: <path d="M20.8 8.6c0 5.1-8.8 10.4-8.8 10.4S3.2 13.7 3.2 8.6A4.6 4.6 0 0 1 12 6.7a4.6 4.6 0 0 1 8.8 1.9Z" />,
    pulse: (
      <>
        <path d="M20.8 8.6c0 5.1-8.8 10.4-8.8 10.4S3.2 13.7 3.2 8.6A4.6 4.6 0 0 1 12 6.7a4.6 4.6 0 0 1 8.8 1.9Z" />
        <path d="M7 12h3l1.2-2.2 2.1 4.5 1.2-2.3H17" />
      </>
    ),
    book: (
      <>
        <path d="M5 4.5h5.3A2.7 2.7 0 0 1 13 7.2V20a3.5 3.5 0 0 0-3-1.6H5V4.5Z" />
        <path d="M19 4.5h-5.3A2.7 2.7 0 0 0 11 7.2V20a3.5 3.5 0 0 1 3-1.6h5V4.5Z" />
      </>
    ),
    scale: (
      <>
        <path d="M12 4v16M5 20h14M7 7h10" />
        <path d="m7 7-4 7h8L7 7Zm10 0-4 7h8l-4-7Z" />
      </>
    ),
    wifiOff: (
      <>
        <path d="m3 3 18 18M8.5 16.5a5 5 0 0 1 7 0M5 12a10 10 0 0 1 5.2-2.8M13.8 9.2A10 10 0 0 1 19 12M2 8a15 15 0 0 1 4.2-2.5M10.7 4.2A15 15 0 0 1 22 8" />
        <path d="M12 20h.01" />
      </>
    ),
    mic: (
      <>
        <rect x="9" y="3" width="6" height="11" rx="3" />
        <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
      </>
    ),
    language: (
      <>
        <path d="M4 5h8M8 5v14M5 9c1.3 3.2 3.7 5.2 7 6" />
        <path d="M12 9c-.9 2.2-2.5 4-5 5.5M14 19l4-9 4 9M15.4 16h5.2" />
      </>
    ),
    shield: <path d="M12 21s7-3.4 7-9V5l-7-2-7 2v7c0 5.6 7 9 7 9Z" />,
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </>
    ),
    bookmark: <path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-3.6L6 21V4.5Z" />,
    check: <path d="m5 12 4.2 4.2L19 6.5" />,
    chat: (
      <>
        <path d="M21 12a8 8 0 0 1-8 8H6l-3 2 1.2-4A8 8 0 1 1 21 12Z" />
        <path d="M8 11h8M8 15h5" />
      </>
    ),
    grid: (
      <>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
      </>
    ),
    send: (
      <>
        <path d="M21 3 10 14" />
        <path d="m21 3-7 18-4-7-7-4 18-7Z" />
      </>
    ),
    logout: <path d="M10 17l5-5-5-5M15 12H3M21 5v14" />,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function Logo() {
  return (
    <div className="brand">
      <span className="brand-mark">
        <Icon name="leaf" size={23} />
      </span>
      <span>AI Bharat</span>
    </div>
  );
}

function AuthModal({ initialMode, onClose }) {
  const { login, verifyEmail } = useContext(AuthContext);
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState({ username: "", email: "", password: "", otp: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isSignup = mode === "Sign up";
  const isVerify = mode === "Verify";

  const update = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
  };

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (isVerify) {
        await verifyEmail({ email: form.email, otp: form.otp });
        setMessage("Email verified. You can log in now.");
        setMode("Login");
        return;
      }

      const payload = isSignup
        ? { username: form.username, email: form.email, password: form.password }
        : { email: form.email, password: form.password };
      const data = await login(mode, payload);

      if (isSignup) {
        setMessage(data.message || "Account created. Check your email for OTP.");
        setMode("Verify");
      } else {
        onClose();
      }
    } catch (submitError) {
      setError(submitError.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <form className="auth-panel" onSubmit={submit}>
        <button type="button" className="close-button" onClick={onClose} aria-label="Close">
          x
        </button>
        <Logo />
        <h2>{isVerify ? "Verify Email" : isSignup ? "Create Account" : "Welcome Back"}</h2>
        <p>
          {isVerify
            ? "Enter the OTP sent by the backend email service."
            : isSignup
              ? "Start using AI Bharat with secure access."
              : "Login to continue to your assistant."}
        </p>

        {isSignup ? (
          <label>
            Username
            <input value={form.username} onChange={update("username")} required placeholder="Your name" />
          </label>
        ) : null}

        <label>
          Email
          <input type="email" value={form.email} onChange={update("email")} required placeholder="you@example.com" />
        </label>

        {isVerify ? (
          <label>
            OTP
            <input value={form.otp} onChange={update("otp")} required placeholder="6 digit code" />
          </label>
        ) : (
          <label>
            Password
            <input type="password" value={form.password} onChange={update("password")} required placeholder="Password" />
          </label>
        )}

        {error ? <div className="form-error">{error}</div> : null}
        {message ? <div className="form-message">{message}</div> : null}

        <button className="primary-button full" disabled={loading}>
          {loading ? "Please wait..." : isVerify ? "Verify OTP" : isSignup ? "Sign Up" : "Login"}
        </button>

        {!isVerify ? (
          <button
            type="button"
            className="text-button"
            onClick={() => {
              setMode(isSignup ? "Login" : "Sign up");
              setError("");
              setMessage("");
            }}
          >
            {isSignup ? "Already have an account? Login" : "New here? Create an account"}
          </button>
        ) : (
          <button type="button" className="text-button" onClick={() => setMode("Login")}>
            Back to login
          </button>
        )}
      </form>
    </div>
  );
}

function LandingPage({ openAuth, enterDemo }) {
  return (
    <main className="landing">
      <nav className="topbar">
        <Logo />
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#how">How It Works</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="nav-actions">
          <button className="language-pill">Hindi</button>
          <button className="primary-button" onClick={() => openAuth("Login")}>Get Started</button>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-copy">
          <span className="eyebrow">AI for every citizen</span>
          <h1>Your AI Assistant for <strong>Schemes, Rights & Opportunities</strong></h1>
          <p>
            AI Bharat is your offline-ready, multilingual companion for government schemes,
            healthcare, education, and legal rights.
          </p>
          <div className="hero-actions">
            <button className="primary-button large" onClick={() => openAuth("Sign up")}>Start Exploring</button>
            <button className="ghost-button large" onClick={enterDemo}>See How It Works</button>
          </div>
        </div>
        <div className="hero-art" style={{ backgroundImage: `url(${loginBg})` }}>
          <img src={heroImage} alt="AI Bharat citizen assistant" />
          <span className="floating-badge top">Schemes in your language</span>
          <span className="floating-badge left"><Icon name="heart" size={22} /></span>
          <span className="floating-badge right"><Icon name="scale" size={22} /></span>
        </div>
      </section>

      <section className="trust-strip">
        {featureCards.map(([icon, title]) => (
          <span key={title}><Icon name={icon} size={17} /> {title}</span>
        ))}
      </section>

      <section className="section" id="features">
        <div className="section-heading">
          <h2>What We Help You With</h2>
          <span />
        </div>
        <div className="scheme-grid">
          {schemes.map((item) => (
            <article className="scheme-card" key={item.title}>
              <div className={`icon-bubble ${item.tone}`}><Icon name={item.icon} /></div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <button onClick={() => openAuth("Login")}>Explore</button>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="how">
        <div className="section-heading">
          <h2>How It Works</h2>
          <span />
        </div>
        <div className="steps">
          {steps.map(([icon, title, text], index) => (
            <article className="step" key={title}>
              <div className="step-icon"><Icon name={icon} /></div>
              <b>{index + 1}</b>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="impact-band">
        <div><strong>100+</strong><span>Schemes Covered</span></div>
        <div><strong>22+</strong><span>Indian Languages</span></div>
        <div><strong>100%</strong><span>Offline Support</span></div>
        <div><strong>10K+</strong><span>Citizens Empowered</span></div>
      </section>

      <section className="section choice" id="about">
        <div className="section-heading">
          <h2>Why Choose AI Bharat?</h2>
          <span />
        </div>
        <div className="feature-grid">
          {featureCards.map(([icon, title, text]) => (
            <article className="feature-card" key={title}>
              <div className="soft-icon"><Icon name={icon} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="india-band">
          <div>
            <h3>Made for India. Made for You.</h3>
            <p>Every answer is shaped to be simple, useful, and action-focused.</p>
          </div>
          <div className="india-mark">India</div>
        </div>
      </section>

      <footer className="footer" id="contact">
        <Logo />
        <span>Empowering every citizen with reliable information.</span>
        <button className="primary-button" onClick={() => openAuth("Login")}>Get Started</button>
      </footer>
    </main>
  );
}

function App() {
  const { isAuthenticated, isAuthReady } = useContext(AuthContext);
  const [authMode, setAuthMode] = useState(null);
  const [demo, setDemo] = useState(false);

  if (!isAuthReady) {
    return (
      <div className="loading-screen">
        <Logo />
      </div>
    );
  }

  return (
    <>
      {isAuthenticated || demo ? (
        <ChatPage demo={demo && !isAuthenticated} exitDemo={() => setDemo(false)} />
      ) : (
        <LandingPage openAuth={setAuthMode} enterDemo={() => setDemo(true)} />
      )}
      {authMode ? <AuthModal initialMode={authMode} onClose={() => setAuthMode(null)} /> : null}
    </>
  );
}

export default App;
