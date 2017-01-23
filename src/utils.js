import React from 'react';

// using jQuery
export function getCookie(name) {

    function trim(str)
    {
        return str.replace(/^\s+|\s+$/g,'');
    };

    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(
                  cookie.substring(name.length + 1)
                  );
                break;
            }
        }
    }
    return cookieValue;
}

export function writeCsrf() {
    var csrfToken = getCookie('csrftoken');

    if (!csrfToken) {
        return document.getElementById('id-csrf').innerHTML;
    }
    
    return React.DOM.input(
      {type:"hidden", name:"csrfmiddlewaretoken", value:csrfToken}
      );
}