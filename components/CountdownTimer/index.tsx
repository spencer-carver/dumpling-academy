import React from "react";
import { styled } from "../../styles/stitches";

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

function leftPad(value: number): string {
    if (value < 10) {
        return `0${ value }`;
    }

    return value.toString();
}

interface Event {
    event: "BEGINNING" | "LIVE_COUNTDOWN" | "LIVE_TALK" | "POST_LIVE" | "VIRTUAL_COUNTDOWN" | "VIRTUAL_TALK" | "POST_VIRTUAL" | "AFTERWARDS";
    link: string;
    endTime?: number;
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

export default CountdownTimer;
