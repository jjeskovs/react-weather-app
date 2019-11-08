import React from "react";
import styled from "styled-components";
import { Card, CardBody } from "reactstrap";

const outline = `2px solid #17a2b8`;
const CardWrapper = styled(Card)`
    border: ${outline};
    margin: 1em 0;
    text-align: center;
    h3 {
        font-size: 2.5rem;
        font-weight: 500;
        margin-top: .5em;
    }
    h4 {
        padding-bottom: 1em;
    }
`

const DayDetails = props => {
    return (
        <CardWrapper>
            <CardBody>
                <h2>Weather Details for {props.date} in {props.location}</h2>
                <h3><strong>{props.current.toFixed(1)}°</strong></h3>
                <p><img src={`${process.env.PUBLIC_URL}/icons/${props.icon}.png`} alt={props.description} /></p>
                <h4>{props.description}</h4>
                <p><strong>High:</strong> {props.high.toFixed(1)}° / <strong>Feels Like:</strong> {props.apparentHigh.toFixed(1)}°</p>
                <p><strong>Low:</strong> {props.low.toFixed(1)}° / <strong>Feels Like:</strong> {props.apparentLow.toFixed(1)}°</p>
                <p><strong>Precipitation:</strong> {props.precip}% chance</p>
                <p><strong>Wind Speed:</strong> {props.windSpeed}</p>
                <p><strong>Wind Direction:</strong> {props.windDirection[0].toUpperCase() + props.windDirection.substring(1)}</p>
            </CardBody>
        </CardWrapper>    
    )
}

export default DayDetails;