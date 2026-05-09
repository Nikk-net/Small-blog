import { useState } from "react";
import { login } from "./lib/auth";
import { useAuth } from "./components/AuthProvider";

export default function LoginPage() {
  const { loginUser } = useAuth();

  const [form, setForm] = useState({
    email: "hacker@gmail.com",
    password: "123",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      setStatus("Missing credentials");
      return;
    }

    setStatus("Authenticating...");

    try {
      const user = await login(form.email, form.password);

      if (user) {
        loginUser(user);
        setStatus("Access granted");
        window.location.href = "/dashboard";
      } else {
        setStatus("Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setStatus("Server error. Try again.");
    }
  };

  return (
    <div className="page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        :root {
          --bg: #060816;
          --surface: rgba(255,255,255,0.04);
          --surface-2: rgba(255,255,255,0.06);
          --border: rgba(255,255,255,0.08);

          --text: #f3f7ff;
          --muted: #8b98b3;

          --accent: #4f8cff;
          --accent-2: #7b61ff;

          --shadow: 0 10px 40px rgba(0,0,0,0.35);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Inter", sans-serif;
        }

        body {
          background: var(--bg);
        }

        .page {
          min-height: 100vh;
          padding-top: 10rem;
          color: var(--text);
          background:
            radial-gradient(circle at top left, rgba(79,140,255,0.15), transparent 30%),
            radial-gradient(circle at top right, rgba(123,97,255,0.12), transparent 30%),
            linear-gradient(to bottom, #0b1020 0%, #060816 100%);
          overflow: hidden;
        }

        .container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 24px;
        } 

        .login-wrapper {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          align-items: center;
          gap: 80px;
          padding: 60px 0;
        } 

        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          color: #c8d2e8;
          font-size: 13px;
          margin-bottom: 24px;
        }

        .hero-tag::before {
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4cff95;
          box-shadow: 0 0 12px #4cff95;
        }

        .hero h1 {
          font-size: 72px;
          line-height: 0.95;
          letter-spacing: -3px;
          margin-bottom: 28px;
          max-width: 650px;
        }

        .gradient-text {
          background: linear-gradient(135deg, #ffffff, #8ab4ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero p {
          color: var(--muted);
          line-height: 1.8;
          font-size: 17px;
          max-width: 560px;
        } 

        .terminal-card {
          margin-top: 34px;
          position: relative;
          background: linear-gradient(
            180deg,
            rgba(255,255,255,0.05),
            rgba(255,255,255,0.025)
          );
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 28px;
          padding: 28px;
          overflow: hidden;
          box-shadow: var(--shadow);
          max-width: 540px;
        }

        .terminal-card::before {
          content: "";
          position: absolute;
          width: 280px;
          height: 280px;
          background: rgba(79,140,255,0.12);
          border-radius: 50%;
          top: -140px;
          right: -120px;
          filter: blur(50px);
        }

        .terminal-top {
          display: flex;
          gap: 8px;
          margin-bottom: 22px;
          position: relative;
          z-index: 2;
        }

        .terminal-top span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255,255,255,0.25);
        }

        .terminal {
          position: relative;
          z-index: 2;
          font-family: monospace;
          white-space: pre-line;
          color: #b9d5ff;
          font-size: 14px;
          line-height: 1.8;
        } 

        .panel {
          position: relative;
          background: linear-gradient(
            180deg,
            rgba(255,255,255,0.05),
            rgba(255,255,255,0.025)
          );
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 32px;
          padding: 40px;
          overflow: hidden;
          box-shadow: var(--shadow);
        }

        .panel::before {
          content: "";
          position: absolute;
          width: 240px;
          height: 240px;
          background: rgba(123,97,255,0.12);
          border-radius: 50%;
          top: -120px;
          right: -100px;
          filter: blur(50px);
        }

        .panel-content {
          position: relative;
          z-index: 2;
        }

        .panel-label {
          display: inline-block;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--accent);
          margin-bottom: 14px;
          font-weight: 600;
        }

        .panel h2 {
          font-size: 38px;
          letter-spacing: -1.5px;
          margin-bottom: 12px;
        }

        .panel p {
          color: var(--muted);
          line-height: 1.7;
          margin-bottom: 32px;
          font-size: 15px;
        }

        .input-group {
          margin-bottom: 18px;
        }

        .input-label {
          display: block;
          margin-bottom: 10px;
          font-size: 13px;
          color: #c6d3ea;
        }

        input {
          width: 100%;
          padding: 16px 18px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          color: var(--text);
          outline: none;
          font-size: 14px;
          transition: 0.25s ease;
        }

        input::placeholder {
          color: #7d8ba5;
        }

        input:focus {
          border-color: rgba(79,140,255,0.45);
          background: rgba(255,255,255,0.06);
          box-shadow: 0 0 0 4px rgba(79,140,255,0.08);
        }

        .btn {
          width: 100%;
          margin-top: 10px;
          padding: 16px;
          border: none;
          border-radius: 16px;
          background: linear-gradient(
            135deg,
            var(--accent),
            var(--accent-2)
          );
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.25s ease;
          box-shadow: var(--shadow);
        }

        .btn:hover {
          transform: translateY(-2px);
          opacity: 0.96;
        }

        .status {
          margin-top: 18px;
          min-height: 20px;
          color: var(--muted);
          font-size: 13px;
        }

        .footer-note {
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.06);
          color: #7d8ba5;
          font-size: 12px;
          line-height: 1.7;
        } 

        @media (max-width: 980px) {
          .login-wrapper {
            grid-template-columns: 1fr;
            gap: 60px;
            padding: 80px 0;
          }

          .hero h1 {
            font-size: 52px;
            letter-spacing: -2px;
          }
        }

        @media (max-width: 640px) {
          .hero h1 {
            font-size: 42px;
            line-height: 1;
          }

          .panel,
          .terminal-card {
            padding: 24px;
            border-radius: 24px;
          }

          .panel h2 {
            font-size: 30px;
          }

          .login-wrapper {
            padding: 50px 0;
          }
        }
      `}</style>

      <div className="container">
        <div className="panel">
          <div className="panel-content">
            <div className="panel-label">Authentication</div>

            <h2>Log in</h2>

            <div className="input-group">
              <label className="input-label">Email Address</label>

              <input
                name="email"
                placeholder="operator@secure-domain.com"
                onChange={handleChange}
                value={form.email}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>

              <input
                name="password"
                type="password"
                placeholder="Enter secure password"
                onChange={handleChange}
                value={form.password}
              />
            </div>

            <button className="btn" onClick={handleLogin}>
              Authenticate
            </button>

            <div className="status">{status}</div>

            <div className="footer-note">
              Unauthorized access attempts are logged and monitored. Session
              activity may be audited for security purposes.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
