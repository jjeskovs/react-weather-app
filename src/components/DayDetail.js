import React from "react";
import styled from "styled-components";
import { Card, CardBody } from "reactstrap";

const outline = `2px solid #17a2b8`;
const CardWrapper = styled(Card)`
    border: ${outline};
    margin-top: 1em;
    text-align: center;
    h3 {
        font-size: 2.5rem;
    }
`

const DayDetails = props => {
    return (
        <CardWrapper>
            <CardBody>
                <h2>Detailed Forecast for {props.day}</h2>
                <h3><strong>{props.current}°</strong></h3>
                <p><img src={`${process.env.PUBLIC_URL}/icons/${props.icon}.png`} alt={props.description} /></p>
                <p><strong>High:</strong> {props.high}° / <strong>Feels Like:</strong> {props.apparentHigh}°</p>
                <p><strong>Low:</strong> {props.low}° / <strong>Feels Like:</strong> {props.apparentLow}°</p>
                <p><strong>Likelihood of Precipitation:</strong> {props.precip}</p>
                <p><strong>Wind Speed:</strong> {props.windSpeed}</p>
                <p><strong>Wind Direction:</strong> {props.windDirection}</p>
            </CardBody>
        </CardWrapper>    
    )
}

export default DayDetails;