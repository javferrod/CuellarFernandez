import React from 'react';

function Contact () {
    return (
        <div>
            <title>Contacto</title>

            <label class = 'contacto'>
                <div class='username'><input placeholder="Username" type="text" value='' maxlength="128"></input></div>
                <div id="email"><input placeholder="Email" type="text" value='' maxlength="128"></input></div>
                <div><label>Asunto</label><input placeholder="Asunto" type="text" maxlength="128" value=''></input></div>
                <div><label>Mensaje</label><textarea rows='6'></textarea></div>
                <div><input type='submit' value='Envia Mensaje'></input></div>
            </label>
        </div>
    );
}

export default Contact;