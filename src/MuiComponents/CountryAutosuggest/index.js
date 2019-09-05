import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import theme from './theme.module.css'


const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
    <div>
        {suggestion.name}
    </div>
);

class CountryAutosuggest extends Component {
    constructor() {
        super();

        this.state = {
            value: '',
            suggestions: []
        };
    }
    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : this.props.suggestions.filter(cntry =>
            cntry.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    onChange = (event, { newValue }) => {
        event.preventDefault();
        this.setState({
            value: newValue
        },  ()=> {this.props.getCountry(newValue)});
        console.log(newValue)
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        },
            );
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        }, );
    };

    render() {
        const {  suggestions } = this.state;

        const inputProps = {
            className:this.props.style,
            placeholder: 'Country',
            value:this.props.value,
            onChange: this.onChange,
        };

        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                theme={theme}
            />
        );
    }
}

export default CountryAutosuggest