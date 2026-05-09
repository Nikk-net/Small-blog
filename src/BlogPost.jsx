import { useParams, Link } from "react-router-dom";
import { getBlogByID } from "./lib/services";
import { useEffect, useState } from "react";

export default function BlogPost() {
  const { id } = useParams();

  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchBlogs() {
      const data = await getBlogByID(id);
      setPost(data);
    }

    fetchBlogs();
  }, []);

  if (!post) {
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
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Inter", sans-serif;
          }

          .page {
            min-height: 100vh;
            background:
              radial-gradient(circle at top left, rgba(79,140,255,0.15), transparent 30%),
              radial-gradient(circle at top right, rgba(123,97,255,0.12), transparent 30%),
              linear-gradient(to bottom, #0b1020 0%, #060816 100%);
            color: var(--text);
          }

          .not-found {
            max-width: 900px;
            margin: 0 auto;
            padding: 120px 24px;
          }

          .not-found h2 {
            font-size: 42px;
            margin-bottom: 20px;
          }

          .not-found a {
            color: var(--accent);
            text-decoration: none;
          }
        `}</style>

        <div className="not-found">
          <h2>Post not found</h2>

          <Link to="/blog">← Back to blog</Link>
        </div>
      </div>
    );
  }

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
          max-width: 920px;
          margin: 0 auto;
          padding: 0 24px;
        } 

        .article-header {
          padding: 120px 0 60px;
        }

        .article-tag {
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

        .article-tag::before {
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4cff95;
          box-shadow: 0 0 12px #4cff95;
        }

        .article-header h1 {
          font-size: 48px;
          line-height: 1;
          letter-spacing: -3px;
          margin-bottom: 28px;
          max-width: 850px;
        }

        .gradient-text {
          background: linear-gradient(135deg, #ffffff, #8ab4ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .meta-row {
          display: flex;
          align-items: center;
          gap: 18px;
          color: var(--muted);
          font-size: 14px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .meta-divider {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .tags span {
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.06);
          color: #c6d3ea;
          font-size: 12px;
        } 

        .article-wrapper {
          padding-bottom: 120px;
        }

        .article {
          position: relative;
          background: linear-gradient(
            180deg,
            rgba(255,255,255,0.05),
            rgba(255,255,255,0.025)
          );
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 32px;
          padding: 50px;
          overflow: hidden;
          box-shadow: var(--shadow);
        }

        .article::before {
          content: "";
          position: absolute;
          width: 300px;
          height: 300px;
          background: rgba(79,140,255,0.12);
          border-radius: 50%;
          top: -150px;
          right: -120px;
          filter: blur(50px);
        }

        .article-content {
          position: relative;
          z-index: 2;
          white-space: pre-line;
          color: #c8d2e8;
          line-height: 2;
          font-size: 16px;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 34px;
          color: var(--text);
          padding: 14px 18px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          transition: 0.25s ease;
        }

        .back-link:hover {
          transform: translateY(-2px);
          border-color: rgba(79,140,255,0.35);
        } 

        .footer {
          padding: 30px 0 50px;
          text-align: center;
          color: var(--muted);
          font-size: 13px;
        } 

        @media (max-width: 900px) {
          .article-header h1 {
            font-size: 48px;
            letter-spacing: -2px;
          }

          .article {
            padding: 32px;
          }
        }

        @media (max-width: 640px) {
          .article-header {
            padding-top: 80px;
          }

          .article-header h1 {
            font-size: 38px;
            line-height: 1.05;
          }

          .article {
            padding: 24px;
            border-radius: 24px;
          }

          .article-content {
            font-size: 15px;
            line-height: 1.9;
          }
        }
      `}</style>

      <div className="container">
        <section className="article-header">
          <div className="article-tag">Offensive Security Research</div>

          <h1>
            <span className="gradient-text">{post.title}</span>
          </h1>

          <div className="meta-row">
            <div className="meta-divider" />
            <span>{post.date}</span>
          </div>

          <div className="tags">
            {post.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </section>

        <section className="article-wrapper">
          <div className="article">
            <div className="article-content">{post.content}</div>
          </div>

          <Link className="back-link" to="/blog">
            ← Back to blog
          </Link>
        </section>

        <footer className="footer">© 2026 - Offensive Security Research</footer>
      </div>
    </div>
  );
}
