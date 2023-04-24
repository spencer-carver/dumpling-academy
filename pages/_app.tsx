import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Link from "../components/Link";
import { darkTheme, defaultTheme, lightTheme, styled } from "../styles/stitches";
import { CSS } from "@stitches/react";
import LoadingSpinner from "../components/Loading";
import Logo from "../components/Logo";

const Header = styled("header", {
    fontFamily: "Lobster",
    fontSize: "32px",
    padding: "3px 0 10px",
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    [`.${ darkTheme } &`]: {
        color: "$onBackground"
    }
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

const backStyles: CSS = {
    textDecoration: "none",
    color: "$onBackground",
    "&:hover": {
        textDecoration: "none"
    }
};

const SiteLogo = () => {
    const router = useRouter();

    if (router.asPath === "/") {
        return <Header><Logo /></Header>;
    }

    const pathParts = router.asPath.split("/");
    pathParts.pop();

    return (
        <Header>
            <Link href={ pathParts.join("/") || "/" } css={ backStyles }>&#10094;</Link>
            <Link href="/"><Logo /></Link>
            <span />
        </Header>
    );
};

export default function MyApp({ Component, pageProps }: AppProps) {
    const [theme, setTheme] = useState(defaultTheme);
    const [loading, setLoading] = useState(false);
    const [stillLoading, setStillLoading] = useState(false);

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

    const handleLoading = useCallback((isLoading) => {
        setLoading((loading) => {
            if (loading && !isLoading) {
                setStillLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    setStillLoading(false);
                }, 750);
    
                return loading;
            }

            return isLoading;
        });
    }, []);

    return (
        <>
            <Head>
                <meta name="viewport" content="height=device-height, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0" />
            </Head>
            <main className={ theme }>
                <SiteLogo />
                <Component theme={ theme } setLoading={ handleLoading } { ...pageProps } />
                { loading && <LoadingSpinner fadeOut={ stillLoading } /> }
                <Footer>
                    <CopyrightNotice>&#169; { (new Date()).getFullYear() } Spencer Carver</CopyrightNotice>
                </Footer>
            </main>
        </>
    );
};
