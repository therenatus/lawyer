import React, { FC } from 'react';

interface ILogo {
	color: string;
}
export const Logo: FC<ILogo> = ({ color }) => {
	return (
		<svg viewBox="0 0 77.8 43.3" fill={color}>
			<g>
				<polygon
					points="17.3,0 17.3,8.1 38.9,16.9 60.6,8.1 60.6,0"
					fill="#174193"
				></polygon>
				<polygon
					points="22.6,23.5 22.6,23.5 17.3,19.1 17.3,43.3 30.5,43.3 32.7,31.9"
					fill="#174193"
				></polygon>
				<polygon
					points="31.5,43.3 60.6,43.3 60.6,19.1 58.3,21"
					fill="#174193"
				></polygon>
				<polygon
					points="41.8,17.4 46.4,19.2 58.12,17.99 77.8,3.1"
					fill="#0C64B0"
				></polygon>
				<polygon
					points="0,2.7 34.3,31.3 32.5,40.5 57.3,19.9 45.3,21.1"
					fill="#0198DD"
				></polygon>
			</g>
		</svg>
	);
};

export default Logo;
