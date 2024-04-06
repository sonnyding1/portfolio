export default function Fox() {
  return (
    <>
      <mesh rotation-y={Math.PI * 0.25}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="hotpink" />
      </mesh>
    </>
  );
}
