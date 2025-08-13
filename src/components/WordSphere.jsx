import * as THREE from "three";
import { useRef, useState, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Text, TrackballControls } from "@react-three/drei";

const WordSphere = () => {
  const RotatingGroup = ({ children }) => {
    const groupRef = useRef();

    useFrame((state, delta) => {
      if (groupRef.current) {
        groupRef.current.rotation.x += delta * 0.1;
        groupRef.current.rotation.y += delta * 0.15;
        groupRef.current.rotation.z += delta * 0.05;
      }
    });

    return (
      <group ref={groupRef} rotation={[10, 10.5, 10]}>
        {children}
      </group>
    );
  };

  const Word = ({ children, ...props }) => {
    const color = new THREE.Color();
    const fontProps = {
      fontSize: 2.5,
      letterSpacing: -0.05,
      lineHeight: 1,
      "material-toneMapped": false,
    };
    const ref = useRef();
    const [hovered, setHovered] = useState(false);
    
    const over = (e) => {
      e.stopPropagation();
      setHovered(true);
    };
    
    const out = () => setHovered(false);

    useEffect(() => {
      if (hovered) document.body.style.cursor = "pointer";
      return () => (document.body.style.cursor = "auto");
    }, [hovered]);
    // Tie component to the render-loop
    useFrame(({ camera }) => {
      if (ref.current) {
        ref.current.material.color.lerp(
          color.set(hovered ? "#fa2720" : "white"),
          0.1
        );
      }
    });

    return (
      <Billboard {...props}>
        <Text
          ref={ref}
          onPointerOver={over}
          onPointerOut={out}
          onClick={() => console.log("clicked")}
          {...fontProps}
          children={children}
        />
      </Billboard>
    );
  };

  const randWords = [
    "React",
    "Animation",
    "Motion",
    "Node",
    "MySql",
    "Sass",
    "Css",
    "Html",
    "Templating",
    "R3Fiber",
    "R3Drei",
    "ThreeJs",
    "Firebase",
    "Firestore",
    "JavaScript",
    "Jwt",
    "MongoDb",
  ];

  const Cloud = ({ count = 4, radius = 20 }) => {
    const words = useMemo(() => {
      const temp = [];
      const spherical = new THREE.Spherical();
      const phiSpan = Math.PI / (count + 1);
      const thetaSpan = (Math.PI * 2) / count;

      for (let i = 1; i < count + 1; i++) {
        for (let j = 0; j < count; j++) {
          const randomWord =
            randWords[Math.floor(Math.random() * randWords.length)];

          temp.push([
            new THREE.Vector3().setFromSpherical(
              spherical.set(radius, phiSpan * i, thetaSpan * j)
            ),
            randomWord,
          ]);
        }
      }
      return temp;
    }, [count, radius]);

    return words.map(([pos, word], index) => (
      <Word key={index} position={pos} children={word} />
    ));
  };

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{
        position: [0, 0, 40], // Closer to sphere
        fov: 75, // Slightly narrower field of view
      }}
    >
      <fog attach="fog" args={["#202025", 0, 80]} />
      <Suspense fallback={null}>
        <RotatingGroup>
          <Cloud count={8} radius={20} />
        </RotatingGroup>
      </Suspense>
      <TrackballControls noZoom={true} />
    </Canvas>
  );
};

export default WordSphere;
