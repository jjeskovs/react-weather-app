import React from "react";
import styled from "styled-components";
import { Col, Card, CardHeader, CardBody } from "reactstrap";

const teal = "#17a2b8";
const outline = `2px solid ${teal}`;
const Wrapper = styled.div`
    cursor: pointer;
    .card {
        border-width: 2px;
    }
    &:hover {
        .card {
            border: ${outline};
        }
    }
    .card {
        border: ${props => props.isActive ? outline : null};
        text-align: center;
    }
    .card-header {
        background: ${props => props.isActive ? teal : null};
        border-bottom: ${props => props.isActive ? outline : null};
        border-bottom-width: 2px;
        color: ${props => props.isActive ? "white" : null};
        font-weight: ${props => props.isActive ? 700 : null};
        padding: .75rem 1rem;
    }
    img {
        width: 75px;
    }
`


const DayCard = props => {
    return (
        <Col onClick={props.selectDay}>
            <Wrapper isActive={props.isActive}>
                <Card>
                    <CardHeader>{props.day}</CardHeader>
                    <CardBody>
                        <h3><strong>{props.current.toFixed(1)}°</strong></h3>
                        <img src={`${process.env.PUBLIC_URL}/icons/${props.icon}.png`} alt={props.description} />
                        <p><strong>High:</strong> {props.high.toFixed(1)}°</p>
                        <p><strong>Low:</strong> {props.low.toFixed(1)}°</p>
                    </CardBody>
                </Card>
            </Wrapper>
        </Col>
    )
}

export default DayCard;