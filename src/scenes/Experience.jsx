// src/scenes/Experience.jsx
import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky, Text, Box, Environment } from '@react-three/drei';
import PlaneController from '../components/PlaneController';
import * as THREE from 'three';

// --- Helper Components ---
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial color="#A0522D" roughness={0.9} metalness={0.1} />
    </mesh>
  );
}

function Building({ position, size, color }) {
  return (
    <Box position={position} args={size} castShadow receiveShadow>
      <meshStandardMaterial color={color} roughness={0.7} metalness={0.3} />
    </Box>
  );
}

function CityScape() {
  const buildings = useMemo(() => {
    const city = [];
    const buildingCount = 150;
    const cityRadiusMin = 25;
    const cityRadiusMax = 250;
    const minHeight = 8;
    const maxHeight = 40;
    const minWidthDepth = 4;
    const maxWidthDepth = 12;
    for (let i = 0; i < buildingCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = cityRadiusMin + Math.random() * (cityRadiusMax - cityRadiusMin);
      const x = Math.cos(angle) * distance;
      const z = Math.sin(angle) * distance;
      const height = minHeight + Math.random() * (maxHeight - minHeight);
      const width = minWidthDepth + Math.random() * (maxWidthDepth - minWidthDepth);
      const depth = minWidthDepth + Math.random() * (maxWidthDepth - minWidthDepth);
      const position = [x, height / 2, z];
      const size = [width, height, depth];
      const color = new THREE.Color().setHSL(Math.random(), 0.3, 0.3 + Math.random() * 0.3);
      city.push({ id: i, position, size, color });
    }
    return city;
  }, []);

  return (
    <group>
      {buildings.map(b => (
        <Building key={b.id} position={b.position} size={b.size} color={b.color} />
      ))}
    </group>
  );
}

function Runway() {
    return (
         <Box position={[0, 0.01, 0]} args={[20, 0.1, 200]} receiveShadow>
            <meshStandardMaterial color="#444444" roughness={0.8}/>
         </Box>
    );
}

// --- Main Experience Component ---
// Accept the new props: touchAltitudeUp, touchAltitudeDown
function Experience({ gameState, joystickData, touchAltitudeUp, touchAltitudeDown }) {
  return (
    <Canvas
        shadows
        camera={{ position: [0, 5, 15], fov: 60, near: 0.1, far: 2000 }}
        dpr={[1, 1.5]} // Optional: Device pixel ratio clamping
    >
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[50, 80, 30]}
        intensity={1.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-150}
        shadow-camera-right={150}
        shadow-camera-top={150}
        shadow-camera-bottom={-150}
        shadow-bias={-0.0005}
      />

      {/* Environment & Sky */}
      <Sky sunPosition={[50, 80, 30]} distance={1500} />
      <Environment preset="sunset" background={false} blur={0.5}/>

      {/* Suspense for loading assets */}
      <Suspense fallback={
         <Text position={[0, 1.5, 0]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
           Loading Scene...
         </Text>
      }>
         <Ground />
         <Runway />
         <CityScape />

         {/* Pass the new props to PlaneController */}
         <PlaneController
            gameState={gameState}
            joystickData={joystickData}
            touchAltitudeUp={touchAltitudeUp}
            touchAltitudeDown={touchAltitudeDown}
          />
         {/* Add other elements like trees, roads here */}
      </Suspense>

    </Canvas>
  );
}

export default Experience;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos