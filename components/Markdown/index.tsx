import { ReactElement } from "react";
import { HeadingComponent, TableDataCellComponent, TableHeaderCellComponent } from "react-markdown/lib/ast-to-react";
import { NormalComponents } from "react-markdown/lib/complex-types";
import { styled } from "../../styles/stitches";
import Link from "../Link";

function headingId(props) {
    let id = undefined;
    try {
        id = props.id || props.children[0].trim().replace(/[^a-zA-Z0-9]+/gi, "-");
    } catch (e) {
        // do nothing
    }

    return id;
}

const HeadingOne = styled("h1", {});
const Heading1 = (props) => (
    <span style={{ position: "relative" }}>
        <a id={ headingId(props) } style={{ position: "absolute", top: "-50px", pointerEvents: "none" }} />
        <HeadingOne { ...props } id={ undefined } component={ LinkTag } />
    </span>
);

const HeadingTwo = styled("h2", {});
const Heading2 = (props) => (
    <span style={{ position: "relative" }}>
        <a id={ headingId(props) } style={{ position: "absolute", top: "-50px", pointerEvents: "none" }} />
        <HeadingTwo { ...props } id={ undefined } component={ LinkTag } />
    </span>
);

const HeadingThree = styled("h3", {});
const Heading3 = (props) => (
    <span style={{ position: "relative" }}>
        <a id={ headingId(props) } style={{ position: "absolute", top: "-50px", pointerEvents: "none" }} />
        <HeadingThree { ...props } id={ undefined } component={ LinkTag } />
    </span>
);

const Table = styled("table", {
    borderCollapse: "collapse"
});

const TableHeading = styled("th", {
    border: "1px solid $onSurface",
    padding: "2px"
});

const TableCell = styled("td", {
    border: "1px solid $onSurface",
    padding: "5px"
});

const LinkTag = styled("a", {
    color: "$onSurface",
    textDecoration: "none",
    borderBottom: "2px dotted $secondary",
    "&:hover": {
        backgroundColor: "$secondary",
        color: "$onSecondary"
    }
});

const BlogLink = (props): ReactElement => {
    if (props.id) {
        return <span><a id={ props.id } style={{ paddingTop: "50px", pointerEvents: "none" }} /><Link { ...props } id={ undefined } component={ LinkTag } /></span>;
    }

    return <Link { ...props } component={ LinkTag } />;
};

const Pre = styled("pre", {
    backgroundColor: "$surfaceAccent",
    padding: "10px",
    fontSize: "12px",
    overflowX: "auto",
    "& code": {
        backgroundColor: "unset"
    },
    "@lg": {
        fontSize: "14px"
    }
});

const BlockQuote = styled("blockquote", {
    borderLeft: "5px solid $surfaceAccent",
    paddingLeft: "20px",
    marginLeft: "0px"
});

const Image = styled("img", {
    maxWidth: "100%"
});

const components = {
    h1: Heading1 as unknown as HeadingComponent,
    h2: Heading2 as unknown as HeadingComponent,
    h3: Heading3 as unknown as HeadingComponent,
    table: Table as unknown as NormalComponents["table"],
    th: TableHeading as unknown as TableHeaderCellComponent,
    td: TableCell as unknown as TableDataCellComponent,
    a: BlogLink as unknown as NormalComponents["a"],
    pre: Pre as unknown as NormalComponents["pre"],
    blockquote: BlockQuote as unknown as NormalComponents["blockquote"],
    img: Image as unknown as NormalComponents["img"]
};

export default components;
