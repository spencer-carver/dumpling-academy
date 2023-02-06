import { ReactNode } from "react";
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

const Link = ({ href, children }: { href: string; children: ReactNode }) => (<Anchor href={ href }>{ children }</Anchor>);

export default Link;
