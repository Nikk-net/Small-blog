import { useEffect, useState } from "react";
import PostCard from "./components/PostCard";
import { getBlogs } from "./lib/services";

export default function BlogsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      const data = await getBlogs();
      setPosts(data);
    }

    fetchBlogs();
  }, []);

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

        a {
          text-decoration: none;
        }

        .page {
          min-height: 100vh;
          color: var(--text);
          background:
            radial-gradient(circle at top left, rgba(79,140,255,0.15), transparent 30%),
            radial-gradient(circle at top right, rgba(123,97,255,0.12), transparent 30%),
            linear-gradient(to bottom, #0b1020 0%, #060816 100%);
          overflow-x: hidden;
        }

        .container {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .hero {
          padding: 120px 0 70px;
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
          font-size: 48px;
          line-height: 1;
          letter-spacing: -3px;
          margin-bottom: 24px;
          max-width: 800px;
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
          max-width: 700px;
        }

        .blog-section {
          padding-bottom: 120px;
        }

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .blog-card {
          position: relative;
          padding: 30px;
          border-radius: 28px;
          background: linear-gradient(
            180deg,
            rgba(255,255,255,0.05),
            rgba(255,255,255,0.025)
          );
          border: 1px solid rgba(255,255,255,0.08);
          transition: 0.3s ease;
          overflow: hidden;
          color: inherit;
        }

        .blog-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(79,140,255,0.08),
            transparent 40%
          );
          opacity: 0;
          transition: 0.3s ease;
        }

        .blog-card:hover {
          transform: translateY(-6px);
          border-color: rgba(79,140,255,0.35);
        }

        .blog-card:hover::before {
          opacity: 1;
        }

        .blog-top {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .blog-icon {
          width: 54px;
          height: 54px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(79,140,255,0.12);
          font-size: 22px;
        }

        .read-time {
          font-size: 12px;
          color: var(--muted);
        }

        .blog-card h2 {
          position: relative;
          z-index: 2;
          font-size: 24px;
          line-height: 1.3;
          margin-bottom: 16px;
        }

        .blog-card p {
          position: relative;
          z-index: 2;
          color: var(--muted);
          line-height: 1.8;
          font-size: 15px;
          margin-bottom: 22px;
        }

        .tags {
          position: relative;
          z-index: 2;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 24px;
        }

        .tags span {
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.06);
          color: #c6d3ea;
          font-size: 12px;
        }

        .meta {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: var(--muted);
          font-size: 13px;
          padding-top: 18px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .meta span:last-child {
          color: var(--text);
          font-weight: 500;
        }

        .footer {
          padding: 30px 0 50px;
          text-align: center;
          color: var(--muted);
          font-size: 13px;
        }

        @media (max-width: 960px) {
          .blog-grid {
            grid-template-columns: 1fr;
          }

          .hero h1 {
            font-size: 52px;
            letter-spacing: -2px;
          }
        }

        @media (max-width: 640px) {

          .hero {
            padding-top: 70px;
          }

          .hero h1 {
            font-size: 42px;
          }

          .blog-card {
            padding: 24px;
          }
        }
      `}</style>

      <div className="container">
        <section className="hero">
          <div className="hero-tag">Blog Notes</div>

          <h1>
            <span className="gradient-text">
              Documenting Exploits.
              <br />
            </span>
          </h1>

          <p>
            Technical writeups, exploit breakdowns, offensive security research,
            and lessons extracted from real-world attack surfaces and
            penetration testing engagements.
          </p>
        </section>

        <section className="blog-section" id="blogs">
          <div className="blog-grid">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        <footer className="footer" id="footer">
          © 2026 - Offensive Security Research
        </footer>
      </div>
    </div>
  );
}
