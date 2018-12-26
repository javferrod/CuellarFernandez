import React from 'react';

import './Search_Individual.css'

function Search_Individual() {
     return (
        <div>
            <div  class="track-me-img">
                <img id="track-me" src={require ('./assets/logosinfrase.jpg')} />
            </div>
            <form class="form-search content-search navbar-form" action="" method="post">
             <div class="input-group">
              <input id="codice-fiscale" placeholder="Search by codice fiscale..." class="form-control form-text" type="text" maxlength="128" />
              <div class="search-button" method="post">
                  <button type="button" onClick={capture}></button>
              </div>
             </div>
            </form>
        </div>
     );

     function capture() {
         var codiceFiscale = document.getElementById("codice-fiscale").value;
     }
}



export default Search_Individual;