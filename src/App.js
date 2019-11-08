// here we destructure useState and useEffect from React to give us state/lifecycle functionality!
import React, { useState, useEffect } from "react";
import moment from "moment";
import { Row, Col } from "reactstrap";
import { Wrapper } from "./styles";
import API from "./utils/API";
import SearchBar from "./components/SearchBar";
import DayCard from "./components/DayCard";
import DayDetail from "./components/DayDetail";
// import sampleData from "./data/sample.json"; // only used initially until we wire up with the API

const App = () => {
    // the following variable (data) instantiates four values in state using Hooks... note the 
    // const name is an array destructured into two variables that we can name according to their 
    // purpose -- the first array member is ALWAYS the value stored in state, and the second 
    // array member is ALWAYS the function created to set/alter the state value; after the equal sign, 
    // 'useState()' indicates that we're using React's useState functionality... the value inside the 
    // function call parens indicates the initial value of the state in question!

    // in this example here, we're storing an object of values in state, which is useful if the
    // included values are often or always updated together; one caution storing objects in state:
    // the useState() Hook does not merge in your provided key value pairs into the existing
    // state object like it did in this.setState()... instead, it overwrites everything in that
    // location; it is common to use the spread operator to spread in the previous state values
    // (in this case, 'data') and then to add your updated key/val pairs afterwards
    const [data, setData] = useState({
        searchTerm: "",
        selectedDay: null,
        location: "",
        days: []
    });
    const { searchTerm, selectedDay, location, days } = data;

    // FOR EXAMPLE:
    // the variable 'day' is the value stored in state; its initial value is "Friday", and to 
    // change the value of 'day' in state, we would call 'setDay("newDayNameHere")'...
    // to reference this value in the component's methods or JSX, we merely refer to 'day' instead
    // of 'this.state.day'!
    const [day, setDay] = useState("Friday");

    // here 'useEffect' coupled with [] as a second arg behaves like componentDidMount did in a 
    // class-based component
    useEffect(() => {
        getWeather("Denver, CO");
    }, []);

    // here we use 'useEffect' again (it's fairly common to have multipe useEffect blocks
    // when you want each separate instance to be triggered at different times in the lifecycle)...
    // in this case, we are setting the document's title on initial render AND anytime the state
    // value of 'location' changes... the array following the anonymous function (the dependency
    // or 'deps' array) specifies which values should trigger the effect upon change
    useEffect(() => {
        document.title = `This week's weather ${location ? "for " + location : ""}`;
    }, [location])

    // since these functions are built inside a function-based (dumb) component, we typically create
    // them as const function expressions, like we have here
    const getWeather = address => {
        if (address) {
            API.getWeather(address)
                .then(res => {
                    if (res) {
                        // using our custom functions created above to alter values in state/trigger rerender
                        setData({
                            searchTerm: "",
                            selectedDay: null,
                            location: `${res.data.city_name}, ${res.data.state_code}`,
                            days: res.data.data
                        });
                    } else {
                        setData({
                            ...data,
                            searchTerm: "",
                            selectedDay: null
                        });
                    }
                })
                .catch(err => console.log(err));
        } else {
            alert("Search a location to get this week's weather data!");
        }
    }

    const handleInputChange = event => {
        setData({ ...data, searchTerm: event.target.value });
    }

    const handleFormSubmit = event => {
        event.preventDefault();
        getWeather(searchTerm);
    }

    // since we're in a function and not a class, there's no need to wrap in a 'render()' lifecycle method!
    return (
        <Wrapper>
            {!days.length ? (
                <div style={{ padding: "20% 50%", margin: -8, width: 16, height: 16 }}>
                    <i className="fa fa-spinner fa-spin fa-3x" aria-hidden="true" />
                </div>
            ) : (
                <>
                    <Row>
                        <Col md={7}>
                            <h1>Weather for {location}</h1>
                        </Col>
                        <Col md={5}>
                            <SearchBar
                                searchTerm={searchTerm}
                                handleInputChange={handleInputChange}
                                handleFormSubmit={handleFormSubmit}
                            />
                        </Col>
                    </Row>
                    <Row>
                        {days.map(day => (
                            <DayCard
                                key={day.ts}
                                day={moment(day.valid_date, "YYYY-MM-DD").format("dddd")}
                                current={day.temp}
                                high={day.max_temp}
                                low={day.min_temp}
                                precip={day.pop}
                                icon={day.weather.icon}
                                description={day.weather.description}
                                selectDay={() => setData({ ...data, selectedDay: day })}
                                isActive={day === selectedDay}
                            />
                        ))}
                    </Row>
                    <Row>
                        <Col>
                            {selectedDay ? (
                                <DayDetail
                                    date={moment(selectedDay.valid_date, "YYYY-MM-DD").format("dddd, MMMM Do, YYYY")}
                                    location={location}
                                    current={selectedDay.temp}
                                    high={selectedDay.max_temp}
                                    apparentHigh={selectedDay.app_max_temp}
                                    low={selectedDay.min_temp}
                                    apparentLow={selectedDay.app_min_temp}
                                    precip={selectedDay.pop}
                                    icon={selectedDay.weather.icon}
                                    windSpeed={selectedDay.wind_spd}
                                    windDirection={selectedDay.wind_cdir_full}
                                    description={selectedDay.weather.description}
                                />
                            ) : (
                                <h2>Select a day above to get details!</h2>
                            )}
                            </Col>
                        </Row>
                    </>
                )}
        </Wrapper>
    );
}

export default App;
