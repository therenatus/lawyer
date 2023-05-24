import { ReactNode } from 'react';

interface BodyLayoutProps {
	children: ReactNode;
}
export const BodyLayout = ({ children }: BodyLayoutProps) => {
	return <div className="w-[90%] mx-auto">{children}</div>;
};
