import { styled } from "../styles/stitches";
import Head from "next/head";
import { FunctionComponent } from "react";
import { PageProps } from "../@types/global";
import Link from "../components/Link";

const NAME = "Dumpling Academy";
const DESCRIPTION = "A culinary journey coming soon...";

const PageDiv = styled("div", {
    maxWidth: "1024px",
    margin: "0 auto",
    padding: "10px 20px 0",
    color: "$onBackground",
    minHeight: "calc(100vh - 113px)",
    textAlign: "center"
});

const CenteredDiv = styled("div", {
    display: "inline-block",
    margin: "0 auto",
    marginTop: "calc(50vh - 113px)",
});

const PageContent = () => {
    return (
        <CenteredDiv>
            { "Dumpling Academy is undergoing changes!" }
            <br />
            <br />
            { "See the start of the new family recipe portal " }
            <Link href="/recipes" css={{ textDecoration: "underline" }}>here</Link>.
            <br />
            <br />
            { "Slides for technical presentation using Dumpling Academy as an example are " }
            <Link href="/developerweek-2023/slides.pdf" css={{ textDecoration: "underline" }}>here</Link>.
        </CenteredDiv>
    );
};

const Homepage: FunctionComponent<PageProps & { lastUpdate: number; }> = ({ theme, lastUpdate }) => {
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
                <PageContent />
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
