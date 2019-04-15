/**
 * Ajax-retrieve for social counts.
 */
window.msdnsocial = window.msdnsocial || {};
(function () {
    window.msdnsocial.siteList = new Array(
        {
            'name': 'twitter',
            'url': 'https://public.newsharecounts.com/count.json?url=',
            'type': 'json',
            'keys': ['count'],
            'selector': 'post_tweet_count',
            'isArray': false
        },
        {
            'name': 'linkedin',
            'url': 'https://www.linkedin.com/countserv/count/share?format=jsonp&url=',
            'type': 'jsonp',
            'keys': ['count'],
            'selector': 'get_post_linkedin_count',
            'isArray': false
        }
    );
    window.msdnsocial.ajax = function (permalink) {
        for (site in window.msdnsocial.siteList) {
            callApi(window.msdnsocial.siteList[site], permalink);
        }
    }

    function callApi(site, permalink) {
        jQuery.ajax({
            url: site.url + permalink,
            type: 'GET',
            dataType: site.type,
            success: function (rdata) {
                if (site.isArray) {
                    rdata = rdata[0];
                }
                for (var i = 0; i < site.keys.length; i++) {
                    if (rdata && typeof rdata[site.keys[i]] !== 'undefined') {
                        rdata = rdata[site.keys[i]];
                    }
                }
                if (typeof rdata !== 'undefined') {
                    setField(site.selector, rdata);
                }
            },
        });
    }

    function setField(selector, data) {
        document.getElementById(selector).innerHTML = data;
    }
})();

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.8";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

