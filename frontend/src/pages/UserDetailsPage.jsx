import { useMemo } from "react";

function UserIcon({ size = 18 }) {
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
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}

function BookmarkIcon({ size = 18 }) {
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
      <path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-3.6L6 21V4.5Z" />
    </svg>
  );
}

const informationItems = [
  ["Personal Details", "Complete"],
  ["Language Preference", "Hindi"],
  ["Voice Preference", "Male"],
  ["Offline Data", "2.4 GB Used"],
];

const activityItems = [
  ["Saved Schemes", "0"],
  ["Chat History", "0"],
  ["Downloads", "0"],
  ["Recently Viewed", "0"],
];

const moreItems = ["Help & Support", "About AI Bharat", "Privacy Policy", "Terms of Use"];

function UserDetailsPage({ user }) {
  const profileName = user?.username || "Guest";
  const initials = useMemo(
    () => profileName.split(" ").map((part) => part[0]).join("").slice(0, 2),
    [profileName]
  );

  return (
    <div className="profile-panel">
      <div className="profile-hero">
        <div className="profile-avatar">{initials}</div>
        <div>
          <h1>{profileName}</h1>
          <p>{user?.email || "Not logged in"}</p>
          <span>Verified User</span>
        </div>
      </div>

      <div className="profile-columns">
        <section>
          <h2>My Information</h2>
          <div className="profile-grid single">
            {informationItems.map(([label, value]) => (
              <button key={label}>
                <UserIcon />
                {label}
                <span>{value}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2>My Activity</h2>
          <div className="profile-grid single">
            {activityItems.map(([label, value]) => (
              <button key={label}>
                <BookmarkIcon />
                {label}
                <span>{value}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <section className="profile-more">
        <h2>More</h2>
        <div className="profile-grid single">
          {moreItems.map((label) => (
            <button key={label}>
              <UserIcon />
              {label}
              <span>{">"}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default UserDetailsPage;
