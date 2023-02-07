import { styled } from "../styles/stitches";
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
    height: "calc(100vh - 113px)",
    textAlign: "center"
});

const CenteredDiv = styled("div", {
    display: "inline-block",
    margin: "0 auto",
    marginTop: "calc(50vh - 113px)",
});

const Table = styled("table", {
    tableLayout: "fixed"
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

interface Event {
    event: "LIVE_COUNTDOWN" | "LIVE_TALK" | "POST_LIVE" | "VIRTUAL_COUNTDOWN" | "VIRTUAL_TALK" | "POST_VIRTUAL" | "AFTERWARDS";
    link: string;
    endTime?: number;
}

const EVENT_TIMELINE: Event[] = [{
    event: "LIVE_COUNTDOWN",
    link: "https://developerweek2023.sched.com/event/1GOAm",
    endTime: 1676671200000 // 2/17/2023 @ 2:00pm PST
},{
    event: "LIVE_TALK",
    link: "https://developerweek2023.sched.com/event/1GOAm",
    endTime: 1676672700000 // 2/17/2023 @ 2:25pm PST
},{
    event: "POST_LIVE",
    link: "https://www.bloomberg.com/activate?code=p1XE2As7",
    endTime: 1676782800000 // 2/19/2023 @ Midnight PST
},{
    event: "VIRTUAL_COUNTDOWN",
    link: "https://developerweek2023.sched.com/event/1GOB4",
    endTime: 1677189600000 // 2/23/2023 @ 2:00 PST
},{
    event: "VIRTUAL_TALK",
    link: "https://developerweek2023.sched.com/event/1GOB4",
    endTime: 1677191100000 // 2/23/2023 @ 2:25 PST
},{
    event: "POST_VIRTUAL",
    link: "https://www.bloomberg.com/activate?code=p1XE2As7",
    endTime: 1677312000000 // 2/25/2023 @ Midnight PST
},{
    event: "AFTERWARDS",
    link: "https://github.com/spencer-carver/dumpling-academy"
}];

function leftPad(value: number): string {
    if (value < 10) {
        return `0${ value }`;
    }

    return value.toString();
}

const CountdownTimer = ({ targetEvent, currentTime }: { targetEvent: Event; currentTime: number }) => {
    const timeRemaining = Math.max(targetEvent.endTime - currentTime, 0);
    const seconds = leftPad(Math.floor(timeRemaining / 1000 % 60));
    const minutes = leftPad(Math.floor(timeRemaining / 1000 / 60 % 60));
    const hours = leftPad(Math.floor(timeRemaining / 1000 / 60 / 60 % 24));
    const days = leftPad(Math.floor(timeRemaining / 1000 / 60 / 60 / 24));

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

const PageContent = () => {
    const [ currentEventIndex, setCurrentEventIndex ] = useState(0);
    const [ currentTime, setCurrentTime ] = useState(null);

    useEffect(() => {
        function tick() {
            const now = new Date().getTime();

            if (now > EVENT_TIMELINE[currentEventIndex].endTime) {
                setCurrentEventIndex(currentEventIndex + 1);
            }

            setCurrentTime(now);
        }

        const timer = setInterval(tick, 1000);

        return () => window.clearInterval(timer);
    }, [currentEventIndex]);

    const currentEvent = EVENT_TIMELINE[currentEventIndex];

    if (currentEvent.event.includes("COUNTDOWN")) {
        return (
            <CenteredDiv>
                <Link href={ currentEvent.link }>
                    <CountdownTimer targetEvent={ currentEvent } currentTime={ currentTime } />
                </Link>
            </CenteredDiv>
        );
    }

    if (currentEvent.event.includes("TALK")) {
        return (
            <CenteredDiv>
                The talk is live! <Link href={ currentEvent.link } css={{ textDecoration: "underline" }}>go watch it</Link>.
            </CenteredDiv>
        );
    }

    if (currentEvent.event.includes("POST")) {
        return (
            <CenteredDiv>
                { "This talk has concluded, as a token of appreciation for attending, please claim this " }
                <Link href={ currentEvent.link } css={{ textDecoration: "underline" }}>promotional access to bloomberg.com</Link>.
            </CenteredDiv>
        );
    }


    return (
        <CenteredDiv>
            { "All talks are over, but you can find more details " }
            <Link href={ currentEvent.link } css={{ textDecoration: "underline" }}>here</Link>.
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
