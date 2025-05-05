import { useState, useEffect } from 'react';
import { getPronunciations } from './pronunciations';

const App = () => {
  const [text, setText] = useState('');
  const [pronunciation, setPronunciation] = useState('');

  // Get pronunciations from environment variables
  const pronunciations = getPronunciations();

  // Use Effect to load pronunciation from environment variables
  useEffect(() => {
    if (text === "text1") {
      setPronunciation(pronunciations.text1);
    } else if (text === "text2") {
      setPronunciation(pronunciations.text2);
    } else {
      setPronunciation(localStorage.getItem(text) || ''); // Use localStorage as fallback
    }
  }, [text]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handlePronunciationChange = (e) => {
    setPronunciation(e.target.value);
  };

  const savePronunciation = () => {
    // Save pronunciation to localStorage
    localStorage.setItem(text, pronunciation);
    alert('Pronunciation saved!');
  };

  return (
    <div>
      <h1>Text-to-Speech with Pronunciation Instructions</h1>

      {/* Text input */}
      <textarea
        rows="3"
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text for speech"
      />

      {/* Pronunciation instructions */}
      <textarea
        rows="3"
        value={pronunciation}
        onChange={handlePronunciationChange}
        placeholder="Enter pronunciation instructions (optional)"
      />

      {/* Save Pronunciation Button */}
      <button onClick={savePronunciation}>Save Pronunciation</button>
    </div>
  );
};

export default App;
