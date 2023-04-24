import NextImage, { ImageProps } from "next/legacy/image";
import { FunctionComponent } from "react";

const Image: FunctionComponent<ImageProps> = (props) => {
    return <NextImage { ...props } loader={ ({ src }) => src } unoptimized={ true } referrerPolicy="no-referrer" />;
}

export default Image;
