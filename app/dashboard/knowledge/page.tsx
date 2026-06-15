"use client";

import { useEffect, useState } from "react";


import { useUser } from "@clerk/nextjs";

export default function KnowledgePage() {
  const { user } = useUser();

  const [content, setContent] = useState("");

  const [notes, setNotes] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

 async function fetchKnowledge() {
  const res = await fetch("/api/knowledge");

  const data = await res.json();

  setNotes(data);
}

  useEffect(() => {
    if (user) {
      fetchKnowledge();
    }
  }, [user]);

  async function saveKnowledge() {
    if (!content) return;

    try {
      setLoading(true);

   await fetch("/api/knowledge", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    content,
  }),
});

      setContent("");

      await fetchKnowledge();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-5xl font-bold mb-8">
        Knowledge Bank
      </h1>

      <div className="bg-white rounded-3xl p-8 border shadow-sm mb-8">
        <h2 className="text-2xl font-semibold mb-5">
          Add Clinic Knowledge
        </h2>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add clinic tone, services, FAQs, treatment notes..."
          className="w-full h-40 border border-zinc-300 rounded-2xl p-4 outline-none mb-5 resize-none"
        />

        <button
          onClick={saveKnowledge}
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white px-6 py-3 rounded-2xl transition"
        >
          {loading ? "Saving..." : "Save Knowledge"}
        </button>
      </div>

      <div className="space-y-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-white p-6 rounded-2xl border shadow-sm"
          >
            <p className="text-zinc-700 leading-7">
              {note.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}