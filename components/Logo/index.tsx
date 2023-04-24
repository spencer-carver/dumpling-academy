import React from "react";
import { styled } from "../../styles/stitches";

const LogoSpan = styled("span", {
    pointerEvents: "none"
});

const Emoji = styled("span", {
    fontSize: "12px"
});

const SiteLogo = () => <LogoSpan>Dumpling<Emoji> 🥟 </Emoji>Academy</LogoSpan>;

export default SiteLogo;
