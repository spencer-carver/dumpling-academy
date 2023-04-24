import React, { FunctionComponent } from "react";
import { styled, keyframes } from "../../styles/stitches";
import { CSS } from "@stitches/react";

const spin = keyframes({
    "0%": {
        opacity: "1",
        filter: "unset"
    },
    "75%":{
        filter: "grayscale()"
    },
    "100%": {
        opacity: "0",
        filter: "grayscale()"
    }
});

const Wrapper = styled("div", {
    position: "absolute",
    width: "62px",
    height: "62px",
    textAlign: "center",
    pointerEvents: "none",
    "& div": {
        position: "absolute",
        animation: `${ spin } 1.2s linear infinite`
    },
    "& div:nth-child(1)": {
        transform: "translate(20px, 0) rotate(0deg)",
        animationDelay: "-1.1s",
    },
    "& div:nth-child(2)": {
        transform: "translate(30px, 2.68px) rotate(30deg)",
        animationDelay: "-1.0s"
    },
    "& div:nth-child(3)": {
        transform: "translate(37.32px, 10px) rotate(60deg)",
        animationDelay: "-0.9s"
    },
    "& div:nth-child(4)": {
        transform: "translate(40px, 20px) rotate(90deg)",
        animationDelay: "-0.8s"
    },
    "& div:nth-child(5)": {
        transform: "translate(37.32px, 30px) rotate(120deg)",
        animationDelay: "-0.7s"
    },
    "& div:nth-child(6)": {
        transform: "translate(30px, 37.32px) rotate(150deg)",
        animationDelay: "-0.6s"
    },
    "& div:nth-child(7)": {
        transform: "translate(20px, 40px) rotate(180deg)",
        animationDelay: "-0.5s"
    },
    "& div:nth-child(8)": {
        transform: "translate(10px, 37.32px) rotate(210deg)",
        animationDelay: "-0.4s"
    },
    "& div:nth-child(9)": {
        transform: "translate(2.68px, 30px) rotate(240deg)",
        animationDelay: "-0.3s"
    },
    "& div:nth-child(10)": {
        transform: "translate(0px, 20px) rotate(270deg)",
        animationDelay: "-0.2s"
    },
    "& div:nth-child(11)": {
        transform: "translate(2.68px, 10px) rotate(300deg)",
        animationDelay: "-0.1s"
    },
    "& div:nth-child(12)": {
        transform: "translate(10px, 2.68px) rotate(330deg)",
        animationDelay: "0s"
    }
});

const spinnerFadeOutStyles: CSS = {
    opacity: "0",
    transition: "opacity .75s ease-out"
};

const LoadingSpinner: FunctionComponent<{ scaleFactor?: number; fadeOut?: boolean }> = ({ scaleFactor = 5, fadeOut }) => (
    <Wrapper css={{
        transform: `scale(${ scaleFactor })`,
        left: "calc(50vw - 31px)",
        top: "calc(50vh - 31px)",
        ...(fadeOut ? spinnerFadeOutStyles : {})
    }}>
        <div>🥟</div>
        <div>🥟</div>
        <div>🥟</div>
        <div>🥟</div>
        <div>🥟</div>
        <div>🥟</div>
        <div>🥟</div>
        <div>🥟</div>
        <div>🥟</div>
        <div>🥟</div>
        <div>🥟</div>
        <div>🥟</div>
    </Wrapper>
);

export default LoadingSpinner;
