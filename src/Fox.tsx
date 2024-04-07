import { OrbitControls, useAnimations } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export default function Fox() {
  const gltf = useLoader(GLTFLoader, "/fox_gltf/Fox.gltf");
  const { actions } = useAnimations(gltf.animations, gltf.scene);
  const { camera } = useThree();

  const [foxPosition, setFoxPosition] = useState(new Vector3(0, 0, 0));
  const [foxXRotation, setFoxXRotation] = useState(0);
  const [foxDestination, setFoxDestination] = useState(new Vector3());
  const [isFoxMoving, setIsFoxMoving] = useState(false);
  const [isFoxRunning, setIsFoxRunning] = useState(false);
  const [foxSpeed, setFoxSpeed] = useState(0.1);

  useEffect(() => {
    actions?.Survey?.play();
  });

  useEffect(() => {
    const handleMouseMove = (event: { clientX: number; clientY: number }) => {
      var vec = new Vector3();
      var pos = new Vector3();
      vec.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5
      );
      vec.unproject(camera);
      vec.sub(camera.position).normalize();
      var distance = -camera.position.z / vec.z;
      pos.copy(camera.position).add(vec.multiplyScalar(distance));

      setFoxDestination(pos);
    };

    const handleTouchMove = (event: TouchEvent) => {
      var vec = new Vector3();
      var pos = new Vector3();
      vec.set(
        (event.touches[0].clientX / window.innerWidth) * 2 - 1,
        -(event.touches[0].clientY / window.innerHeight) * 2 + 1,
        0.5
      );
      vec.unproject(camera);
      vec.sub(camera.position).normalize();
      var distance = -camera.position.z / vec.z;
      pos.copy(camera.position).add(vec.multiplyScalar(distance));

      setFoxDestination(pos);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouchMove);
    window.addEventListener("touchmove", handleTouchMove);

    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [camera]);

  useFrame((_state, delta) => {
    const distance = foxPosition.distanceTo(foxDestination);
    console.log(distance);
    if (distance > 0.01) {
      const direction = foxDestination.clone().sub(foxPosition).normalize();
      const newFoxPosition = foxPosition
        .clone()
        .add(direction.multiplyScalar(foxSpeed * delta));
      setFoxPosition(newFoxPosition);

      // animation
      if (!isFoxRunning && distance > 0.15) {
        setIsFoxRunning(true);
        setFoxSpeed(0.15);
        if (actions?.Survey && actions?.Walk && actions?.Run) {
          actions.Walk.fadeOut(0.2).stop();
          actions.Survey.fadeOut(0.2).stop();
          // actions.Walk.fadeIn(0.2).play();
          actions.Run.setEffectiveTimeScale(2);
          actions.Run.fadeIn(0.2).play();
        }
      }
      if (!isFoxMoving && distance > 0.02) {
        setIsFoxMoving(true);
        setFoxSpeed(0.07);
        if (actions?.Survey && actions?.Walk && actions?.Run) {
          actions.Survey.fadeOut(0.2).stop();
          actions.Walk.fadeIn(0.2).play();
          // actions.Run.fadeIn(0.2).play();
        }
      }

      const angleInRadians = Math.atan2(direction.x, -direction.y);
      setFoxXRotation(angleInRadians);
    } else {
      // animation
      if (isFoxMoving) {
        setIsFoxMoving(false);
        setIsFoxRunning(false);
        if (actions?.Survey && actions?.Walk && actions?.Run) {
          actions.Walk.fadeOut(0.2).stop();
          actions.Run.fadeOut(0.2).stop();
          actions.Survey.fadeIn(0.2).play();
        }
      }
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
        rotation-y={foxXRotation}
      />
      <OrbitControls />
    </>
  );
}
