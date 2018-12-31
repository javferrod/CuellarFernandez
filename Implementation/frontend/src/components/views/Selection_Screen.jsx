import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './selection_screen.css';
import SearchIndividual from './search_individual';
import SearchGroup from './search_group';
import MyAccount from './my_account';
import Contact from './contact';

import logo from '../../assets/logo2.jpg'

class SelectionScreen extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact={true} path="/" render={() => (<div>
                        <div>
                            <img class='track-me-img' id="track-me" src={logo} width={500} height={300} mode='fit' />
                        </div>
                        <div>
                            <Link to="/individual_search">
                                <button id="search_individual" class="buttonSelection" component={Link} to="/individual_search">
                                    SEARCH INDIVIDUAL
                            </button>
                            </Link>

                            <Link to="/group_search">
                            <button id="search_group" class="buttonSelection">
                                SEARCH GROUP
                            </button>
                            </Link>
                            
                            <Link to="/my_account">
                            <button id="my_account" class="buttonSelection">
                                MY ACCOUNT
                            </button>
                            </Link>
                            
                            <Link to="/contact">
                            <button id="contact" class="buttonSelection">
                                CONTACT
                            </button>
                            </Link>
                        </div>
                    </div>)} />
                    <div>
                        <Route path="/individual_search" component={search_individual} />
                        <Route path="/group_search" component={search_group} />
                        <Route path="/my_account" component={my_account} />
                        <Route path="/contact" component={contact} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default SelectionScreen;