import { styled } from "../styles/stitches";
import { CSS } from "@stitches/react";
import Head from "next/head";
import { FunctionComponent, useEffect, useState } from "react";
import { PageProps } from "../@types/global";
import Link from "../components/Link";

const NAME = "Dumpling Academy";
const DESCRIPTION = "A culinary journey coming soon...";

const PageDiv = styled("div", {
    maxWidth: "1024px",
    margin: "0 auto",
    padding: "10px 20px 0",
    color: "$onBackground",
    height: "calc(100vh - 113px)"
});

const Table = styled("table", {
    tableLayout: "fixed",
    margin: "0 auto",
    marginTop: "calc(50vh - 113px)"
});

const Heading = styled("th", {
    width: "70px",
    textAlign: "center",
    "@lg": {
        width: "200px"
    }
});

const Digit = styled("td", {
    width: "70px",
    textAlign: "center",
    fontFamily: "Lobster",
    fontWeight: "bold",
    fontSize: "36px",
    "@lg": {
        width: "200px",
        fontSize: "72px"
    }
});

const LIVE_TALK_TIME = new Date(2023, 1, 17, 14, 0, 0).getTime();
const VIRTUAL_TALK_TIME = new Date(2023, 1, 23, 14, 0, 0).getTime();

function leftPad(value: number): string {
    if (value < 10) {
        return `0${ value }`;
    }

    return value.toString();
}

const CountdownTimer = ({ targetTime }: { targetTime: number }) => {
    const [ currentTime, setCurrentTime ] = useState(null);

    useEffect(() => {
        setInterval(() => setCurrentTime(new Date().getTime()), 1000);
    }, []);

    const timeRemaining = Math.max(targetTime - currentTime, 0);
    const seconds = leftPad(Math.floor(timeRemaining / 1000 % 60));
    const minutes = leftPad(Math.floor(timeRemaining / 1000 / 60 % 60));
    const hours = leftPad(Math.floor(timeRemaining / 1000 / 60 / 60 % 24));
    const days = leftPad(Math.floor(timeRemaining / 1000 / 60 / 60 / 24));

    if (currentTime && timeRemaining === 0) {
        return <div>Dumpling Time</div>;
    }

    const TimeRow = currentTime
        ? (<>
            <Digit>{ days }</Digit>
            <Digit>{ hours }</Digit>
            <Digit>{ minutes }</Digit>
            <Digit>{ seconds }</Digit>
        </>)
        : (<>
            <Digit>--</Digit>
            <Digit>--</Digit>
            <Digit>--</Digit>
            <Digit>--</Digit>
        </>);

    return (
        <Table>
            <tbody>
                <tr>{ TimeRow }</tr>
            </tbody>
            <thead style={{ display: "table-row-group" }}>
                <tr>
                    <Heading>Days</Heading>
                    <Heading>Hours</Heading>
                    <Heading>Minutes</Heading>
                    <Heading>Seconds</Heading>
                </tr>
            </thead>
        </Table>
    );
};

const Homepage: FunctionComponent<PageProps & { lastUpdate: number; }> = ({ theme, lastUpdate }) => {
    return (
        <>
            <Head>
                <title>{ NAME }</title>
                <link rel="canonical" href="https://dumpling.academy" />
                <meta name="description" content={ DESCRIPTION } />
                <meta name="homepage" content="true" />
                <meta property="og:site_name" content={ NAME } />
                <meta property="og:description" content={ DESCRIPTION } />
                <meta property="og:title" content={ NAME } />
                <meta property="og:url" content="https://dumpling.academy" />
                <meta property="og:image" content="https://dumpling.academy/seo.jpg" />
                <meta name="twitter:description" content={ DESCRIPTION } />
                <meta name="twitter:title" content={ NAME } />
                <meta name="twitter:image" content="https://dumpling.academy/seo.jpg" />
            </Head>
            <PageDiv>
                <Link href="https://developerweek2023.sched.com/event/1GOAm">
                    <CountdownTimer targetTime={ LIVE_TALK_TIME } />
                </Link>
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
