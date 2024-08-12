/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */

import { useBox } from '@react-three/cannon';
import * as textures from '../images/textures';
import { useState } from 'react';
import { useStore } from '../hooks/useStore';

export const Cube = ({ id, position, texture }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [addCube, removeCube] = useStore((state) => [state.addCube, state.removeCube]);
	const [ref] = useBox(() => ({
		type: 'Static',
		position,
	}));

	const activeTexture = textures[texture + 'Texture'];

	const handleCubes = (e) => {
		e.stopPropagation();
		const clickedFace = Math.floor(e.faceIndex / 2);
		const { x, y, z } = ref.current.position;
		if (e.altKey) {
			removeCube(id);
			return;
		}
		if (clickedFace === 0) {
			addCube(x + 1, y, z);
			return;
		} else if (clickedFace === 1) {
			addCube(x - 1, y, z);
			return;
		} else if (clickedFace === 2) {
			addCube(x, y + 1, z);
			return;
		} else if (clickedFace === 3) {
			addCube(x, y - 1, z);
			return;
		} else if (clickedFace === 4) {
			addCube(x, y, z + 1);
			return;
		} else if (clickedFace === 5) {
			addCube(x, y, z - 1);
			return;
		}
	};

	return (
		<mesh
			ref={ref}
			onPointerMove={(e) => {
				e.stopPropagation();
				setIsHovered(true);
			}}
			onPointerOut={(e) => {
				e.stopPropagation;
				setIsHovered(false);
			}}
			onClick={handleCubes}
		>
			<boxGeometry attach='geometry' />
			<meshStandardMaterial
				color={isHovered ? 'grey' : 'white'}
				transparent
				map={activeTexture}
				attach='material'
			/>
		</mesh>
	);
};
