import React from 'react';
import SearchBox from './search-box';

import './search_individual.css'

class SearchIndividual extends React.Component {
    render() {
        return (
            <div>
                <div class="track-me-img">
                    <img id="track-me" src={require('./assets/logosinfrase.jpg')} />
                </div>
                <form class="form-search content-search navbar-form" action="" method="post">
                    <div class="input-group">
                        <SearchBox loading={loading} error={error} empty={empty} onSearch={onSearch} />
                        <div class="search-button" method="post">
                            <button type="button" class="buttonSearch"></button>
                        </div>
                    </div>
                </form>
            </div>
        );

        /*function capture() {
            var codiceFiscale = document.getElementById("codice-fiscale").value;
        }*/
    }
}

export default SearchIndividual;