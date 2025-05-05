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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        throw new Error("Synthesis failed");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (err) {
      console.error(err);
      alert("Error creating audio.");
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
    <main style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: "600px", margin: "auto" }}>
      <h1>Text to Speech</h1>
      <textarea
        rows={5}
        placeholder="Enter your text here"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", fontSize: "1rem", marginBottom: "1rem" }}
      />
      <br />
      <button onClick={handleSynthesize} disabled={loading}>
        {loading ? "Synthesizing..." : "Convert to Speech"}
      </button>

      {audioUrl && (
        <div style={{ marginTop: "1.5rem" }}>
          <button onClick={handlePlay} style={{ marginRight: "1rem" }}>
            ▶️ Play
          </button>
          <a href={audioUrl} download="speech.mp3">
            ⬇️ Download
          </a>
        </div>
      )}
    </main>
  );
}
