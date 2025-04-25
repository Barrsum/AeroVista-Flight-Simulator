/*
 * Placeholder Airplane Model - REPLACE THIS FILE'S CONTENT
 * =======================================================
 * This component uses basic shapes as a placeholder because
 * encountered issues running gltfjsx.
 *
 * TO FIX:
 * 1. Resolve the error with `npx gltfjsx ./public/models/your_model.glb ...`
 *    - Check the path to your model file is correct.
 *    - Make sure the .glb file is not corrupted.
 *    - Try the online converter: https://gltf.pmnd.rs/
 * 2. Once you have the generated React component code, DELETE
 *    the content of this file and PASTE the generated code here.
 * 3. Adjust the `scale` prop passed to `<AirplaneModel>` in
 *    `PlaneController.jsx` to match your actual model's size.
 */
import React, { useRef } from 'react';
import { Box, Cone } from '@react-three/drei';

export function AirplaneModel(props) {
  // Using basic shapes to create a placeholder visual
  return (
    <group {...props} dispose={null}>
      {/* Fuselage */}
      <Box args={[1.5, 0.4, 0.5]} position={[0, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="silver" roughness={0.5} metalness={0.6} />
      </Box>

      {/* Wings */}
      <Box args={[0.2, 0.1, 2.5]} position={[0, 0.1, 0]} castShadow receiveShadow>
         <meshStandardMaterial color="darkred" roughness={0.6} metalness={0.2} />
      </Box>

      {/* Tail Fin (Vertical) */}
       <Box args={[0.4, 0.5, 0.1]} position={[-0.7, 0.25, 0]} rotation={[0, 0, -Math.PI / 20]} castShadow receiveShadow>
         <meshStandardMaterial color="darkred" roughness={0.6} metalness={0.2} />
      </Box>

       {/* Tail Wings (Horizontal) */}
        <Box args={[0.15, 0.08, 0.8]} position={[-0.7, 0.05, 0]} castShadow receiveShadow>
           <meshStandardMaterial color="darkred" roughness={0.6} metalness={0.2} />
        </Box>

      {/* Cockpit */}
       <Box args={[0.4, 0.3, 0.4]} position={[0.5, 0.15, 0]} castShadow>
          <meshStandardMaterial color="lightblue" roughness={0.2} metalness={0.1} transparent opacity={0.7} />
       </Box>

       {/* Propeller (Simple Cone) */}
        <Cone args={[0.1, 0.3, 8]} position={[0.8, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
           <meshStandardMaterial color="gray" />
        </Cone>

    </group>
  )
}

// Note: Since this is a placeholder, it doesn't use useGLTF or preload.
// The real gltfjsx component *will* use useGLTF.preload('/path/to/your/model.glb')

export default AirplaneModel; // Provide a default export

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos