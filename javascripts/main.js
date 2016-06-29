var CREST = {
    client_id:"f8f3a75e20b94a25b9c1634aa382a63c",
    redirect_uri:encodeURIComponent("https://quigleyj97.github.io/CREST-Testing/"),
    response_type:"token",
    auth_endpoint:"https://login.eveonline.com/oauth/authorize/",
    ssoRedirect: function ()    {
        var requestString = this.auth_endpoint +
            "?response_type=" + this.response_type +
            "&redirect_uri="  + this.redirect_uri +
            "&state=" + CRESTapp.state +
            "&scope=" + "characterSkillsRead";

        d3.select("#sso_btn").attr("disabled", "disabled");

        window.location = requestString;
    }
};

var CRESTapp    =   {
    state : "init",
};