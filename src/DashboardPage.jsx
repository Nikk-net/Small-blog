import { useEffect, useState } from "react";
import CreateEditForm from "./components/CreateEditForm";
import { getSessionUser } from "./lib/auth";
import { createBlog, deleteBlog, editBlog, getBlogs } from "./lib/services";

const blogs = [
  {
    slug: "auth-bypass-saas",
    title: "How I Found an Auth Bypass in a SaaS Platform",
    date: "May 2026",
    readTime: "12 min read",
    tags: ["OWASP", "Auth", "Case Study"],
    content: `
  I discovered a logic flaw in the authentication flow that allowed account takeover.
  
  The issue originated from inconsistent session validation between API layers. While the frontend correctly enforced access boundaries, several backend endpoints trusted stale session state that could still be manipulated after logout transitions.
  
  By chaining multiple requests together, it became possible to impersonate arbitrary users without possessing valid credentials.
  
  This ultimately resulted in full account takeover and unrestricted access to sensitive tenant data.
  `,
  },
  {
    slug: "iam-escalation-aws",
    title: "Cloud IAM Privilege Escalation Paths",
    date: "2026",
    readTime: "8 min read",
    tags: ["AWS", "Cloud", "IAM"],
    content: `
Misconfigured IAM policies often expose privilege escalation paths that remain unnoticed during standard reviews.

Attackers commonly chain permissions such as PassRole, Lambda execution, or EC2 instance profile abuse to elevate privileges indirectly.

In several environments, I observed administrative access becoming achievable without directly assigning admin permissions to users.

The risk becomes especially severe in large cloud infrastructures where inherited trust relationships are poorly audited.
    `,
  },
];

export default function DashboardPage() {
  const user = getSessionUser();

  if (!user) {
    window.location.href = "/login";
  }

  const [posts, setPosts] = useState(blogs);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("view");
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    id: "",
    title: "",
    content: "",
    tags: "",
    featured: "",
  });

  useEffect(() => {
    async function fetchBlogs() {
      const data = await getBlogs();
      setPosts(data);
    }

    fetchBlogs();
  }, []);

  const openEdit = (slug) => {
    setSelected(slug);
    setMode("edit");

    const post = posts.find((post) => post.slug === slug);
    setForm({
      id: post.id,
      title: post.title,
      content: post.content,
      tags: post.tags.join(", "),
      featured: post.featured,
    });
  };

  const openCreate = () => {
    setSelected(null);
    setMode("create");
    setForm({ id: "", title: "", content: "", tags: "", featured: false });
  };

  const savePost = async () => {
    const user = await getSessionUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    if (!form.title || !form.content || !form.tags) {
      return setError("Please fill all fields.");
    }

    const newSlug = form.title.toLowerCase().replaceAll(" ", "-");

    const updated = {
      id: form.id,
      slug: newSlug,
      title: form.title,
      content: form.content,
      tags: form.tags.split(",").map((t) => t.trim()),
      featured: form.featured,
    };

    if (mode === "edit") {
      const editedBlog = await editBlog(updated);

      if (editedBlog) {
        window.location.reload();
      }
    } else if (mode === "create") {
      const now = new Date();
      const month = new Date().toLocaleString("en-US", {
        month: "long",
      });
      const year = now.getFullYear();

      const createdBlog = await createBlog({
        ...updated,
        date: `${month} ${year}`,
      });

      if (createdBlog) {
        window.location.reload();
      }
    }

    setPosts((prev) => [...prev, updated]);

    setMode("view");
    setSelected(newSlug);
    setError(null);
  };

  const deletePost = async (id, slugToDelete) => {
    const user = await getSessionUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?",
    );

    if (!confirmed) {
      return;
    }

    const isDeleted = await deleteBlog(id);

    if (isDeleted) {
      const newPosts = posts.filter((post) => post.slug !== slugToDelete);
      setPosts(newPosts);

      if (selected === slugToDelete) {
        setSelected(null);
        setMode("view");
        setForm({ id: "", title: "", content: "", tags: "" });
      }
    }
  };

  return (
    <div className="page">
      <style>{`
        :root {
          --bg: #060816;
          --surface: rgba(255,255,255,0.04);
          --surface-2: rgba(255,255,255,0.06);
          --border: rgba(255,255,255,0.08);

          --text: #f3f7ff;
          --muted: #8b98b3;

          --accent: #4f8cff;
          --accent-2: #7b61ff;

          --danger: #ff4f6d;

          --shadow: 0 10px 40px rgba(0,0,0,0.35);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Inter", sans-serif;
        }

        .page {
          min-height: 100vh;
          color: var(--text);
          background:
            radial-gradient(circle at top left, rgba(79,140,255,0.15), transparent 30%),
            radial-gradient(circle at top right, rgba(123,97,255,0.12), transparent 30%),
            linear-gradient(to bottom, #0b1020 0%, #060816 100%);
        }

        .container {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .layout {
          display: grid;
          grid-template-columns: 0.9fr 1.3fr;
          gap: 24px;
          padding: 100px 0;
        }

        .panel, .editor {
          position: relative;
          background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.025));
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 28px;
          padding: 28px;
          box-shadow: var(--shadow);
          overflow: hidden;
        }

        .panel h2, .editor h2 {
          font-size: 22px;
          margin-bottom: 18px;
        }

        .post-item {
          padding: 14px;
          border-radius: 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          margin-bottom: 12px;
          cursor: pointer;
          transition: 0.25s;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
        }

        .post-item:hover {
          border-color: rgba(79,140,255,0.35);
          transform: translateY(-2px);
        }

        .delete {
          font-size: 12px;
          color: var(--danger);
          border: 1px solid rgba(255,79,109,0.3);
          padding: 6px 10px;
          border-radius: 10px;
          background: rgba(255,79,109,0.08);
          cursor: pointer;
          transition: 0.2s;
          white-space: nowrap;
        }

        .delete:hover {
          background: rgba(255,79,109,0.15);
        }

        .btn {
          width: 100%;
          margin-top: 14px;
          padding: 14px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          color: var(--text);
          cursor: pointer;
          transition: 0.25s;
          font-weight: 600;
        }

        .btn:hover {
          border-color: rgba(79,140,255,0.35);
          transform: translateY(-2px);
        }

        .save {
          background: linear-gradient(135deg, var(--accent), var(--accent-2));
          border: none;
          color: white;
        }

        input, textarea {
          width: 100%;
          margin-top: 14px;
          padding: 16px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          color: var(--text);
          outline: none;
        }

        textarea {
          min-height: 160px;
        }

        .actions {
          display: flex;
          gap: 12px;
          margin-top: 18px;
        }
      `}</style>

      <div className="container">
        <div className="layout">
          <div className="panel">
            <h2>Posts</h2>

            {posts.map((post) => (
              <div
                key={post.slug}
                className="post-item"
                onClick={() => openEdit(post.slug)}
              >
                <div>{post.title}</div>

                <button
                  className="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePost(post.id, post.slug);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}

            <button className="btn" onClick={openCreate}>
              + New Post
            </button>
          </div>

          <CreateEditForm
            mode={mode}
            form={form}
            setForm={setForm}
            savePost={savePost}
            setMode={setMode}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}
