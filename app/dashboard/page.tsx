"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";

export default function DashboardPage() {
  const [topic, setTopic] = useState("");

  const [captions, setCaptions] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  async function fetchCaptions() {
    const { data } = await supabase
      .from("captions")
      .select("*")
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false });

    if (data) {
      setCaptions(data.map((item) => item.content));
    }
  }

  useEffect(() => {
    fetchCaptions();
  }, []);

  async function generateCaptions() {
    if (!topic) return;

    try {
      setLoading(true);

      const response = await fetch("/api/generate", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          topic,
        }),
      });

      await response.json();

      await fetchCaptions();

      setTopic("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-5xl font-bold text-zinc-900 mb-3">
        Generate Captions
      </h1>

      <p className="text-zinc-600 text-lg mb-10">
        AI-powered captions trained on your practice voice.
      </p>

      <div className="bg-white rounded-3xl p-8 border shadow-sm mb-8">
        <h2 className="text-2xl font-semibold mb-6">
          Caption Generator
        </h2>

        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic..."
          className="w-full border border-zinc-300 rounded-2xl p-4 mb-5 outline-none"
        />

        <button
          onClick={generateCaptions}
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 transition text-white px-6 py-3 rounded-2xl"
        >
          {loading ? "Generating..." : "Generate Captions"}
        </button>
      </div>

      <div className="space-y-4">
        {captions.map((caption, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl border shadow-sm"
          >
            <p className="text-zinc-700 leading-7">
              {caption}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}