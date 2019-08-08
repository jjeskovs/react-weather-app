import React from "react";
import styled from "styled-components";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const SearchForm = styled(Form)`
    justify-content: flex-end;
    margin-top: 1em;
    input.form-control {
        border-radius: .25rem 0 0 .25rem;
        width: 325px;
    }
    button {
        border-radius: 0 .25rem .25rem 0;
    }
`

const SearchBar = props => {
    return (
        <SearchForm inline onSubmit={props.handleFormSubmit}>
            <FormGroup>
                <Label for="search" hidden>Search by Location</Label>
                <Input 
                    type="text" 
                    name="search" 
                    id="search" 
                    placeholder="Search by address, city/state, or zip code" 
                    value={props.searchTerm}
                    onChange={props.handleInputChange}
                />
            </FormGroup>
            <Button color="info" onClick={props.handleFormSubmit}>Search</Button>
        </SearchForm>
    )
}

export default SearchBar;