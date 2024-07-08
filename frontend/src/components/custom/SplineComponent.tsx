import dynamic from "next/dynamic";
import { memo } from "react";

const Spline = dynamic(() => import("@splinetool/react-spline/next"), { ssr: false });

interface SplineComponentProps {
    className?: string;
    sceneUrl: string;
}

const SplineComponent: React.FC<SplineComponentProps> = ({ className, sceneUrl }) => {
    return <Spline className={className} scene={sceneUrl} />;
};

export default memo(SplineComponent);
