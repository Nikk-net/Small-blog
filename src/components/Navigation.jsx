import { Link } from "react-router-dom";
import { getSessionUser } from "../lib/auth";
import { useAuth } from "./AuthProvider";
import { useEffect, useState } from "react";

export default function Navigation() {
  const [user, setUser] = useState(null);
  const { logoutUser } = useAuth();

  useEffect(() => {
    const session = getSessionUser();

    setUser(session);
  }, []);

  return (
    <>
      <style>{`
        .nav {
          position: sticky;
          top: 0;
          justify-content: space-between;
          padding-left: 12px;
          padding-right: 12px;
          z-index: 50;
          backdrop-filter: blur(14px);
          background: rgba(5,7,12,1);
          border-bottom: 1px solid var(--border);
        }

        .nav-inner {
          min-width:100%;
          display: flex;
          height: 60px;
          justify-content: space-between;
          align-items: center;
          padding: 14px 0;
        }

        .logo {
          font-weight: 600;
          color: var(--accent);
          letter-spacing: 0.5px;
        }

        .nav a {
          color: var(--muted);
          margin-left: 16px;
          text-decoration: none;
          font-size: 16px;
        }

        .nav a:hover {
          color: var(--accent);
        }

        .logo a {
          color: var(--accent);
        }

        
        @media (max-width: 640px) {
          .nav a {
            font-size: 14px;
          }
        }
 
      `}</style>
      <div className="nav">
        <div className="container nav-inner">
          <div className="logo">
            <a href="/" className="logoText">
              root@security
            </a>
          </div>
          <div>
            <Link to="/">Home</Link>
            <Link to="/blog">Blog</Link>
            {user && <Link to="/dashboard">Dashboard</Link>}
            {user && (
              <Link
                to="/login"
                onClick={() => {
                  (logoutUser(), setUser(null));
                }}
              >
                Log out
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
