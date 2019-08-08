import React, { Component } from "react";
import styled from "styled-components";
import moment from "moment";
import { Container, Row, Col } from "reactstrap";
import sampleData from "./data/sample.json";
import API from "./utils/API";
import SearchBar from "./components/SearchBar";
import DayCard from "./components/DayCard";
import DayDetail from "./components/DayDetail";

const Wrapper = styled(Container)`
    .row:first-child {
        margin: 1.5em -15px;
    }
    .col > h2 {
        margin-top: 1em;
    }
`

class App extends Component {
    state = {
        searchTerm: "",
        // location: `${sampleData.city_name}, ${sampleData.state_code}`,
        location: "",
        // days: sampleData.data,
        days: [],
        selectedDay: null
    }

    componentDidMount() {
        // console.log(this.state.days);
        this.getWeather("Denver, CO");
    }

    selectDay = day => {
        this.setState({ selectedDay: day });
    }

    getWeather = address => {
        if (address) {
            API.getWeather(address)
                .then(res => {
                    if (res) {
                        this.setState({ 
                            searchTerm: "",
                            location: `${res.data.city_name}, ${res.data.state_code}`, 
                            days: res.data.data, 
                            selectedDay: null
                        })
                    } else {
                        this.setState({ searchTerm: "" });
                    }
                })
                .catch(err => console.log(err));
        }
    }

    handleInputChange = event => {
        this.setState({ searchTerm: event.target.value });
    }

    handleFormSubmit = event => {
        event.preventDefault();
        this.getWeather(this.state.searchTerm);
    }

    render() {
        return (
            <Wrapper>
                <Row>
                    <Col md={7}>
                        <h1>Weather for {this.state.location}</h1>
                    </Col>
                    <Col md={5}>
                        <SearchBar
                            searchTerm={this.state.searchTerm}
                            handleInputChange={this.handleInputChange}
                            handleFormSubmit={this.handleFormSubmit}
                        />
                    </Col>
                </Row>
                <Row>
                    {this.state.days.map(day => (
                        <DayCard
                            key={day.ts}
                            day={moment(day.valid_date, "YYYY-MM-DD").format("dddd")}
                            current={day.temp}
                            high={day.max_temp}
                            low={day.min_temp}
                            precip={day.pop}
                            icon={day.weather.icon}
                            description={day.weather.description}
                            selectDay={() => this.selectDay(day)}
                            isActive={day === this.state.selectedDay}
                        />
                    ))}
                </Row>
                <Row>
                    <Col>
                        {this.state.selectedDay ? (
                            <DayDetail
                                day={moment(this.state.selectedDay.valid_date, "YYYY-MM-DD").format("dddd, MMMM Do, YYYY")}
                                current={this.state.selectedDay.temp}
                                high={this.state.selectedDay.max_temp}
                                apparentHigh={this.state.selectedDay.app_max_temp}
                                low={this.state.selectedDay.min_temp}
                                apparentLow={this.state.selectedDay.app_min_temp}
                                precip={this.state.selectedDay.pop}
                                icon={this.state.selectedDay.weather.icon}
                                windSpeed={this.state.selectedDay.wind_spd}
                                windDirection={this.state.selectedDay.wind_cdir_full}
                                description={this.state.selectedDay.weather.description}
                            />
                        ) : (
                                <h2>Select a day above to get details!</h2>
                            )}
                    </Col>
                </Row>
            </Wrapper>
        );
    }
}

export default App;
