import { ReactNode } from "react";
import { CSS } from "@stitches/react";
import { styled } from "../../styles/stitches";

const Anchor = styled("a", {
    color: "$onBackground",
    textDecoration: "none",
    "&:visited": {
        color: "$onBackground"
    },
    "&:hover": {
        color: "$onSurface"
    },
});

const Link = ({ href, css = {}, children }: { href: string; css?: CSS; children: ReactNode }) => (<Anchor href={ href } css={ css }>{ children }</Anchor>);

export default Link;
