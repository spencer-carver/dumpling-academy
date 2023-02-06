import React from "react";
import Head from "next/head";
import { lightTheme, styled } from "../styles/stitches";

const ErrorDiv = styled("div", {
    display: "flex",
    height: "calc(100vh - 103px)",
    backgroundColor: "$background",
    color: "$onBackground",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "-apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI', 'Fira Sans', Avenir, 'Helvetica Neue', 'Lucida Grande', sans-serif"
});

const SadFaceSpan = styled("span", {
    position: "absolute",
    top: "20%",
    left: "calc(50% - 30px)",
    fontSize: "100px",
    textAlign: "center",
    "@lg": {
        left: "calc(50% - 60px)",
        fontSize: "200px"
    }
});

const ErrorCodeHeading = styled("h1", {
    display: "inline-block",
    borderRight: "1px solid rgba(255,255,255,0.3)",
    margin: "0px 20px 0px 0px",
    padding: "10px 23px 10px 0px",
    fontSize: "24px",
    fontWeight: "bold",
    verticalAlign: "top",
    [`.${ lightTheme } &`]: {
        borderRight: "1px solid rgba(0,0,0,0.3)"
    }
});

const MessageWrapperDiv = styled("div", {
    display: "inline-block",
    textAlign: "left",
    lineHeight: "49px",
    height: "49px",
    verticalAlign: "middle"
});

const ErrorMessageHeading = styled("h2", {
    fontSize: "14px",
    fontWeight: "normal",
    lineHeight: "inherit",
    margin: "0px",
    padding: "0px"
});

export default function Custom404({ title: errorMessage = "Not Found", statusCode = 404, backLink = "/" }) {
    return (
        <>
            <Head>
                <title>{ statusCode } - { errorMessage }</title>
            </Head>
            <ErrorDiv>
                <SadFaceSpan>:(</SadFaceSpan>
                <ErrorCodeHeading>{ statusCode }</ErrorCodeHeading>
                <MessageWrapperDiv>
                    <ErrorMessageHeading>{ errorMessage }</ErrorMessageHeading>
                </MessageWrapperDiv>
            </ErrorDiv>
        </>
    );
}
