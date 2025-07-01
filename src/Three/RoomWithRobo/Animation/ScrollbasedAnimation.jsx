import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useCurrentSheet } from "@theatre/r3f";
import { val } from "@theatre/core";

function ScrollbasedAnimation({ project }) {
  const sheet = useCurrentSheet();
  const scrollRef = useRef({
    current: 0,
    target: 0,
    velocity: 0,
    lastScrollTime: 0,
  });
  const totalDuration = val(sheet.sequence.pointer.length);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      const scrollSpeed = 0.0008; // Reduced scroll sensitivity for more control
      const deltaY = e.deltaY * scrollSpeed;
      
      // Update target position based on scroll direction with smoother acceleration
      const newTarget = Math.max(
        0,
        Math.min(totalDuration, scrollRef.current.target + deltaY)
      );
      
      scrollRef.current.target = newTarget;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [totalDuration]);

  useFrame((state, delta) => {
    if (!sheet) return;

    const { current, target } = scrollRef.current;
    
    // Calculate distance to target
    const distance = target - current;
    
    // Use lerp (linear interpolation) instead of spring physics for smoother movement
    const smoothness = 0.075; // Adjust this value for smoothness (lower = smoother)
    
    // Update current position with lerp
    scrollRef.current.current += distance * smoothness;
    
    // Clamp position between 0 and total duration
    scrollRef.current.current = Math.max(
      0,
      Math.min(totalDuration, scrollRef.current.current)
    );
    
    // Apply to theatre.js sequence
    sheet.sequence.position = scrollRef.current.current;
  });

  return null;
}

export default ScrollbasedAnimation;
