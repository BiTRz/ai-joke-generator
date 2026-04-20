import { useState } from "react";

function App() {
  // User input for joke topic.
  const [topic, setTopic] = useState("");

  // Generated joke text returned from backend.
  const [joke, setJoke] = useState("");

  // Loading flag for request lifecycle/UI feedback.
  const [loading, setLoading] = useState(false);

  // Calls backend API to generate a joke for the current topic.
  const generateJoke = async () => {
    setLoading(true);
    setJoke("");

    // Send topic to FastAPI backend.
    const res = await fetch("http://localhost:8000/joke", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });

    // Parse response and update UI with returned joke.
    const data = await res.json();
    setJoke(data.joke);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>AI Joke Generator</h1>

      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic"
        style={{ width: "100%", padding: 8 }}
      />

      <button onClick={generateJoke} style={{ marginTop: 12, padding: "8px 16px" }}>
        {loading ? "Generating..." : "Generate Joke"}
      </button>

      {/* Render joke section only when a joke exists. */}
      {joke && (
        <div style={{ marginTop: 24, padding: 12, border: "1px solid #ddd" }}>
          <strong>Joke:</strong>
          <p>{joke}</p>
        </div>
      )}
    </div>
  );
}

export default App;