import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSynthesize = async () => {
    setLoading(true);
    const response = await fetch('/api/synthesize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'speech.mp3';
    link.click();

    window.URL.revokeObjectURL(url);
    setLoading(false);
  };

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>Text to Speech</h1>
      <textarea
        rows={6}
        style={{ width: '100%', marginBottom: 16 }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text here..."
      />
      <br />
      <button onClick={handleSynthesize} disabled={loading || !text}>
        {loading ? 'Generating...' : 'Download Audio'}
      </button>
    </div>
  );
}