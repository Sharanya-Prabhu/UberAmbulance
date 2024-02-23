import PlacesAutocomplete from "react-places-autocomplete";
import { useState } from "react";

const CompletePlaces = () => {

    const [address, setAddress] = useState("");
    const handleSelect = (value) => {
        setAddress(value);
    };


    return (
        <div>
        <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
        >
            {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
            }) => (
            <div>
                <input
                {...getInputProps({
                    placeholder: "Search Places ...",
                    className: "location-search-input",
                })}
                />
                <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                    const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                    // inline style for demonstration purpose
                    const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                    <div
                        {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                        })}
                    >
                        {console.log(suggestion.description)}
                        <span>{suggestion.description}</span>
                    </div>
                    );
                })}
                </div>
            </div>
            )}
        </PlacesAutocomplete>
        </div>
    );
}
export default CompletePlaces;