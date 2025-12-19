import React, { useEffect, useRef, useCallback } from 'react';
import p5 from 'p5';
import { BallState, SimulationStats } from '../types';
import { COLORS, PHYSICS_DEFAULTS } from '../constants';

interface CollisionCanvasProps {
  isPlaying: boolean;
  m1: number;
  u1: number;
  m2: number;
  u2: number;
  e: number;
  resetTrigger: number;
  onStatsUpdate: (stats: SimulationStats) => void;
}

const CollisionCanvas: React.FC<CollisionCanvasProps> = ({
  isPlaying, m1, u1, m2, u2, e, resetTrigger, onStatsUpdate
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<any>(null);
  
  // Physics states kept in refs for p5 access without re-mounting
  const ballARef = useRef<BallState | null>(null);
  const ballBRef = useRef<BallState | null>(null);
  const statsRef = useRef<SimulationStats>({
    totalMomentum: 0,
    totalKineticEnergy: 0,
    initialMomentum: 0,
    initialKineticEnergy: 0,
    collisionCount: 0,
  });

  const calculatePhysics = useCallback(() => {
    const initP = m1 * u1 + m2 * u2;
    const initEk = 0.5 * m1 * Math.pow(u1, 2) + 0.5 * m2 * Math.pow(u2, 2);
    
    statsRef.current = {
      totalMomentum: initP,
      totalKineticEnergy: initEk,
      initialMomentum: initP,
      initialKineticEnergy: initEk,
      collisionCount: 0,
    };
    onStatsUpdate(statsRef.current);
  }, [m1, u1, m2, u2, onStatsUpdate]);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: any) => {
      p.setup = () => {
        const w = containerRef.current!.clientWidth;
        const h = containerRef.current!.clientHeight;
        p.createCanvas(w, h);
        resetSimulation(p);
      };

      p.windowResized = () => {
        const w = containerRef.current!.clientWidth;
        const h = containerRef.current!.clientHeight;
        p.resizeCanvas(w, h);
      };

      const resetSimulation = (p: any) => {
        const centerY = p.height / 2;
        const centerX = p.width / 2;
        
        // Scale radius slightly based on mass (square root for visual area scaling)
        const getRad = (m: number) => PHYSICS_DEFAULTS.baseRadius * Math.sqrt(m);

        ballARef.current = {
          m: m1,
          u: u1,
          v: u1,
          x: centerX - 200,
          radius: getRad(m1),
          color: COLORS.ballA,
          glowColor: COLORS.ballAGlow,
        };

        ballBRef.current = {
          m: m2,
          u: u2,
          v: u2,
          x: centerX + 200,
          radius: getRad(m2),
          color: COLORS.ballB,
          glowColor: COLORS.ballBGlow,
        };

        calculatePhysics();
      };

      p.draw = () => {
        p.background(2, 6, 23); // bg-slate-950

        // Draw grid
        drawGrid(p);

        if (!ballARef.current || !ballBRef.current) return;

        const a = ballARef.current;
        const b = ballBRef.current;

        // Physics update
        if (isPlaying) {
          // Detect collision (1D)
          const distance = Math.abs(a.x - b.x);
          const minDistance = a.radius + b.radius;

          // If overlapping and moving towards each other
          if (distance <= minDistance && (a.v - b.v) > 0) {
            handleCollision(a, b);
          }

          // Move
          a.x += a.v * (PHYSICS_DEFAULTS.pixelsPerMeter / 60);
          b.x += b.v * (PHYSICS_DEFAULTS.pixelsPerMeter / 60);

          // Wall bounce (optional, but good for keeping objects in view)
          if (a.x < a.radius) a.v = Math.abs(a.v);
          if (b.x > p.width - b.radius) b.v = -Math.abs(b.v);
          
          updateLiveStats();
        }

        // Render objects
        drawBall(p, a);
        drawBall(p, b);
        
        // Render vectors
        drawVector(p, a);
        drawVector(p, b);
      };

      const handleCollision = (a: BallState, b: BallState) => {
        const u1_v = a.v;
        const u2_v = b.v;
        const m1_v = a.m;
        const m2_v = b.m;

        const common = m1_v * u1_v + m2_v * u2_v;
        const diff = u1_v - u2_v;
        
        a.v = (common - e * m2_v * diff) / (m1_v + m2_v);
        b.v = (common + e * m1_v * diff) / (m1_v + m2_v);

        statsRef.current.collisionCount += 1;
      };

      const updateLiveStats = () => {
        const a = ballARef.current!;
        const b = ballBRef.current!;
        const currentP = a.m * a.v + b.m * b.v;
        const currentEk = 0.5 * a.m * Math.pow(a.v, 2) + 0.5 * b.m * Math.pow(b.v, 2);

        statsRef.current = {
          ...statsRef.current,
          totalMomentum: currentP,
          totalKineticEnergy: currentEk,
        };
        onStatsUpdate({ ...statsRef.current });
      };

      const drawGrid = (p: any) => {
        p.stroke(30, 41, 59); // grid color
        p.strokeWeight(1);
        const spacing = PHYSICS_DEFAULTS.pixelsPerMeter;
        for (let x = 0; x < p.width; x += spacing) {
          p.line(x, 0, x, p.height);
        }
        // Floor line
        p.stroke(51, 65, 85);
        p.strokeWeight(2);
        p.line(0, p.height / 2 + 60, p.width, p.height / 2 + 60);
      };

      const drawBall = (p: any, ball: BallState) => {
        p.push();
        p.translate(ball.x, p.height / 2);
        
        // Glow effect
        p.drawingContext.shadowBlur = 20;
        p.drawingContext.shadowColor = ball.glowColor;
        
        p.noStroke();
        p.fill(ball.color);
        p.circle(0, 0, ball.radius * 2);
        
        // Reflection highlight
        p.fill(255, 255, 255, 100);
        p.ellipse(-ball.radius * 0.3, -ball.radius * 0.3, ball.radius * 0.4, ball.radius * 0.4);
        
        p.pop();
      };

      const drawVector = (p: any, ball: BallState) => {
        const magnitude = ball.v * 10;
        if (Math.abs(magnitude) < 2) return;

        p.push();
        p.translate(ball.x, p.height / 2 - ball.radius - 20);
        
        p.stroke(255);
        p.strokeWeight(2);
        
        p.line(0, 0, magnitude, 0);
        
        const arrowSize = 6;
        const direction = magnitude > 0 ? 1 : -1;
        p.translate(magnitude, 0);
        p.line(0, 0, -arrowSize * direction, -arrowSize);
        p.line(0, 0, -arrowSize * direction, arrowSize);

        p.noStroke();
        p.fill(255, 255, 255, 200);
        p.textSize(10);
        p.textAlign(p.CENTER);
        p.text(`${ball.v.toFixed(1)} m/s`, -magnitude / 2, -10);
        
        p.pop();
      };
      
      p.resetRequested = () => {
        resetSimulation(p);
      };
    };

    const p5Instance = new p5(sketch, containerRef.current!);
    canvasRef.current = p5Instance;

    return () => {
      p5Instance.remove();
    };
  }, [resetTrigger, calculatePhysics, m1, m2, u1, u2, e, onStatsUpdate]);

  useEffect(() => {
    if (canvasRef.current && !isPlaying) {
      canvasRef.current.resetRequested();
    }
  }, [m1, u1, m2, u2, isPlaying]);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default CollisionCanvas;