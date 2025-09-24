
import { bftColors, rowCounts } from './constants.js';

// Function to update geometry sailVertices along a Bézier curve
export function updateGeometrysailVertices(bft, sailGeometry, originalPositions) {
    
    const positions = sailGeometry.attributes.position.array;

    // Reset positions to original positions
    for (let i = 0; i < positions.length; i++) {
      positions[i] = originalPositions[i];
    }
  
    const xMax = Math.max(...rowCounts) / 4;
    const zMax = Math.max(...rowCounts) / 4;
    const yMax = rowCounts.length;
  
    // Bézier control points for the displacement
    // Starting point (unchanged)
    const p0 = { x: -xMax * 3, y: 0, z: -zMax * 2 };
    // Upper control point
    const p1 = { x: -xMax * 3, y: 0, z: -zMax * 2};
    // Lower control point
    const p2 = { x: -xMax / 1, y: yMax / 2, z: -zMax / 3 };
  
    const bftMax = 15;
    const scaleFactor = bft / bftMax * 0.3;
  
    for (let i = 0; i < positions.length; i += 3) {
      // const y = positions[i + 1];
      // const z = positions[i + 2];
      const y = originalPositions[i + 1];
      const z = originalPositions[i + 2];
  
      const t = 1 - y / yMax;
      // Scale the z-factor to lift lower part of the sail more than upper
      const zFactor = z / zMax;
  
      // Calculate Bézier displacements
      const displacementX = Math.min(
        bezierDisplacement(t, p0.x, p1.x, p2.x) * zFactor * scaleFactor,
        xMax
      );
      const displacementY = Math.min(
        bezierDisplacement(t, p0.y, p1.y, p2.y) * zFactor * scaleFactor,
        yMax
      );
      const displacementZ = Math.min(
        bezierDisplacement(t, p0.z, p1.z, p2.z) * zFactor * scaleFactor,
        zMax
      );
  
      // Apply displacements to vertex
      positions[i] += displacementX;
      positions[i + 1] += displacementY;
      positions[i + 2] += displacementZ;
    }
  
    // Inform Three.js that sailVertices have been updated
    sailGeometry.attributes.position.needsUpdate = true;
}

export function applyWindForce(rigidBodies, bft) {
  const windStrength = bft / 15.0; // Normalize Beaufort scale
  const windForce = new RAPIER.Vector3(windStrength * 5, 0, windStrength * 3);

}

// Function to update sailMesh material color based on bft
export function updateSailColor(bft, sailMesh) {
  const color = bftColors[bft] || 'hsl(0, 0%, 50%)'; // Default to grey if no match
  sailMesh.material.color.set(color);
}

// Function to calculate Bézier curve displacement for sailVertices
export function bezierDisplacement(t, p0, p1, p2) {
    // Bézier quadratic formula: B(t) = (1-t)² * p0 + 2*(1-t)*t*p1 + t²*p2
    return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
}
