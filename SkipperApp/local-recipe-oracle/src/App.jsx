import { useState, useEffect } from "react";
import "./App.css";
import { Prompts, channelStyle } from "./Constants";
// import Snail from "./Snail";
import Tiki from "./Tiki";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;


function App() {
  const [location, setLocation] = useState("");
  const [mealType, setMealType] = useState("");
  const [testMode, setTestMode] = useState(true);
  const [output, setOutput] = useState(null);

  // pick random narrator + meal if not provided
  function buildPrompt() {
    const narrator =
      channelStyle[Math.floor(Math.random() * channelStyle.length)];
    const pickedMeal = mealType || ["breakfast", "lunch", "dinner", "drink"][
      Math.floor(Math.random() * 4)
    ];

    let prompt = Prompts.get("Food").P1[0]
      .replace(/\${narrator}/g, narrator)
      .replace(/\${location}/g, location || "Korfu")
      .replace(/\${mealType}/g, pickedMeal);

    if (testMode) {
      prompt = prompt.replace(/Return JSON[\s\S]*/i, "").trim();
    }

    return prompt;
  }

  async function handleSearch(e) {
    e.preventDefault();
    const prompt = buildPrompt();

    if (testMode) {
      // strip the JSON return instruction
      setOutput({ prompt });
      return;
    }

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await res.json();
      setOutput(data.choices[0].message);
    } catch (err) {
      console.error(err);
      setOutput({ error: "Something went wrong with API call." });
    }
  }

  // === Background animation (no microphone, just random colors) ===
  useEffect(() => {
    const canvas = document.getElementById("canvas1");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Bar {
      constructor(x, y, width, height, index) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.index = index;
        this.color = this.randomColor();
      }
      randomColor() {
        return `hsl(${Math.random() * 360}, 100%, 50%)`;
      }
      update() {
        // flicker color occasionally
        if (Math.random() < 0.05) {
          this.color = this.randomColor();
        }
        // wiggle height randomly
        this.height = 50 + Math.sin(Date.now() / 500 + this.index) * 30;
      }
      draw(context) {
        context.strokeStyle = this.color;
        context.lineWidth = this.width;
        context.save();
        context.rotate(this.index * 0.05);
        context.beginPath();
        context.bezierCurveTo(
          this.x / 2,
          this.y / 2,
          -100,
          this.height + 50,
          this.x,
          this.y
        );
        context.stroke();
        context.restore();
      }
    }

    let bars = [];
    let fftSize = 128; // fewer bars than before
    function createBars() {
      for (let i = 1; i < fftSize; i++) {
        bars.push(new Bar(10, i * 2, 1, 50, i));
      }
    }
    createBars();

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      bars.forEach((bar) => {
        bar.update();
        bar.draw(ctx);
      });
      ctx.restore();
      requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }, []);

  return (
    <div className="app">
      {/* Rainbow Tiki back ound */}
      <Tiki />

      {/* Overlay content */}
      <div className="content">
        <h1>🌺 Tiki Recipe Oracle</h1>
        <form onSubmit={handleSearch} className="search-box">
          <input
            type="text"
            placeholder="Enter a town or village..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
          >
            <option value="">(Random)</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="drink">Drink</option>
          </select>
          <button type="submit">Tell me!</button>
        </form>

        <label className="testmode-toggle">
          <input
            type="checkbox"
            checked={testMode}
            onChange={() => setTestMode(!testMode)}
          />
          Test Mode
        </label>

        {output && (
          <div className="result">
            {output.prompt && (
              <>
                <h3>🧪 Test Mode Output</h3>
                <pre>{output.prompt}</pre>
              </>
            )}
            {output.content && (
              <>
                <h3>✨ AI Result</h3>
                <p>{output.content}</p>
              </>
            )}
            {output.error && <p style={{ color: "red" }}>{output.error}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;