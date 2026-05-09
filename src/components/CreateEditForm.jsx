export default function CreateEditForm({
  mode,
  form,
  setForm,
  savePost,
  setMode,
  error,
}) {
  return (
    <form
      className="editor"
      onSubmit={(e) => {
        e.preventDefault();
        savePost();
      }}
    >
      {mode === "view" && <h2>Select a post</h2>}

      {(mode === "edit" || mode === "create") && (
        <>
          <h2>{mode === "edit" ? "Edit Post" : "Create Post"}</h2>

          <input
            placeholder="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            placeholder="content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />

          <input
            placeholder="tags (comma-separated)"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              gap: "10px",
              marginTop: 20,
              padding: "10px 12px",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.03)",
              width: "fit-content",
            }}
          >
            <label
              style={{
                fontSize: "14px",
                color: "#cbd5e1",
                margin: 0,
                display: "flex",
                alignItems: "center",
              }}
            >
              Featured?
            </label>

            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              style={{
                width: "18px",
                height: "18px",
                margin: 0,
                accentColor: "#5B8CFF",
                cursor: "pointer",
              }}
            />
          </div>

          <div className="actions">
            <button className="btn save" type="submit">
              Save
            </button>

            <button className="btn" onClick={() => setMode("view")}>
              Cancel
            </button>
          </div>
          {error && (
            <p
              style={{ color: "red", textAlign: "center", paddingTop: "12px" }}
            >
              {error}
            </p>
          )}
        </>
      )}
    </form>
  );
}
