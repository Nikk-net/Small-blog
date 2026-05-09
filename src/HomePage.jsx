import { useEffect, useState } from "react";
import PostCard from "./components/PostCard";
import { getBlogs } from "./lib/services";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getBlogs();
      setPosts(Array.isArray(data) ? data : []);
    })();
  }, []);

  const featuredPosts = posts.filter((p) => p.featured);

  return (
    <div className="page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        :root {
          --bg: #060816;
          --text: #f3f7ff;
          --muted: #8b98b3;
          --accent: #4f8cff;
          --accent-2: #7b61ff;
          --border: rgba(255,255,255,0.08);
          --card: rgba(255,255,255,0.04);
          --card-2: rgba(255,255,255,0.06);
          --shadow: 0 10px 40px rgba(0,0,0,0.35);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Inter, sans-serif;
        }

        body {
          background: var(--bg);
        }

        .page {
          min-height: 100vh;
          color: var(--text);
          background:
            radial-gradient(circle at top left, rgba(79,140,255,0.15), transparent 35%),
            radial-gradient(circle at top right, rgba(123,97,255,0.12), transparent 35%),
            linear-gradient(to bottom, #0b1020, #060816);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }
 
        .hero {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 48px;
          align-items: center;
          padding: 96px 0;
        }

        .tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border);
          color: var(--muted);
          font-size: 13px;
        }

        .tag::before {
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4cff95;
          box-shadow: 0 0 10px #4cff95;
        }

        h1 {
          font-size: 54px;
          line-height: 1.05;
          letter-spacing: -2px;
          margin: 18px 0;
        }

        .gradient {
          background: linear-gradient(135deg, #fff, #8ab4ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        p {
          color: var(--muted);
          line-height: 1.7;
          max-width: 600px;
        }

        .cta {
          display: flex;
          gap: 12px;
          margin-top: 28px;
          flex-wrap: wrap; 
          text-decoration: none;
        }

        .btn {
          text-decoration: none;
        }

        .btn {
          padding: 12px 18px;
          border-radius: 12px; 
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          transition: 0.2s ease;
        }

        .primary {
          background: linear-gradient(135deg, var(--accent), var(--accent-2));
          color: white;
        }

        .secondary {
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border);
          color: var(--text);
        }

        .btn:hover {
          transform: translateY(-2px); 
        }

        .heroCard {
          background: linear-gradient(180deg, var(--card-2), var(--card));
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 18px;
          box-shadow: var(--shadow);
          overflow: hidden;
        }

        .heroCard img {
          width: 100%;
          height: auto;
          border-radius: 16px;
          display: block;
        }

        .section {
          padding: 96px 0;
        }

        .sectionHeader {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 24px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .subtitle {
          font-size: 12px;
          text-transform: uppercase;
          color: var(--accent);
          letter-spacing: 1px;
          margin-bottom: 8px;
        }

        h2 {
          font-size: 38px;
          letter-spacing: -1px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .about {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          padding: 40px;
          border: 1px solid var(--border);
          border-radius: 24px;
          background: rgba(255,255,255,0.03);
        }

        .about img {
          width: 100%;
          border-radius: 18px;
        }

        .contact {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .card {
          padding: 18px;
          border-radius: 16px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.03);
        }

        .label {
          font-size: 11px;
          color: var(--muted);
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        @media (max-width: 960px) {
          .hero {
            grid-template-columns: 1fr;
          }

          .grid {
            grid-template-columns: 1fr;
          }

          .about {
            grid-template-columns: 1fr;
          }

          .contact {
            grid-template-columns: 1fr;
          }

          h1 {
            font-size: 42px;
          }
        }
      `}</style>

      <div className="container">
        <section className="hero">
          <div>
            <div className="tag">Cybersecutiry Specialist</div>

            <h1>
              <span className="gradient">Nickolay.</span>
              <br />Cybersec.
            </h1>

            <p>
              Offensive security focused on exploit chains, cloud exposure, and
              real-world adversarial thinking across modern infrastructure.
            </p>

            <div className="cta">
              <a className="btn primary" href="#work">
                View Work
              </a>
              <a className="btn secondary" href="/mockcv.jpg" download>
                Download CV
              </a>
            </div>
          </div>

          <div className="heroCard">
            <img
              src="/heroImg.webp"
              alt="Security visualization"
            />
          </div>
        </section>

        <section id="work" className="section">
          <div className="sectionHeader">
            <div>
              <div className="subtitle">Featured</div>
              <h2>Selected Blogs</h2>
              <div className="cta">
                <a className="btn primary" href="#about">
                  About Me
                </a>
              </div>
            </div>
          </div>

          <div className="grid">
            {featuredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        <section className="section" id="about">
          <div className="about">
            <div>
              <h2 style={{ marginBottom: 12 }}>About</h2>{" "}
              <div className="cta" style={{ marginBottom: 20 }}>
                <a className="btn primary" href="/blog">
                  Read Blogs
                </a>
              </div>
              <p>
                Focused on breaking systems under realistic constraints,
                identifying exploit paths before attackers do, and validating
                infrastructure resilience.
              </p>
              <br />
              <p>
                Specialization includes web exploitation, cloud attack paths,
                privilege escalation, and infrastructure abuse modeling.
              </p>
            </div>

            <img src="/aboutImg.jpg" alt="About visual"  />
          </div>
        </section>

        <section className="section">
          <h2 style={{ marginBottom: 24 }}>Contact</h2>

          <div className="contact">
            <div className="card">
              <div className="label">Email</div>
              unibit.sofia
            </div>

            <div className="card">
              <div className="label">GitHub</div>
              https://github.com/Nikk-net
            </div>

            <div className="card">
              <div className="label">LinkedIn</div>
              https://linkedin.com/in/nikolay
            </div>
          </div>
        </section>

        <footer
          style={{ textAlign: "center", padding: "40px 0", color: "#8b98b3" }}
        >
          © 2026 Offensive Security Portfolio
        </footer>
      </div>
    </div>
  );
}
