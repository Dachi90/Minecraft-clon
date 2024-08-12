/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */

import { useBox } from '@react-three/cannon';
import * as textures from '../images/textures';
import { useState } from 'react';
import { useStore } from '../hooks/useStore';

export const Cube = ({ id, position, texture }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [removeCube] = useStore((state) => [state.removeCube]);
	const [ref] = useBox(() => ({
		type: 'Static',
		position,
	}));

	const activeTexture = textures[texture + 'Texture'];

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
			onClick={(e) => {
				e.stopPropagation();
				if (e.altKey) {
					removeCube(id);
				}
			}}
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
