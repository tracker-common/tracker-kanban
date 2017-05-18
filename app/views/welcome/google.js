    <head>
    //Specify client's ID
        <meta name="google-signin-client_id" content="569976604919-hmipa5tk1gjat8h4k13pviegsuo7e4fe.apps.googleusercontent.com">
    </head>
    <body>
    //Adding button
    //<div class="g-signin2" data-onsuccess="onSignIn"></div>
    <div id="my-signin2"></div>
    <script>
    function onSuccess(googleUser) {
	console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    }
function onFailure(error) {
    console.log(error);
}
function renderButton() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}
</script> 
    //Google platform library
    <script src="https://apis.google.com/js/platform.js" async defer></script>
</body>
