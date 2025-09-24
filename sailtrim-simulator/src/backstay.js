import * as THREE from "three";
import { bezierDisplacement } from "./bft.js"; // Reuse the bezier displacement logic if needed
import { PARAMS } from "./gui.js"; // Access the backstay slider

// Function to create and manage the backstay
export function createBackstay(sailGeometry, parentGroup) {
  // Find the uppermost-frontal vertex (smallest z-value, largest y-value)
  const positions = sailGeometry.attributes.position.array;
  let topVertexIndex = 0;
  let minZ = Infinity;
  let maxY = -Infinity;

  for (let i = 0; i < positions.length; i += 3) {
    const y = positions[i + 1];
    const z = positions[i + 2];

    if (z < minZ || (z === minZ && y > maxY)) {
      minZ = z;
      maxY = y;
      topVertexIndex = i;
    }
  }

  const topVertex = new THREE.Vector3(
    positions[topVertexIndex],
    positions[topVertexIndex + 1],
    positions[topVertexIndex + 2]
  );

  backstayAnchorPoint = getBackstayAnchorPoint()

  // Create the backstay line geometry
  const lineGeometry = new THREE.BufferGeometry();
  const lineVertices = new Float32Array([
    // Start point: Bottom-front vertex (lowest x, y, z)
    positions[0],
    positions[1],
    positions[2],
    // End point: Top-front vertex
    backstayAnchorPoint.x,
    backstayAnchorPoint.y,
    backstayAnchorPoint.z,
  ]);

  lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(lineVertices, 3));

  // Material for the backstay
  const lineMaterial = new THREE.LineBasicMaterial({
    color: new THREE.Color(0xff1493), // Pink
    transparent: false,
    // opacity: 0.5, // Dim by default
    opacity: 1, // Dim by default
  });

  const backstayLine = new THREE.Line(lineGeometry, lineMaterial);
  parentGroup.add(backstayLine);

  // ////
  // // Create a bright pink line
  // const points = [
  // new THREE.Vector3(-5, 0, 0), // Start point
  // new THREE.Vector3(5, 0, 0)   // End point
  // ];

  // const geometry = new THREE.BufferGeometry().setFromPoints(points);
  // const material = new THREE.LineBasicMaterial({
  // color: 0xff1493, // Bright pink
  // linewidth: 4 // NOTE: Line width works only in WebGL2
  // });

  // const line = new THREE.Line(geometry, material);
  // scene.add(line);
  // renderer.render(scene, camera);
  // ////
}

// // Function to create and manage the backstay
// export function createBackstay(sailGeometry, scene) {
//     // Find the uppermost-frontal vertex (smallest z-value, largest y-value)
//     const positions = sailGeometry.attributes.position.array;
//     let topVertexIndex = 0;
//     let minZ = Infinity;
//     let maxY = -Infinity;
  
//     for (let i = 0; i < positions.length; i += 3) {
//       const y = positions[i + 1];
//       const z = positions[i + 2];
  
//       if (z < minZ || (z === minZ && y > maxY)) {
//         minZ = z;
//         maxY = y;
//         topVertexIndex = i;
//       }
//     }
  
//     const topVertex = new THREE.Vector3(
//       positions[topVertexIndex],
//       positions[topVertexIndex + 1],
//       positions[topVertexIndex + 2]
//     );
  
//     // Create the backstay line geometry
//     const lineGeometry = new THREE.BufferGeometry();
//     const lineVertices = new Float32Array([
//       // Start point: Bottom-front vertex (lowest x, y, z)
//       positions[0],
//       positions[1],
//       positions[2],
//       // End point: Top-front vertex
//       topVertex.x,
//       topVertex.y,
//       topVertex.z,
//     ]);
//     lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(lineVertices, 3));
  
//     // Material for the backstay
//     const lineMaterial = new THREE.LineBasicMaterial({
//       color: new THREE.Color(0xff1493), // Pink
//       transparent: true,
//       opacity: 0.5, // Dim by default
//     });
  
//     const backstayLine = new THREE.Line(lineGeometry, lineMaterial);
//     scene.add(backstayLine);
  
//     // Function to update the backstay and the sail geometry based on slider
//     function updateBackstay(backstayValue) {
//       // Highlight the backstay when the slider is active
//       lineMaterial.opacity = backstayValue > 0 ? 1.0 : 0.5;
  
//       const positions = sailGeometry.attributes.position.array;
//       const originalPositions = Float32Array.from(positions); // Use original positions for reset
  
//       const xMin = Math.min(...positions.filter((_, idx) => idx % 3 === 0));
//       const zLength = Math.max(...positions.filter((_, idx) => idx % 3 === 2)) - Math.min(...positions.filter((_, idx) => idx % 3 === 2));
//       const yMax = Math.max(...positions.filter((_, idx) => idx % 3 === 1));
  
//       const p0 = { x: xMin, y: 0, z: Math.min(...positions.filter((_, idx) => idx % 3 === 2)) };
//       const p2 = { x: xMin, y: yMax, z: Math.min(...positions.filter((_, idx) => idx % 3 === 2)) };
//       const p1 = { x: xMin, y: yMax * 0.15, z: p0.z - zLength * 0.15 * backstayValue };
  
//       for (let i = 0; i < positions.length; i += 3) {
//         const y = originalPositions[i + 1];
//         const z = originalPositions[i + 2];
  
//         const t = y / yMax;
//         const zFactor = z / zLength;
  
//         const displacementX = bezierDisplacement(t, p0.x, p1.x, p2.x);
//         const displacementZ = bezierDisplacement(t, p0.z, p1.z, p2.z) * backstayValue;
  
//         positions[i] += displacementX;
//         positions[i + 2] += displacementZ;
  
//         // Stretch lower part, bend upper part
//         if (y < yMax / 3) {
//           positions[i + 1] += y * backstayValue;
//         } else {
//           positions[i] -= zFactor * displacementZ;
//         }
//       }
  
//       // Notify Three.js about the geometry update
//       sailGeometry.attributes.position.needsUpdate = true;
//     }
  
//     // Add an event listener for the slider
//     PARAMS.backstay = 0; // Initialize the slider parameter
//     window.addEventListener("mousemove", () => {
//       if (PARAMS.backstay > 0) {
//         updateBackstay(PARAMS.backstay);
//       }
//     });
  
//     return backstayLine;
//   }
// I am creating a trim-siimulator-for sailing that should also be pleasant to look at:

// The setup is 

// index.html

// script.js:
// A file that sets up a Threejs-Project that animates a sailboat in 3D.
// It contains various sliders that enable the user to manipulate the geometry and see the effects on the boat or the shape of the sail.

// GUI.js:
// A file that contains the code for the tweakpane-Controls. 

// Constants.js:
// A file, that contains constants like arrays with color-values, etc.

// SailShape.js:
// A file, that initializes the shape of the sailgeometry.
// Idea is to have it very adjustable, so that the shape can be scaled up or easily changed later on.

// HullShape.js:
// Similar to the sailshape the hull of the sailboat is initialized here.
// The hull and the sail, as well as other elements are added to a group, so that they can be manipulated as a unit later on.

// Bft.js:
// A file, that contains the code for the effect of an increasing windstrength on the system.The higher the bft-slider goess the more distorted the sailshape should be (increasingly distorted at the top). The sail should change colors and later on the boat (the group of geometries) should be rotated along the z-axis, that is at the center of the xy-plane of the lowest point (smalles y-value) of the hullshape-geometry. 

// Backstay.js:
// please add code for this functionality:

// The backstay is a linegeometry, that starts at the uppermost-frontal vertex of sailVertices (the one with the smallest z-value and the largest y-value).

// The backstay-linegeometry should have a pink color, that is very dim (alpha 0.5 or similar) and it should light up (higher alpha value), when the mouse hovers or maipulates the slider "pane.addBinding(PARAMS, 'backstay', { min: 0, max: 1, step: 0.1 });", that is defined in the GUI.js-file.

// Similar to the "updateGeometrysailVertices"-function in the Bft.js-file, the effect of the backstay-slider should manipulate the vertices in the sailGeometry:

// The higher the backstay-value is, the more bent should the front of the sailGeometry become. (The bending would be a bezier-curve, that starts at sailGeometry's lowest x-value,lowest y-value, lowest z-value and endss at sailGeometry's lowest x-value, highest y-value, lowest z-value). It should look like a bezier KnotCurve, where the lower controlpoint (p1) moves 15 percent of sailgeometries length (z-axis-length) to the front (into a negative z-value). The sailGeometry should be stretched in the lower third and compressed at the top. Meaning the spacing between sailGeometry-vertices with lower y-values should increase and for vertices with with the highest y values it -in theory- would decrease -But since a sail can only be stretched becond its original shape but not compressed- the sailGeometry-vertices, at the top that got a positive z-coefficient, should also increse the displacement of the x-vertices in their row by that coefficients value. The vertices with the highest z-value in the row should be displaced along the negative x direction by the full amount of the z-coefficient. The vertices with lower z-values with proportially lower fractions of that z-coefficient, that would bent the sailshape to the back.