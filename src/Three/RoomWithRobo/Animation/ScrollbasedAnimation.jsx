import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useCurrentSheet } from "@theatre/r3f";
import {val} from "@theatre/core"

function ScrollbasedAnimation({ project }) {
  const sheet = useCurrentSheet();
  const animationRef = useRef({ velocity: 0, targetPosition: 0 });
  const totalDuration = val(sheet.sequence.pointer.length)
  console.log(totalDuration)
  
  useEffect(() => {
    if (sheet) {
      animationRef.current.targetPosition = sheet.sequence.position;
    }
  }, [sheet]);

  useFrame((state, delta) => {
    if (!sheet) return;
    
    // Smooth interpolation with easing
    const currentPos = sheet.sequence.position;
    const targetPos = animationRef.current.targetPosition;
    const distance = targetPos - currentPos;
    
    // Apply smooth easing (adjust 0.05 for different smoothness)
    const easing = 0.05;
    const newPosition = currentPos + distance * easing;
    
    // Add subtle velocity for smoother motion
    animationRef.current.velocity = (newPosition - currentPos) * 0.1;
    
    sheet.sequence.position = newPosition + animationRef.current.velocity;
    
    // Update target position for continuous animation
    animationRef.current.targetPosition += delta * 0.3;
  });
  
  return null;
}

export default ScrollbasedAnimation;
