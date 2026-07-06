import { useContext, useMemo, useState } from "react";
import { AuthContext } from "../contexts/authContextValue.js";
import UserDetailsPage from "./UserDetailsPage.jsx";

const quickPrompts = [
  "Tell me about PM Kisan eligibility",
  "How can I apply for Ayushman Bharat?",
  "Scholarships for rural students",
  "What documents are needed for PMAY-G?",
];

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
    bookmark: <path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-3.6L6 21V4.5Z" />,
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

function ChatPage({ demo = false, exitDemo }) {
  const { user, sendMessage, logout, isAuthenticated } = useContext(AuthContext);
  const [active, setActive] = useState("Chat");
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Namaste. Ask me about schemes, healthcare, scholarships, documents, or citizen rights.",
      sources: [],
    },
  ]);

  const profileName = user?.username || "Shivam Yadav";
  const initials = useMemo(
    () => profileName.split(" ").map((part) => part[0]).join("").slice(0, 2),
    [profileName]
  );

  async function submitMessage(event, prompt) {
    event?.preventDefault();
    const text = (prompt || input).trim();
    if (!text || isSending) return;

    setInput("");
    setMessages((current) => [...current, { role: "user", text }]);

    if (!isAuthenticated) {
      setMessages((current) => [
        ...current,
        { role: "assistant", text: "Login to connect this question with the backend RAG assistant.", sources: [] },
      ]);
      return;
    }

    setIsSending(true);
    try {
      const response = await sendMessage(text);
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: response.answer || "I could not find a confident answer.",
          sources: response.sources || [],
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        { role: "assistant", text: error.message || "Backend request failed.", sources: [] },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  const navItems = [
    ["Chat", "chat"],
    ["Schemes", "grid"],
    ["Saved", "bookmark"],
    ["Profile", "user"],
  ];

  return (
    <main className="workspace">
      <aside className="sidebar">
        <Logo />
        <nav>
          {navItems.map(([label, icon]) => (
            <button key={label} className={active === label ? "active" : ""} onClick={() => setActive(label)}>
              <Icon name={icon} size={19} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        {demo ? (
          <button className="sidebar-action" onClick={exitDemo}>Back Home</button>
        ) : (
          <button className="sidebar-action" onClick={logout}>
            <Icon name="logout" size={17} /> Logout
          </button>
        )}
      </aside>

      <section className="workspace-main">
        <header className="workspace-header">
          <Logo />
          <span className="offline-pill"><Icon name="wifiOff" size={15} /> Offline Mode</span>
          <div className="avatar">{initials}</div>
        </header>

        {active === "Chat" ? (
          <div className="chat-panel">
            <div className="chat-title">
              <span className="brand-mark large-mark"><Icon name="leaf" size={34} /></span>
              <h1>How can I help you today?</h1>
              <p>Ask anything about schemes, rights, healthcare, education, and more.</p>
            </div>

            <div className="messages">
              {messages.map((message, index) => (
                <article className={`message ${message.role}`} key={`${message.role}-${index}`}>
                  <p>{message.text}</p>
                  {message.sources?.length ? (
                    <div className="sources">
                      {message.sources.slice(0, 3).map((source, sourceIndex) => (
                        <span key={sourceIndex}>{source.title || source.source || `Source ${sourceIndex + 1}`}</span>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}
              {isSending ? <article className="message assistant"><p>Thinking with the backend knowledge base...</p></article> : null}
            </div>

            <div className="prompt-row">
              {quickPrompts.slice(0, 3).map((prompt) => (
                <button key={prompt} onClick={(event) => submitMessage(event, prompt)}>{prompt}</button>
              ))}
            </div>

            <form className="composer" onSubmit={submitMessage}>
              <button type="button" aria-label="Voice input"><Icon name="mic" /></button>
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Type or speak your question..."
              />
              <button type="submit" aria-label="Send message"><Icon name="send" /></button>
            </form>
          </div>
        ) : active === "Schemes" ? (
          <div className="content-panel">
            <h1>Explore Schemes</h1>
            <div className="scheme-grid compact">
              {schemes.map((item) => (
                <article className="scheme-card" key={item.title}>
                  <div className={`icon-bubble ${item.tone}`}><Icon name={item.icon} /></div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        ) : active === "Saved" ? (
          <div className="content-panel">
            <h1>Saved Guidance</h1>
            <div className="saved-list">
              {quickPrompts.map((prompt, index) => (
                <button key={prompt} onClick={(event) => submitMessage(event, prompt)}>
                  <Icon name="bookmark" size={18} />
                  <span>{prompt}</span>
                  <b>{index + 1}</b>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <UserDetailsPage user={user} />
        )}
      </section>
    </main>
  );
}

export default ChatPage;
