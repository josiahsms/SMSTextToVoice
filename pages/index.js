import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSynthesize = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/synthesize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        throw new Error("Failed to synthesize audio");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePlay = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  return (
    <main style={{ padding: "2rem", maxWidth: "600px", margin: "auto", fontFamily: "sans-serif" }}>
      <h1>Text to Speech</h1>
      <textarea
        rows="4"
        cols="50"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your text here..."
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
      />
      <div>
        <button onClick={handleSynthesize} disabled={loading}>
          {loading ? "Synthesizing..." : "Convert to Audio"}
        </button>
      </div>
      {audioUrl && (
        <div style={{ marginTop: "1rem" }}>
          <button onClick={handlePlay}>▶️ Play</button>
          &nbsp;
          <a href={audioUrl} download="speech.mp3">
            ⬇️ Download
          </a>
        </div>
      )}
    </main>
  );
}
