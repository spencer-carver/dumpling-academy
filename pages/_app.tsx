import { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "../components/Link";
import { darkTheme, defaultTheme, lightTheme, styled } from "../styles/stitches";

const Header = styled("header", {
    fontFamily: "Lobster",
    fontSize: "32px",
    padding: "3px 0 10px",
    width: "100%",
    textAlign: "center",
    [`.${ darkTheme } &`]: {
        color: "$onBackground"
    }
});

const Emoji = styled("span", {
    fontSize: "12px"
});

const Footer = styled("footer", {
    position: "relative",
    bottom: "0",
    height: "50px",
    width: "100%",
    textAlign: "center",
    color: "$onBackground",
    fontSize: "14px"
});

const CopyrightNotice = styled ("p", {
    display: "inline-block"
});

export default function MyApp({ Component, pageProps }: AppProps) {
    const [theme, setTheme] = useState(defaultTheme);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            if  (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
                setTheme(darkTheme);
            } else if  (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
                setTheme(lightTheme);
            }

            const body = document.getElementsByTagName("body")[0];
            body.style.visibility = "visible";
            body.style.opacity = "1";
        } catch (e) {
            //do nothing
        }
    }, []);

    return (
        <>
            <Head>
                <meta name="viewport" content="height=device-height, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0" />
            </Head>
            <main className={ theme }>
                <Header>
                    <Link href="/">Dumpling<Emoji> 🥟 </Emoji>Academy</Link>
                </Header>
                <Component theme={ theme } setLoading={ setLoading } { ...pageProps } />
                <Footer>
                    <CopyrightNotice>&#169; { (new Date()).getFullYear() } Spencer Carver</CopyrightNotice>
                </Footer>
            </main>
        </>
    );
};
