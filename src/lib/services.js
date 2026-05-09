export async function getBlogs() {
  const res = await fetch("http://localhost:3001/blogs", { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const data = await res.json();

  return data;
}

export async function deleteBlog(id) {
  const res = await fetch(`http://localhost:3001/blogs/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete blog");
  }

  return true;
}

export async function editBlog(updatedData) {
  const updateRes = await fetch(
    `http://localhost:3001/blogs/${updatedData.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    },
  );

  if (!updateRes.ok) {
    throw new Error("Failed to update blog");
  }

  return await updateRes.json();
}

export async function createBlog(blogData) {
  const res = await fetch("http://localhost:3001/blogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogData),
  });

  if (!res.ok) {
    throw new Error("Failed to create blog");
  }

  return await res.json();
}

export async function getBlogByID(id) {
  const res = await fetch(`http://localhost:3001/blogs/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to get blog");
  }

  const data = await res.json();

  return data;
}
