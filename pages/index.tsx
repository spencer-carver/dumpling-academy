import { lightTheme, styled } from "../styles/stitches";
import Head from "next/head";
import { FunctionComponent } from "react";
import { PageProps } from "../@types/global";
import Link from "../components/Link";
import Logo from "../components/Logo";
import Image from "../components/Image";

const NAME = "Dumpling Academy";
const DESCRIPTION = "A combination plate of reference recipes and technical talks!";

const PageDiv = styled("div", {
    maxWidth: "1024px",
    margin: "0 auto",
    padding: "10px 20px 0",
    color: "$onBackground",
    minHeight: "calc(100vh - 113px)",
    textAlign: "center"
});

const CenteredDiv = styled("div", {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    minHeight: "calc(100vh - 113px)",
    "@lg": {
        flexDirection: "row"
    }
});

const Separator = styled("span", {
    display: "none",
    "@lg": {
        display: "initial",
        height: "300px",
        borderLeft: "1px solid $onBackground"
    }
});

const Card = styled("div", {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "$surface",
    color: "$onSurface",
    border: "1px solid $onBackground",
    boxShadow: "5px 5px 5px $onBackground",
    minHeight: "120px",
    fontFamily: "Lobster",
    fontSize: "24px",
    width: "240px",
    padding: "20px",
    "&:hover": {
        backgroundColor: "$surfaceAccent",
        color: "$onSurfaceAccent"
    }
});

const Homepage: FunctionComponent<PageProps & { lastUpdate: number; }> = ({ theme, lastUpdate }) => {
    const developerWeekImage = theme === lightTheme
        ? "/developerweek-2023/logo-dark.png"
        : "/developerweek-2023/logo-light.png";

    return (
        <>
            <Head>
                <title>{ NAME }</title>
                <link rel="canonical" href={ process.env.NEXT_PUBLIC_SITE_URL } />
                <meta name="description" content={ DESCRIPTION } />
                <meta name="homepage" content="true" />
                <meta property="og:site_name" content={ NAME } />
                <meta property="og:description" content={ DESCRIPTION } />
                <meta property="og:title" content={ NAME } />
                <meta property="og:url" content={ process.env.NEXT_PUBLIC_SITE_URL } />
                <meta property="og:image" content={ `${ process.env.NEXT_PUBLIC_SITE_URL }/seo.jpg` } />
                <meta name="twitter:description" content={ DESCRIPTION } />
                <meta name="twitter:title" content={ NAME } />
                <meta name="twitter:image" content={ `${ process.env.NEXT_PUBLIC_SITE_URL }/seo.jpg` } />
            </Head>
            <PageDiv>
                <CenteredDiv>
                    <Link href="/recipes">
                        <Card>
                            Family Recipe Portal
                        </Card>
                    </Link>
                    <Separator />
                    <Link href="/developerweek-2023/slides.pdf">
                        <Card>
                            <Logo />
                            ✕
                            <Image src={ developerWeekImage } alt="DeveloperWeek logo" width={ 240 } height={ 38 } />
                        </Card>
                    </Link> 
                </CenteredDiv>
            </PageDiv>
        </>
    );
};

export default Homepage;

export async function getStaticProps() {
    return {
        props: {
            lastUpdate: (new Date()).getTime()
        }
    }
}
