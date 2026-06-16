"use client";

import { useState } from "react";

export default function Page() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCheck() {
    if (!message) return;

    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });

      const data = await res.json();

      setReply(data.reply);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <div>
        <input
          placeholder="scamcheck"
          className="border w-full p-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={handleCheck} className="border px-4 py-2 mt-2">
          {loading ? "Checking..." : "Check"}
        </button>
      </div>

      {reply && <div className="border p-4 rounded">{reply}</div>}

      <div className="text-sm text-gray-500">
        ScamCheck là công cụ giáo dục do nhóm học viên phát triển và không thay
        thế cảnh báo chính thức từ ngân hàng hoặc cơ quan chức năng.
      </div>
    </div>
  );
}
