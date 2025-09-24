import * as THREE from "three";
import { bftColors, rowCounts} from './constants.js';
import { createGUI, PARAMS } from './gui.js';
import { bowTop, sternSbTop, sternPtTop, createWireframeHull } from './hullShape.js';

export function createSailGeometry(parentGroup) {
  // Geometry setup
  const sailVertices = [];
  const sailIndices = [];
  
  // Generate sailVertices
  let yPos = 0;
  for (let i = 0; i < rowCounts.length; i++) {
    const rowWidth = rowCounts[i];
    for (let z = 0; z < rowWidth; z++) {
      sailVertices.push(0.0, yPos, z);
    }
    yPos += 1;
  }
  
  // Generate sailIndices
  let vertexOffset = 0;
  for (let i = 0; i < rowCounts.length - 1; i++) {
    const currentRow = rowCounts[i];
    const nextRow = rowCounts[i + 1];
    for (let j = 0; j < Math.min(currentRow, nextRow) - 1; j++) {
      // Triangles between current and next row
      const currentVertex = vertexOffset + j;
      const nextRowVertex = vertexOffset + currentRow + j;
      // Triangle 1
      sailIndices.push(currentVertex, currentVertex + 1, nextRowVertex);
      // Triangle 2
      sailIndices.push(currentVertex + 1, nextRowVertex, nextRowVertex + 1);
    }
    vertexOffset += currentRow;
  }

  // Function to calculate Bézier curve displacement for sailVertices
function bezierDisplacement(t, p0, p1, p2) {
  // Bézier quadratic formula: B(t) = (1-t)² * p0 + 2*(1-t)*t*p1 + t²*p2
  return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
}

// Function to update geometry sailVertices along a Bézier curve
function updateGeometrysailVertices(bft) {
  const positions = sailGeometry.attributes.position.array;

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
  const scaleFactor = bft / bftMax * 0.31;

  for (let i = 0; i < positions.length; i += 3) {
    const y = positions[i + 1];
    const z = positions[i + 2];

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

  const sailGeometry = new THREE.BufferGeometry();
  sailGeometry.setAttribute("position", new THREE.Float32BufferAttribute(sailVertices, 3));
  sailGeometry.setIndex(sailIndices);
  let originalPositions = Float32Array.from(sailGeometry.attributes.position.array); // Initialize original positions
  // Optional for smooth shading
  // sailGeometry.computeVertexNormals();

  // Material and lighting
  const sailMat = new THREE.MeshBasicMaterial({
  color: bftColors[PARAMS.bft], // Initial color based on bft
  wireframe: true
  // make texture appear. facets are now visible
  // flatShading: false
  });

  // Mesh and render
  const sailMesh = new THREE.Mesh(sailGeometry, sailMat);
  parentGroup.add(sailMesh);

  // Align sail on the y-coordinate with the hull
  const sailSmallestY = 0; // Smallest y-value of sailVertices
  const hullHighestY = Math.max(bowTop.y, sternSbTop.y, sternPtTop.y); // Highest y-value of the hull (-5)
  const yOffset = hullHighestY - sailSmallestY;
  sailMesh.position.y = yOffset + 2.5;

  return { sailGeometry, sailMesh, originalPositions };
}