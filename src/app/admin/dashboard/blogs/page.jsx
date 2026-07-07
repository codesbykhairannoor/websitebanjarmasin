"use client";
import React, { useState, useEffect } from "react";

const LANGUAGES = ["id", "en", "ms", "zh"];

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    slug: "",
    image: "",
    title: { id: "", en: "", ms: "", zh: "" },
    content: { id: "", en: "", ms: "", zh: "" }
  });

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blogs");
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleEdit = (blog) => {
    setEditingId(blog.id);
    setFormData({
      slug: blog.slug,
      image: blog.image || "",
      title: { ...blog.title },
      content: { ...blog.content }
    });
  };

  const handleNew = () => {
    setEditingId("NEW");
    setFormData({
      slug: "",
      image: "",
      title: { id: "", en: "", ms: "", zh: "" },
      content: { id: "", en: "", ms: "", zh: "" }
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      fetchBlogs();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isNew = editingId === "NEW";
    const method = isNew ? "POST" : "PUT";
    const url = isNew ? "/api/blogs" : `/api/blogs/${editingId}`;

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      setEditingId(null);
      fetchBlogs();
    } catch (e) {
      console.error(e);
      alert("Failed to save");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black font-heading">Manage Blogs</h1>
        {!editingId && (
          <button onClick={handleNew} className="bg-[#33C3B3] hover:bg-[#2AA698] text-white px-4 py-2 rounded-lg font-bold">
            + New Blog
          </button>
        )}
      </div>

      {editingId ? (
        <form onSubmit={handleSubmit} className="bg-[#091422] p-6 border border-white/10 rounded-2xl space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{editingId === "NEW" ? "Create New Blog" : "Edit Blog"}</h2>
            <button type="button" onClick={() => setEditingId(null)} className="text-white/50 hover:text-white">Cancel</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">Slug (URL friendly)</label>
              <input required value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full bg-[#050B14] border border-white/10 rounded p-3 text-white" placeholder="e.g. pasar-terapung" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Image URL</label>
              <input value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-[#050B14] border border-white/10 rounded p-3 text-white" placeholder="/home/blog-image.webp" />
            </div>
          </div>

          {LANGUAGES.map(lang => (
            <div key={lang} className="p-4 border border-white/10 rounded-xl bg-[#050B14] space-y-4">
              <h3 className="font-bold uppercase text-[#33C3B3]">Language: {lang}</h3>
              <div>
                <label className="block text-sm font-bold mb-1">Title</label>
                <input required value={formData.title[lang]} onChange={e => setFormData({...formData, title: {...formData.title, [lang]: e.target.value}})} className="w-full bg-[#091422] border border-white/10 rounded p-3 text-white" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Content (Markdown supported)</label>
                <textarea required rows={6} value={formData.content[lang]} onChange={e => setFormData({...formData, content: {...formData.content, [lang]: e.target.value}})} className="w-full bg-[#091422] border border-white/10 rounded p-3 text-white" />
              </div>
            </div>
          ))}

          <button type="submit" className="w-full bg-[#F4C038] hover:bg-[#DCA424] text-[#091422] font-black py-4 rounded-xl">
            Save Blog Post
          </button>
        </form>
      ) : (
        <div className="bg-[#091422] border border-white/10 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-white/50">Loading...</div>
          ) : blogs.length === 0 ? (
            <div className="p-8 text-center text-white/50">No blogs found.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-4 font-bold">Title (ID)</th>
                  <th className="p-4 font-bold">Slug</th>
                  <th className="p-4 font-bold">Date</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map(blog => (
                  <tr key={blog.id} className="border-b border-white/10 hover:bg-white/5">
                    <td className="p-4">{blog.title.id}</td>
                    <td className="p-4 text-white/50">{blog.slug}</td>
                    <td className="p-4 text-white/50">{new Date(blog.date).toLocaleDateString()}</td>
                    <td className="p-4 flex gap-3 justify-end">
                      <button onClick={() => handleEdit(blog)} className="text-[#33C3B3] hover:text-white">Edit</button>
                      <button onClick={() => handleDelete(blog.id)} className="text-red-500 hover:text-white">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
