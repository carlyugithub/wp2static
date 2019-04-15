(function () {
    'use strict';

    var hostname = location.hostname;
    var refinementValue = 109;
    if (hostname.indexOf("blogs.msdn.microsoft.com") > -1) {
        $("#search-filter-site .search-text").text("Search MSDN");
        $("#search-form").attr("action", "https://social.msdn.microsoft.com/search/en-US");
    }
    else if (hostname.indexOf("blogs.technet.microsoft.com") > -1) {
        $("#search-filter-site .search-text").text("Search TechNet");
        $("#search-form").attr("action", "https://social.technet.microsoft.com/search/en-US");
        refinementValue = 61;
        $("#search-form [name='refinement']").attr("value", refinementValue);
    }

    $("#search-form-wrapper").focusin(function () {
        $("#search-option").css("display", "block");
    });

    $("#search-form-wrapper").focusout(function () {
        if (!$('#search-form-wrapper').is(':hover')) {
            $("#search-option").css("display", "none");
        }
    });

    $("#search-option .search-filter").click(function () {
        $("#search-form .form-control").focus();
        var id = $(this).attr('id');
        clearHiddenIpuut();
        $("#search-option .search-filter").each(function (index) {
            if (id == $(this).attr('id')) {
                $(this).addClass("selected");
                switch (id) {
                    case "search-filter-all-blogs":
                        $("#search-form .input-group").prepend("<input type=\"hidden\" name=\"refinement\" value=\"" + refinementValue + "\" />");
                        break;
                    case "search-filter-this-blog":
                        var homeUrl = $("#search-form").attr("home-url");
                        var rn = homeUrl.substring(homeUrl.lastIndexOf("/") + 1);
                        var rq = homeUrl.replace("https://", "").replace("http://", "");
                        $("#search-form .input-group").prepend("<input type=\"hidden\" name=\"rn\" value=\"" + rn + "\" />");
                        $("#search-form .input-group").prepend("<input type=\"hidden\" name=\"rq\" value=\"site:" + rq + "\" />");
                        break;
                }
            }
            else {
                $(this).removeClass("selected");
            }
        });
    });

    function clearHiddenIpuut() {
        var names = ["refinement", "rn", "rq"];
        for (var i in names) {
            $("#search-form [name='" + names[i] + "']").remove();
        }
    }

})();