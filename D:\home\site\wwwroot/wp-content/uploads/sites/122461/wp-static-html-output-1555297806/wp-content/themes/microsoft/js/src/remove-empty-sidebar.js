(function() {
    'use strict';

    if ( $.trim( $('#secondary').text() ) == '' )
    {
        $('#primary').css("width", "100%");
        $('#secondary').css("display", "none");
    }
})();