import * as THREE from "three";

const bowX = 0;
const bowY = -5;
const bowZ = -7;

const sternX = 0;
const sternY = -5;
const sternZ = 15;

// hullshape: Define vertex positions as constants
export const bowTop = { x: bowX, y: bowY, z: bowZ };
export const bowBottom = { x: bowX - 1, y: bowY - 5, z: bowZ - 1 };

export const sternSbTop = { x: sternX + 5, y: sternY, z: sternZ };
export const sternSbBottom = { x: sternX + 4.5, y: sternY - 1, z: sternZ };

export const sternPtTop = { x: sternX - 5, y: sternY, z: sternZ };
export const sternPtBottom = { x: sternX - 4.5, y: sternY - 1, z: sternZ };

// Function to scale vertices dynamically
function scaleVertex(vertex, scale) {
  return {
    x: vertex.x * scale,
    y: vertex.y * scale,
    z: vertex.z * scale,
  };
}

// Function to create the hull wireframe
export function createWireframeHull(parentGroup) {
  // Scale factor
  const scale = 0.41; 

  // Scale vertices
  const scaledBowTop = scaleVertex(bowTop, scale);
  const scaledBowBottom = scaleVertex(bowBottom, scale);
  const scaledSternSbTop = scaleVertex(sternSbTop, scale);
  const scaledSternSbBottom = scaleVertex(sternSbBottom, scale);
  const scaledSternPtTop = scaleVertex(sternPtTop, scale);
  const scaledSternPtBottom = scaleVertex(sternPtBottom, scale);

  // scaled Vertices for the hull
  const vertices = new Float32Array([
    // vertex 0
    scaledBowTop.x, scaledBowTop.y, scaledBowTop.z,
    // vertex 1
    scaledBowBottom.x, scaledBowBottom.y, scaledBowBottom.z,
    // vertex 2
    scaledSternSbTop.x, scaledSternSbTop.y, scaledSternSbTop.z,
    // vertex 3
    scaledSternSbBottom.x, scaledSternSbBottom.y, scaledSternSbBottom.z,
    // vertex 4
    scaledSternPtTop.x, scaledSternPtTop.y, scaledSternPtTop.z,
    // vertex 5
    scaledSternPtBottom.x, scaledSternPtBottom.y, scaledSternPtBottom.z,
  ]);

// Indices for the wireframe. which vertex-numbers to connect for creating the buffergeometry-triangles
const vertexScaledBowTop = 0
const vertexScaledBowBottom = 1
const vertexScaledSternSbTop = 2
const vertexScaledSternSbBottom = 3
const vertexScaledSternPtTop = 4
const vertexScaledSternPtBottom = 5

// Indices for the wireframe
  const indices = [
    // Portside
        // Front
        vertexScaledBowTop, 
        vertexScaledBowBottom, 
        vertexScaledSternPtTop, 
        // Front (upper line)
        vertexScaledSternPtTop, 
        vertexScaledSternPtBottom, 
        vertexScaledBowBottom, 
    // Starboardside
        // Front
        vertexScaledBowTop, 
        vertexScaledBowBottom, 
        vertexScaledSternSbTop, 
        // Back
        vertexScaledSternSbTop, 
        vertexScaledSternSbBottom, 
        vertexScaledBowBottom, 
    // Top
    vertexScaledBowTop, 
    vertexScaledSternPtTop, 
    vertexScaledSternSbTop,
    // Bottom
    vertexScaledBowBottom, 
    vertexScaledSternPtBottom, 
    vertexScaledSternSbBottom,
    // Stern
    vertexScaledSternPtTop, 
    vertexScaledSternPtBottom, 
    vertexScaledSternSbBottom,

    vertexScaledSternSbBottom, 
    vertexScaledSternSbTop, 
    vertexScaledSternPtTop,
  ];

  // Color array
  const colors = new Float32Array(vertices.length);

  // Assign colors: green for starboard (x > 0), red for port (x < 0)
  for (let i = 0; i < vertices.length; i += 3) {
    if (vertices[i] > 0) {
      // Starboard: green
      colors.set([0, 1, 0], i);
    } else {
      // Port: red
      colors.set([1, 0, 0], i);
    }
  }

  // Create BufferGeometry
  const hullGeometry = new THREE.BufferGeometry();
  hullGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  hullGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  hullGeometry.setIndex(indices);

  // Create a LineSegments material with vertex colors
  const material = new THREE.LineBasicMaterial({
    vertexColors: true,
  });

  // Create the wireframe
  const hullWireframe = new THREE.LineSegments(hullGeometry, material);

  // Create the hull wireframe
  parentGroup.add(hullWireframe);
}


export function getBackstayAnchorPoint() {
  const sternXMiddle = sternSbBottom.x + sternPtBottom.x
  return {x: sternXMiddle, y: sternY-1, z: sternZ }
}