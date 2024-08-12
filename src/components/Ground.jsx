/* eslint-disable react/no-unknown-property */
import { usePlane } from '@react-three/cannon';
import { groundTexture } from '../images/textures';
import { useStore } from '../hooks/useStore';

export function Ground() {
	const [ref] = usePlane(() => ({
		rotation: [-Math.PI / 2, 0, 0], // eje x, y, z
		position: [0, -0.5, 0], // eje x, y, z
	}));

	const [addCube] = useStore((state) => [state.addCube]);

	groundTexture.repeat.set(100, 100);

	const handleClockGround = (event) => {
		event.stopPropagation();
		const [x, y, z] = Object.values(event.point).map((n) => Math.ceil(n));
		addCube(x, y, z);
	};

	return (
		<mesh
			ref={ref}
			onClick={handleClockGround}
		>
			<planeGeometry
				attach='geometry'
				args={[100, 100]}
			/>
			<meshStandardMaterial
				attach='material'
				map={groundTexture}
			/>
		</mesh>
	);
}
