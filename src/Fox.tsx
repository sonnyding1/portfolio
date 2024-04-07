import {
  OrbitControls,
  OrthographicCamera,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Vector2, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export default function Fox() {
  const gltf = useLoader(GLTFLoader, "/fox_gltf/Fox.gltf");
  const { actions } = useAnimations(gltf.animations, gltf.scene);

  const [foxPosition, setFoxPosition] = useState(new Vector3(0, 0, 0));
  const [foxDestination, setFoxDestination] = useState(new Vector3());

  //   useEffect(() => {
  //     actions?.Survey?.play();
  //     window.addEventListener("mousemove", (event) => {
  //       const x = ((event.clientX / window.innerWidth) * 2 - 1) * 0.3;

  //       const y = (-(event.clientY / window.innerHeight) * 2 + 1) * 0.3;

  //       setFoxPosition(new Vector3(x, y, 0));
  //     });
  //   }, [actions]);
  useEffect(() => {
    actions?.Survey?.play();
  });

  window.addEventListener("mousemove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 0.6;
    const y = -(event.clientY / window.innerHeight - 0.5) * 0.4;
    setFoxDestination(new Vector3(x, y, 0));
    // console.log(foxDestination);
  });

  useFrame((state, delta) => {
    // console.log(foxPosition.distanceTo(foxDestination));
    if (foxPosition.distanceTo(foxDestination) > 0.001) {
      const direction = foxDestination.clone().sub(foxPosition).normalize();
      const newFoxPosition = foxPosition
        .clone()
        .add(direction.multiplyScalar(0.1 * delta));
      setFoxPosition(newFoxPosition);
      console.log(foxPosition);
    }
  });

  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight intensity={3} position={[0, 0, 5]} />
      <primitive
        object={gltf.scene}
        scale={0.0003}
        position={foxPosition}
        rotation-x={Math.PI * 0.2}
      />
      <OrbitControls />
    </>
  );
}
