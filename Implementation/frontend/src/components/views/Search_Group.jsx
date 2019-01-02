import React from 'react';

import './search_group.css'

class SearchGroup extends React.Component {
    render() {
        return (
            <div>
                <div class="track-me-img">
                    <img id="track-me" src={require('./assets/logosinfrase.jpg')} />
                </div>
                <label class='search'>
                    <div class='localitation'>
                        <label class='localitation-label'>Localitation</label>
                        <input class='localitation-input' type="text" maxlength="128"></input>
                    </div>
                    <div class="genre">
                        <label class='genre-label'>Genre</label>
                        <select class='genre-select' name="Genre">
                            <option selected value="0"></option>
                            <option value="1">Masculine</option>
                            <option value="2">Female</option>
                        </select>
                    </div>
                    <div class="age">
                        <label class='age-label'>Age</label>
                        <input class='age-input' type="range" min="0" max="100" step="10"></input>
                    </div>
                    <div class="weight">
                        <label class='weight-label'>Weight</label>
                        <input class='weight-input' type="range" min="0" max="100" step="10"></input>
                    </div>
                    <div class="hearth-rate">
                        <label class='hearth-rate-label'>Hearth rate</label>
                        <input class='hearth-rate-input' type="range" min="0" max="100" step="10"></input>
                    </div>
                </label>
            </div>
        );
    }
}

export default SearchGroup;