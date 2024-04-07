import {
  OrbitControls,
  OrthographicCamera,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export default function Fox() {
  const gltf = useLoader(GLTFLoader, "/fox_gltf/Fox.gltf");
  const { actions } = useAnimations(gltf.animations, gltf.scene);

  const [foxPosition, setFoxPosition] = useState(new Vector3());

  useEffect(() => {
    actions?.Survey?.play();
    window.addEventListener("mousemove", (event) => {
      const x = ((event.clientX / window.innerWidth) * 2 - 1) * 0.3;

      const y = (-(event.clientY / window.innerHeight) * 2 + 1) * 0.3;

      setFoxPosition(new Vector3(x, y, 0));
    });
  }, [actions]);

  useFrame((state) => {});

  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight intensity={3} position={[0, 0, 5]} />
      <primitive
        object={gltf.scene}
        scale={0.0005}
        position={foxPosition}
        rotation-x={Math.PI * 0.2}
      />
      <OrbitControls />
    </>
  );
}
