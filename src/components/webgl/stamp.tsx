"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useWebglHealth } from "@/lib/use-webgl-health";

/**
 * Melegy's signature piece: the stamp.
 *
 * Every post they publish is a field on the same intake form — model, year,
 * trim, factory paint, mileage, service, licence, equipment — filled in
 * identically each time. And every sale ends the same way too: not a price,
 * not a note, just a closed file. So this is a real sheet of paper in 3D,
 * lying on a dark counter, with a rubber stamp hovering above it that drops
 * straight down and strikes when a sold car is selected — leaving an inked,
 * slightly crooked mark, the way an actual stamp never lands perfectly
 * square twice — and lifts away again after, the way a real one does.
 *
 * An available car leaves the stamp raised and the sheet blank. There is no
 * in-between state, because there is none in their captions either.
 */

const IDLE_Y = 1.5;
const STRIKE_Y = 0.14;

/** A canvas-drawn "SOLD" stamp face — a ring with the word set inside it,
 *  the way an actual date/approval stamp is engraved, rather than an
 *  abstract ring-and-bar mark that risks reading as a prohibition sign. */
function makeInkTexture() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, size, size);
  ctx.strokeStyle = "#a23429";
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 20, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#a23429";
  ctx.font = "bold 96px 'Bitter', Georgia, serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("SOLD", size / 2, size / 2 + 4);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function Paper({ struck, jitter }: { struck: boolean; jitter: { rot: number; x: number } }) {
  const ink = useRef<THREE.Mesh>(null);
  const inkMat = useRef<THREE.MeshBasicMaterial>(null);
  const progress = useRef(0);
  const target = useRef(struck ? 1 : 0);
  // Built in an effect rather than a lazy useState initialiser: canvas
  // creation is a DOM side effect, and the compiler's purity check does not
  // distinguish "safe because this only mounts client-side" from unsafe —
  // it flags any such call made during render, full stop.
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    target.current = struck ? 1 : 0;
  }, [struck]);

  useEffect(() => {
    const tex = makeInkTexture();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTexture(tex);
    return () => tex.dispose();
  }, []);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    progress.current += (target.current - progress.current) * (1 - Math.pow(0.001, dt));
    const s = 0.001 + Math.min(1, progress.current * 1.35);
    const o = Math.min(1, progress.current * 1.6);
    if (ink.current) ink.current.scale.setScalar(s);
    if (inkMat.current) inkMat.current.opacity = o;
  });

  return (
    <group>
      {/* The sheet. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.1, 4.2]} />
        <meshStandardMaterial color="#ede3ce" roughness={0.95} />
      </mesh>
      {/* Ruled lines, standing for the form's own fields. */}
      {[-1.55, -1.05, -0.55, -0.05, 0.45, 0.95, 1.45].map((z) => (
        <mesh key={z} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, z]}>
          <planeGeometry args={[2.5, 0.018]} />
          <meshBasicMaterial color="#c9bea1" toneMapped={false} />
        </mesh>
      ))}

      {/* The ink mark, scaling in from the point of impact. Scale and
          opacity are written from the frame loop above — never read from a
          ref during render. */}
      {texture ? (
        <mesh
          ref={ink}
          rotation={[-Math.PI / 2, 0, jitter.rot]}
          position={[jitter.x, 0.004, 0.05]}
          scale={0.001}
        >
          <planeGeometry args={[0.92, 0.92]} />
          <meshBasicMaterial
            ref={inkMat}
            map={texture}
            transparent
            opacity={0}
            toneMapped={false}
            depthWrite={false}
          />
        </mesh>
      ) : null}
    </group>
  );
}

/**
 * A straight vertical drop onto the paper rather than a swinging pivot: the
 * stamp always stays over its own impact point, which keeps it inside frame
 * at every stage instead of swinging off toward the camera or behind it.
 */
function StampHead({ struck, jitter }: { struck: boolean; jitter: { rot: number; x: number } }) {
  const group = useRef<THREE.Group>(null);
  const y = useRef(IDLE_Y);
  const phase = useRef<"idle" | "down" | "hold" | "lift" | "up">("idle");
  const holdT = useRef(0);

  useEffect(() => {
    phase.current = struck ? "down" : "up";
  }, [struck]);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 0.05);

    if (phase.current === "down") {
      y.current += (STRIKE_Y - y.current) * (1 - Math.pow(0.0008, dt));
      if (y.current - STRIKE_Y < 0.02) {
        phase.current = "hold";
        holdT.current = 0;
      }
    } else if (phase.current === "hold") {
      holdT.current += dt;
      if (holdT.current > 0.35) phase.current = "lift";
    } else if (phase.current === "lift" || phase.current === "up") {
      y.current += (IDLE_Y - y.current) * (1 - Math.pow(0.02, dt));
    }

    // A tiny mechanical squash right at contact, not a bounce — a stamp
    // meets solid paper, it does not spring off it.
    const nearContact = phase.current === "down" && y.current - STRIKE_Y < 0.05;
    const squash = nearContact ? 0.85 : 1;

    g.position.set(jitter.x, y.current, 0.05);
    g.rotation.z = jitter.rot;
    g.scale.set(1, squash, 1);
  });

  return (
    <group ref={group} position={[jitter.x, IDLE_Y, 0.05]}>
      {/* Handle. */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.07, 0.09, 0.9, 12]} />
        <meshStandardMaterial color="#2a231a" roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.02, 0]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color="#3a2f22" roughness={0.5} />
      </mesh>
      {/* Neck to head. */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.09, 0.16, 0.16, 12]} />
        <meshStandardMaterial color="#57493a" roughness={0.6} />
      </mesh>
      {/* Rubber head. */}
      <mesh position={[0, -0.02, 0]}>
        <boxGeometry args={[0.86, 0.1, 0.24]} />
        <meshStandardMaterial color="#1c1c1e" roughness={0.85} />
      </mesh>
    </group>
  );
}

function Rig({ struck }: { struck: boolean }) {
  const { camera } = useThree();
  const [jitter, setJitter] = useState({ rot: 0, x: 0 });

  useEffect(() => {
    camera.lookAt(0, 0, 0.15);
  }, [camera]);

  // A stable, slightly crooked landing so the mark never looks
  // vector-perfect. Built in an effect and handed to state: Math.random()
  // is impure, reading a ref during render is disallowed, and a useMemo
  // factory still counts as render — an effect is the only place left.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setJitter({ rot: (Math.random() - 0.5) * 0.22, x: (Math.random() - 0.5) * 0.5 });
  }, []);

  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[2, 4, 2]} intensity={1.15} />
      <Paper struck={struck} jitter={jitter} />
      <StampHead struck={struck} jitter={jitter} />
    </>
  );
}

function canRenderWebgl() {
  try {
    const c = document.createElement("canvas");
    return Boolean(
      c.getContext("webgl2") ?? c.getContext("webgl") ?? c.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

export function Stamp({
  struck,
  alt,
  className,
}: {
  /** True for a sold car — the stamp strikes and the ink mark appears. */
  struck: boolean;
  alt: string;
  className?: string;
}) {
  const { lost, bind } = useWebglHealth();
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(canRenderWebgl());
  }, []);

  if (lost || supported !== true) {
    return (
      <div className={className}>
        <div className="flex h-full w-full items-center justify-center bg-paper text-ink">
          <span className="font-display text-[1.4rem]">
            {struck ? "SOLD" : "AVAILABLE"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={className} role="img" aria-label={alt}>
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 5.4, 6.4], fov: 34 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => bind(gl.domElement)}
      >
        <Suspense fallback={null}>
          <Rig struck={struck} />
        </Suspense>
      </Canvas>
    </div>
  );
}
