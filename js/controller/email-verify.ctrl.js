app.controller('emailVerifyCtrl', function($scope) {
    var email = 'arpit11@roofpik.com';
    var password = '123123';
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(response) {
        	console.log(response.uid);
            var user = firebase.auth().currentUser;
            var newPassword = '123124';
            user.updatePassword(newPassword).then(function() {
                // Update successful.
            }, function(error) {
                // An error happened.
            });
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });




})
