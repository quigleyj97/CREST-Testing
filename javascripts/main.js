var CREST = {
    client_id:"f8f3a75e20b94a25b9c1634aa382a63c",
    redirect_uri:encodeURIComponent("https://quigleyj97.github.io/CREST-Testing/"),
    scope:encodeURIComponent("publicData characterAssetsRead characterCalendarRead"),
    response_type:"code",
    auth_endpoint:"https://login.eveonline.com/oauth/authorize/",
    tranquility:"https://crest-tq.eveonline.com/",
    ssoRedirect: function ()    {
        var requestString = this.auth_endpoint +
            "?response_type=" + this.response_type +
            "&redirect_uri="  + this.redirect_uri +
            "&client_id=" + this.client_id +
            "&state=" + CRESTapp.state +
            "&scope=" + this.scope;

        d3.select("#sso_btn").attr("disabled", "disabled");

        window.location = requestString;
    },

};

var CRESTapp    =   {
    state : "init",

    parseRoot : function(err, response)    {
        if (err) throw err;

        var root = JSON.parse(response.responseText);

        console.log(root);
    }
};

function getQueryVariable(variable) {
    // CREST returns with a hash for implicit flow or query string for auth flow
    var query = window.location.search.substring(1) || window.location.hash.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}
window.onload = function()  {
    if(getQueryVariable("state")) {
        // we have been authorized
        console.log("success!", getQueryVariable("state"));
        d3.select("#api_out").append("pre").text("Authorization Successful! authcode='" + getQueryVariable("access_token") + "'");
        var request = d3.request("https://crest-tq.eveonline.com/")
            .header("Authorization", "Bearer " + getQueryVariable("access_token"))
            .get(CRESTapp.parseRoot);
        console.log(request);
    }
};