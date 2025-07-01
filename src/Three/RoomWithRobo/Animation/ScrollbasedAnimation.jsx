import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useCurrentSheet } from "@theatre/r3f";
import { val } from "@theatre/core";

// Smooth easing function
const easeOutCubic = (x) => {
  return 1 - Math.pow(1 - x, 3);
};

const easeInOutQuad = (x) => {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
};

function ScrollbasedAnimation({ project }) {
  const sheet = useCurrentSheet();
  const scrollRef = useRef({
    current: 0,
    target: 0,
    velocity: 0,
    lastScrollTime: 0,
  });
  const [introPlayed, setIntroPlayed] = useState(false);
  const [projectReady, setProjectReady] = useState(false);
  const totalDuration = val(sheet.sequence.pointer.length);
  const INTRO_DURATION = 4; // Duration of intro animation
  const INTRO_ANIMATION_DURATION = 2.5; // Duration in seconds for the intro animation

  // Wait for project to be ready
  useEffect(() => {
    if (!project) return;

    project.ready.then(() => {
      setProjectReady(true);
    });
  }, [project]);

  // Handle intro animation after project is ready
  useEffect(() => {
    if (!sheet || !projectReady || introPlayed) return;

    let startTime = null;
    let animationFrame = null;

    const animateIntro = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000; // Convert to seconds
      const progress = Math.min(elapsed / INTRO_ANIMATION_DURATION, 1);
      
      // Apply easing to make the animation smooth
      const easedProgress = easeInOutQuad(progress);
      const currentPosition = easedProgress * INTRO_DURATION;
      
      sheet.sequence.position = currentPosition;
      scrollRef.current.current = currentPosition;
      scrollRef.current.target = currentPosition;

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animateIntro);
      } else {
        setIntroPlayed(true);
      }
    };

    // Add a small delay before starting the intro animation
    setTimeout(() => {
      animationFrame = requestAnimationFrame(animateIntro);
    }, 500);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [sheet, projectReady, introPlayed]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (!introPlayed || !projectReady) return;

      e.preventDefault();
      const scrollSpeed = 0.0008;
      const deltaY = e.deltaY * scrollSpeed;
      
      const newTarget = Math.max(
        INTRO_DURATION,
        Math.min(totalDuration, scrollRef.current.target + deltaY)
      );
      
      scrollRef.current.target = newTarget;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [totalDuration, introPlayed, projectReady]);

  useFrame((state, delta) => {
    if (!sheet || !projectReady || !introPlayed) return;

    const { current, target } = scrollRef.current;
    const distance = target - current;
    const smoothness = 0.075;
    
    scrollRef.current.current += distance * smoothness;
    
    scrollRef.current.current = Math.max(
      INTRO_DURATION,
      Math.min(totalDuration, scrollRef.current.current)
    );
    
    sheet.sequence.position = scrollRef.current.current;
  });

  return null;
}

export default ScrollbasedAnimation;
