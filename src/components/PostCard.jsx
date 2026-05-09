import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <>
      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .project-card {
          text-decoration: none;
          cursor: pointer;
          position: relative;
          padding: 28px;
          border-radius: 24px;
          background: linear-gradient(
            180deg,
            rgba(255,255,255,0.05),
            rgba(255,255,255,0.025)
          );
          border: 1px solid rgba(255,255,255,0.08);
          transition: 0.3s ease;
          overflow: hidden;
        }

        .project-card:hover {
          transform: translateY(-6px);
          border-color: rgba(79,140,255,0.4);
        }

        .project-icon {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(79,140,255,0.12);
          margin-bottom: 20px;
          font-size: 20px;
        }

        .project-card h3 {
          font-size: 20px;
          color: var(--text);
          margin-bottom: 12px;
        }

        .project-card p {
          color: var(--muted);
          line-height: 1.7;
          margin-bottom: 18px;
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
        `}</style>
      <Link to={`/blog/${post.id}`} className="project-card">
        <div className="project-icon">⚡</div>

        <h3>{post.title}</h3>

        <p>{post.content.slice(0, 150)}...</p>

        <div className="tags">
          {post.tags.map((tag) => (
            <span>{tag}</span>
          ))}
        </div>
      </Link>
    </>
  );
}
