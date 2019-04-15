(function() {
'use strict';

var homeLink, domain = location.hostname.match(/^[a-z0-9\.]*\.([^.]+\.microsoft\.com[:\d]*)$/);
if (null === domain || domain.length < 2) {
    homeLink = 'http://www.microsoft.com/';
} else {
    homeLink = 'http://' + domain[1] + '/';
}

document.getElementById('home-link').href = homeLink;

})();