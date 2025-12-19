
export interface BallState {
  m: number;      // Mass (kg)
  u: number;      // Initial velocity (m/s)
  v: number;      // Current velocity (m/s)
  x: number;      // Position (pixels)
  radius: number; // Radius based on mass
  color: string;  // Hex color
  glowColor: string; // RGBA glow color
}

export interface SimulationStats {
  totalMomentum: number;
  totalKineticEnergy: number;
  initialMomentum: number;
  initialKineticEnergy: number;
  collisionCount: number;
}

export interface LabConfig {
  e: number; // Coefficient of Restitution
}
