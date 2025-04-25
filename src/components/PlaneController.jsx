// src/components/PlaneController.jsx
import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import AirplaneModel from './AirplaneModel';
import * as THREE from 'three';

// --- Control Configuration ---
const CONTROLS = {
    // Keyboard
    KEYBOARD_PITCH_DOWN: 'KeyW',
    KEYBOARD_PITCH_UP: 'KeyS',
    KEYBOARD_YAW_LEFT: 'KeyA',
    KEYBOARD_YAW_RIGHT: 'KeyD',
    KEYBOARD_ROLL_LEFT: 'ArrowLeft',
    KEYBOARD_ROLL_RIGHT: 'ArrowRight',
    KEYBOARD_THROTTLE_UP: 'ArrowUp',
    KEYBOARD_THROTTLE_DOWN: 'ArrowDown',
    KEYBOARD_ALTITUDE_UP: 'Space',
    KEYBOARD_ALTITUDE_DOWN: 'ShiftLeft', // Left Shift
};

// --- Physics/Movement Parameters (ADJUST THESE FOR FEEL) ---
// Increased rates significantly for more prominent joystick effect
const PITCH_RATE = 1.8;          // Increased
const ROLL_RATE = 2.5;           // Increased
const YAW_RATE = 1.0;            // Increased
const ALTITUDE_RATE = 0.8;       // Slightly Increased
const THROTTLE_SENSITIVITY = 0.8; // Increased
const BASE_SPEED = 0.1;          // Increased

// Keep damping low for less resistance, or remove entirely if preferred
// const DAMPING_FACTOR = 0.98; // Higher value = less damping

const CAMERA_DISTANCE = 10;
const CAMERA_HEIGHT = 4;
const CAMERA_LAG = 0.1; // Slightly slower lag might feel smoother with direct controls
const MIN_ALTITUDE = 0.2;

function PlaneController({ gameState, joystickData, touchAltitudeUp, touchAltitudeDown }) {
    const planeRef = useRef();
    const { camera } = useThree();

    // State for keyboard inputs
    const [keyboardInput, setKeyboardInput] = useState({
        pitch: 0, roll: 0, yaw: 0, throttle: 0, altitude: 0,
    });

    // Keep throttle state for smoothing
    const currentThrottle = useRef(0);

    // --- Keyboard Input Handling useEffect ---
     useEffect(() => {
        if (gameState !== 'playing') return; // Only listen when playing

        const keysPressed = new Set();

        const updateInputState = () => {
            setKeyboardInput({
                pitch: (keysPressed.has(CONTROLS.KEYBOARD_PITCH_DOWN) ? -1 : 0) + (keysPressed.has(CONTROLS.KEYBOARD_PITCH_UP) ? 1 : 0),
                roll: (keysPressed.has(CONTROLS.KEYBOARD_ROLL_LEFT) ? 1 : 0) + (keysPressed.has(CONTROLS.KEYBOARD_ROLL_RIGHT) ? -1 : 0),
                yaw: (keysPressed.has(CONTROLS.KEYBOARD_YAW_LEFT) ? 1 : 0) + (keysPressed.has(CONTROLS.KEYBOARD_YAW_RIGHT) ? -1 : 0),
                throttle: (keysPressed.has(CONTROLS.KEYBOARD_THROTTLE_UP) ? 1 : 0) + (keysPressed.has(CONTROLS.KEYBOARD_THROTTLE_DOWN) ? -1 : 0),
                altitude: (keysPressed.has(CONTROLS.KEYBOARD_ALTITUDE_UP) ? 1 : 0) + (keysPressed.has(CONTROLS.KEYBOARD_ALTITUDE_DOWN) ? -1 : 0),
            });
        };

        const handleKeyDown = (event) => {
            // Check if the pressed key is one of our defined controls
            if (Object.values(CONTROLS).includes(event.code)) {
                keysPressed.add(event.code);
                updateInputState();
            }
        };

        const handleKeyUp = (event) => {
             // Check if the released key is one of our defined controls
             if (Object.values(CONTROLS).includes(event.code)) {
                keysPressed.delete(event.code);
                updateInputState();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Cleanup function
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            // Reset input state when effect cleans up
            setKeyboardInput({ pitch: 0, roll: 0, yaw: 0, throttle: 0, altitude: 0 });
        };
    }, [gameState]); // Re-run effect if gameState changes


    // --- Game Loop Update ---
    useFrame((state, delta) => {
        if (!planeRef.current || gameState !== 'playing') {
            // When not playing, maybe reset throttle gradually?
             if(gameState !== 'playing') {
                 currentThrottle.current = Math.max(0, currentThrottle.current - THROTTLE_SENSITIVITY * delta * 0.5);
             }
            return; // Don't update if paused or plane not ready
        }

        const plane = planeRef.current;
        const dt = Math.min(delta, 0.1); // Clamp delta time to prevent large jumps

        // --- Combine Inputs (Joystick + Keyboard + Touch Buttons) ---
        // NOTE: Tune joyThreshold and joyStickNorm based on actual joystick output!
        // Use console.log(joystickData) in App.jsx temporarily to see values.
        const joyThreshold = 10; // Joystick deadzone threshold
        const joyStickNorm = 50; // Normalization factor (e.g., if joystick range is -50 to 50)

        const leftStickActive = joystickData?.left?.active && (Math.abs(joystickData.left.x) > joyThreshold || Math.abs(joystickData.left.y) > joyThreshold);
        const rightStickActive = joystickData?.right?.active && (Math.abs(joystickData.right.x) > joyThreshold || Math.abs(joystickData.right.y) > joyThreshold);

        // --- Determine final input values ---
        // Prioritize active joystick input, otherwise use keyboard
        const finalPitchInput = leftStickActive ? -(joystickData.left.y / joyStickNorm) : keyboardInput.pitch;
        const finalRollInput = leftStickActive ? (joystickData.left.x / joyStickNorm) : keyboardInput.roll;
        const finalYawInput = rightStickActive ? (joystickData.right.x / joyStickNorm) : keyboardInput.yaw;
        // Check throttle direction: does stick UP mean positive Y or negative Y? Adjust sign if needed. Current assumes UP = negative Y = more throttle.
        const finalThrottleInput = rightStickActive ? -(joystickData.right.y / joyStickNorm) : keyboardInput.throttle;

        // Altitude: Prioritize touch buttons, then keyboard
        const touchAltitude = (touchAltitudeUp ? 1 : 0) + (touchAltitudeDown ? -1 : 0);
        const finalAltitudeInput = touchAltitude !== 0 ? touchAltitude : keyboardInput.altitude;


        // --- Apply Physics & Movement ---

        // --- SIMPLIFIED ROTATION APPLICATION ---
        // Directly apply rotation based on the final input values and rates
        plane.rotateX(finalPitchInput * PITCH_RATE * dt); // Pitch
        plane.rotateZ(finalRollInput * ROLL_RATE * dt);  // Roll (Z is typically roll axis in airplane models)
        plane.rotateY(finalYawInput * YAW_RATE * dt);   // Yaw

        // Update Throttle (Keep smoothing for throttle)
        currentThrottle.current += finalThrottleInput * THROTTLE_SENSITIVITY * dt;
        currentThrottle.current = THREE.MathUtils.clamp(currentThrottle.current, 0, 1); // Clamp throttle 0-1

        // Apply Forward Movement (based on smoothed throttle)
        const forwardSpeed = BASE_SPEED * (1 + currentThrottle.current * 1.5); // Make throttle effect more pronounced
        plane.translateZ(forwardSpeed * dt * 60); // dt * 60 for rough speed scaling

        // Apply Altitude Change (Direct)
        plane.position.y += finalAltitudeInput * ALTITUDE_RATE * dt;


        // --- Keep Plane Above Ground ---
        if (plane.position.y < MIN_ALTITUDE) {
            plane.position.y = MIN_ALTITUDE;
            // Optional: Zero out vertical velocity on impact? Could feel abrupt.
        }

        // --- Update Camera ---
        const idealOffset = new THREE.Vector3(0, CAMERA_HEIGHT, -CAMERA_DISTANCE); // Base offset
        idealOffset.applyQuaternion(plane.quaternion); // Rotate offset by plane's orientation
        const idealLookAt = new THREE.Vector3(0, CAMERA_HEIGHT * 0.5, 5); // Look slightly further ahead
        idealLookAt.applyQuaternion(plane.quaternion); // Rotate lookAt point relative to plane

        const cameraTargetPosition = plane.position.clone().add(idealOffset); // Calculate desired camera position
        const lookAtTargetPosition = plane.position.clone().add(idealLookAt); // Calculate desired lookAt position

        // Smoothly interpolate camera position towards the target
        camera.position.lerp(cameraTargetPosition, CAMERA_LAG);
        // Directly look at the interpolated or target position (lerping lookAt can cause jitter)
        state.camera.lookAt(lookAtTargetPosition);

    });

    // --- Render the Plane Model ---
    // The outer group controlled by `planeRef` handles position/rotation based on physics updates
    return (
        <group ref={planeRef} position={[0, 5, 0]} rotation={[0, Math.PI, 0]}>
            {/* Adjust scale/rotation here if the imported model needs it */}
            <AirplaneModel scale={0.015} /> {/* Example Scale - Adjust! */}
        </group>
    );
}

export default PlaneController;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos