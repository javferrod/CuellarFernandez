import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './Selection_Screen.css';
import Search_Individual from './Search_Individual'
import Search_Group from './Search_Group'
import My_Account from './My_Account'
import Contact from './Contact'

import logo from './assets/logo2.jpg'
 
function Selection_Screen () {
    return (
        <div>
            <div>
                <img class='track-me-img' id="track-me" src={logo} width={500} height={300} mode='fit'/>
            </div>
            <div>
                <button id="search_individual">
                    SEARCH INDIVIDUAL
                </button>
                <button id="search_group">
                    SEARCH GROUP
                </button>
                <button id="my_account">
                    MY ACCOUNT
                </button>
                <button id="contact">
                    CONTACT
                </button>
            </div>
            <Router>
            <div>
                <Route path="/individual_search" component={Search_Individual} />
                <Route path="/group_search" component={Search_Group} />
                <Route path="/my_account" component={My_Account} />
                <Route path="/contact" component={Contact} />
            </div>
            </Router>
        </div>
    );
}

function goIndividualSearch () {
    return (
        <Router>
            <div>
                <Link to="/individual_search"></Link>
            </div>
        </Router>
    )
}
 
export default Selection_Screen;