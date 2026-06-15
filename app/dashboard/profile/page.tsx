"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function ProfilePage() {
  const { user } = useUser();

  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    practice_name: "",
    location: "",
    phone: "",
    website: "",
    brand_voice: "",
    target_audience: "",
    services: "",
    call_to_action: "",
  });

 async function fetchProfile() {
  const res = await fetch("/api/profile");

  const data = await res.json();

  if (data) {
    setProfile({
      practice_name: data.practice_name || "",
      location: data.location || "",
      phone: data.phone || "",
      website: data.website || "",
      brand_voice: data.brand_voice || "",
      target_audience: data.target_audience || "",
      services: data.services || "",
      call_to_action: data.call_to_action || "",
    });
  }
}
  useEffect(() => {
    fetchProfile();
  }, [user]);

  async function saveProfile() {
    if (!user) return;

    try {
      setLoading(true);

     await fetch("/api/profile", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(profile),
});

      alert("Profile saved successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to save profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl">
      <h1 className="text-5xl font-bold mb-8">
        Practice Profile
      </h1>

      <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-6">

        <input
          type="text"
          placeholder="Practice Name"
          value={profile.practice_name}
          onChange={(e) =>
            setProfile({
              ...profile,
              practice_name: e.target.value,
            })
          }
          className="w-full border p-4 rounded-xl"
        />

        <input
          type="text"
          placeholder="Location"
          value={profile.location}
          onChange={(e) =>
            setProfile({
              ...profile,
              location: e.target.value,
            })
          }
          className="w-full border p-4 rounded-xl"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={profile.phone}
          onChange={(e) =>
            setProfile({
              ...profile,
              phone: e.target.value,
            })
          }
          className="w-full border p-4 rounded-xl"
        />

        <input
          type="text"
          placeholder="Website"
          value={profile.website}
          onChange={(e) =>
            setProfile({
              ...profile,
              website: e.target.value,
            })
          }
          className="w-full border p-4 rounded-xl"
        />

        <textarea
          placeholder="Brand Voice"
          value={profile.brand_voice}
          onChange={(e) =>
            setProfile({
              ...profile,
              brand_voice: e.target.value,
            })
          }
          className="w-full h-28 border p-4 rounded-xl"
        />

        <textarea
          placeholder="Target Audience"
          value={profile.target_audience}
          onChange={(e) =>
            setProfile({
              ...profile,
              target_audience: e.target.value,
            })
          }
          className="w-full h-28 border p-4 rounded-xl"
        />

        <textarea
          placeholder="Services Offered"
          value={profile.services}
          onChange={(e) =>
            setProfile({
              ...profile,
              services: e.target.value,
            })
          }
          className="w-full h-32 border p-4 rounded-xl"
        />

        <textarea
          placeholder="Call To Action"
          value={profile.call_to_action}
          onChange={(e) =>
            setProfile({
              ...profile,
              call_to_action: e.target.value,
            })
          }
          className="w-full h-24 border p-4 rounded-xl"
        />

        <button
          onClick={saveProfile}
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-2xl"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
}