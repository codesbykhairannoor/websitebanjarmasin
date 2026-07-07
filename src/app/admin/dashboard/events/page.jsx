"use client";
import React, { useState, useEffect } from "react";

const LANGUAGES = ["id", "en", "ms", "zh"];

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    slug: "",
    portalName: "",
    date: "",
    title: { id: "", en: "", ms: "", zh: "" },
    desc: { id: "", en: "", ms: "", zh: "" },
    tag: { id: "", en: "", ms: "", zh: "" }
  });

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/events");
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEdit = (ev) => {
    setEditingId(ev.id);
    setFormData({
      slug: ev.slug,
      portalName: ev.portalName || "",
      date: ev.date || "",
      title: { ...ev.title },
      desc: { ...ev.desc },
      tag: { ...ev.tag }
    });
  };

  const handleNew = () => {
    setEditingId("NEW");
    setFormData({
      slug: "",
      portalName: "",
      date: "",
      title: { id: "", en: "", ms: "", zh: "" },
      desc: { id: "", en: "", ms: "", zh: "" },
      tag: { id: "", en: "", ms: "", zh: "" }
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await fetch(`/api/events/${id}`, { method: "DELETE" });
      fetchEvents();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isNew = editingId === "NEW";
    const method = isNew ? "POST" : "PUT";
    const url = isNew ? "/api/events" : `/api/events/${editingId}`;

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      setEditingId(null);
      fetchEvents();
    } catch (e) {
      console.error(e);
      alert("Failed to save");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black font-heading">Manage Events</h1>
        {!editingId && (
          <button onClick={handleNew} className="bg-[#F4C038] hover:bg-[#DCA424] text-[#091422] px-4 py-2 rounded-lg font-bold">
            + New Event
          </button>
        )}
      </div>

      {editingId ? (
        <form onSubmit={handleSubmit} className="bg-[#091422] p-6 border border-white/10 rounded-2xl space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{editingId === "NEW" ? "Create New Event" : "Edit Event"}</h2>
            <button type="button" onClick={() => setEditingId(null)} className="text-white/50 hover:text-white">Cancel</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">Slug</label>
              <input required value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full bg-[#050B14] border border-white/10 rounded p-3 text-white" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Portal Name</label>
              <input required value={formData.portalName} onChange={e => setFormData({...formData, portalName: e.target.value})} className="w-full bg-[#050B14] border border-white/10 rounded p-3 text-white" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Event Date</label>
              <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-[#050B14] border border-white/10 rounded p-3 text-white" />
            </div>
          </div>

          {LANGUAGES.map(lang => (
            <div key={lang} className="p-4 border border-white/10 rounded-xl bg-[#050B14] space-y-4">
              <h3 className="font-bold uppercase text-[#F4C038]">Language: {lang}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Title</label>
                  <input required value={formData.title[lang]} onChange={e => setFormData({...formData, title: {...formData.title, [lang]: e.target.value}})} className="w-full bg-[#091422] border border-white/10 rounded p-3 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Tag (e.g. Festival Bahari)</label>
                  <input required value={formData.tag[lang]} onChange={e => setFormData({...formData, tag: {...formData.tag, [lang]: e.target.value}})} className="w-full bg-[#091422] border border-white/10 rounded p-3 text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Description</label>
                <textarea required rows={3} value={formData.desc[lang]} onChange={e => setFormData({...formData, desc: {...formData.desc, [lang]: e.target.value}})} className="w-full bg-[#091422] border border-white/10 rounded p-3 text-white" />
              </div>
            </div>
          ))}

          <button type="submit" className="w-full bg-[#33C3B3] hover:bg-[#2AA698] text-white font-black py-4 rounded-xl">
            Save Event
          </button>
        </form>
      ) : (
        <div className="bg-[#091422] border border-white/10 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-white/50">Loading...</div>
          ) : events.length === 0 ? (
            <div className="p-8 text-center text-white/50">No events found.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-4 font-bold">Title (ID)</th>
                  <th className="p-4 font-bold">Date</th>
                  <th className="p-4 font-bold">Portal</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map(ev => (
                  <tr key={ev.id} className="border-b border-white/10 hover:bg-white/5">
                    <td className="p-4">{ev.title.id}</td>
                    <td className="p-4 text-white/50">{ev.date}</td>
                    <td className="p-4 text-white/50">{ev.portalName}</td>
                    <td className="p-4 flex gap-3 justify-end">
                      <button onClick={() => handleEdit(ev)} className="text-[#F4C038] hover:text-white">Edit</button>
                      <button onClick={() => handleDelete(ev.id)} className="text-red-500 hover:text-white">Delete</button>
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
