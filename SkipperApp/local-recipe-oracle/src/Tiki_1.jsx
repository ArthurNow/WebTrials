export default function Tiki() {
  return (
    <svg id="tiki" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300">
      <defs>
        <style>
          {`
            .cls-1 {
              fill: none;
              stroke: url(#gradient);
              stroke-width: 4;
            }
          `}
        </style>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="red" />
          <stop offset="50%" stopColor="orange" />
          <stop offset="100%" stopColor="yellow" />
        </linearGradient>
      </defs>

      {/* tiki head outline */}
	    <path
        className="cls-1"
        d="M50 20 Q100 0 150 20 L150 280 Q100 300 50 280 Z"
      />
      {/* eyes */}
      <path className="cls-1" d="M70 100 Q100 80 130 100" />
      <path className="cls-1" d="M70 130 Q100 110 130 130" />
      {/* mouth */}
      <path className="cls-1" d="M70 200 Q100 240 130 200" />
    </svg>
  );
}



// Great question 🚀

// That `<path d="..."/>` in your snail is just an **SVG path string**. You can get a *tiki mask path* in a few ways:

// ---

// ### 🔹 1. Download ready-made SVG tiki masks

// * Search **“Tiki mask SVG”** on sites like:

//   * [Freepik](https://www.freepik.com/search?query=tiki%20mask&format=search&type=vector)
//   * [Vecteezy](https://www.vecteezy.com/)
//   * [SVG Repo](https://www.svgrepo.com/)
//   * [OpenClipart](https://openclipart.org/)
// * Download a free SVG file, open it in a text editor, and copy the `<path d="..."/>` elements into your `Tiki.jsx`.

//   * You may see multiple `<path>` entries (eyes, mouth, etc.). That’s fine – just keep them inside your `<svg>`.

// ---

// ### 🔹 2. Convert a PNG/JPG tiki mask into SVG paths

// If you have a picture of a tiki mask:

// **Option A: Inkscape (free, desktop)**

// 1. Open the image in [Inkscape](https://inkscape.org/).
// 2. Menu: **Path → Trace Bitmap**.
// 3. Delete the original bitmap, keep the vectorized version.
// 4. Save as `.svg`.
// 5. Open the file with a text editor → you’ll see `<path d="..."/>`. Copy into your React component.

// **Option B: Online Vectorizers**

// * [Vectorizer.ai](https://vectorizer.ai/) – AI-based, best quality.
// * [Convertio](https://convertio.co/jpg-svg/) – quick JPG → SVG.
// * [Vector Magic](https://vectormagic.com/) – paid but very good.

// ---

// ### 🔹 3. Draw your own tiki mask as paths

// If you want a **simple stylized tiki** (like logo art), you can even hand-craft it:

// * Use [Figma](https://www.figma.com/) or [Boxy SVG Editor](https://boxy-svg.com/).
// * Draw basic tiki mask features with the **pen tool**.
// * Export → Copy SVG path code → paste into your React component.

// ---

// ### 🔹 4. Quick Example (placeholder tiki path)

// Here’s a minimal example – not a real tiki, but shows how it would look:

// ```jsx
// export default function Tiki() {
//   return (
//     <svg id="tiki" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300">
//       <defs>
//         <style>
//           {`
//             .cls-1 {
//               fill: none;
//               stroke: url(#gradient);
//               stroke-width: 4;
//             }
//           `}
//         </style>
//         <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
//           <stop offset="0%" stopColor="red" />
//           <stop offset="50%" stopColor="orange" />
//           <stop offset="100%" stopColor="yellow" />
//         </linearGradient>
//       </defs>

//       {/* tiki head outline */}
//       <path
//         className="cls-1"
//         d="M50 20 Q100 0 150 20 L150 280 Q100 300 50 280 Z"
//       />
//       {/* eyes */}
//       <path className="cls-1" d="M70 100 Q100 80 130 100" />
//       <path className="cls-1" d="M70 130 Q100 110 130 130" />
//       {/* mouth */}
//       <path className="cls-1" d="M70 200 Q100 240 130 200" />
//     </svg>
//   );
// }
// ```

// This would give you a **tiki-like face with gradient strokes**, and you can later replace the `<path>` data with real tiki mask outlines.

// ---

// 👉 Do you want me to find and prepare a **ready-to-use tiki SVG file** for you, so you can just drop it in as `Tiki.jsx`?
