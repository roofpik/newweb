app.controller('authCtrl', function($scope, authentication, $q, $rootScope) {
    $scope.user = {};

    firebase.auth().signOut();

    $scope.showSignup = function() {
        $('.login').hide();
        $('.forgetpassword').hide();
        $('.signup').show();
    };

    $scope.showLogin = function() {
        $('.forgetpassword').hide();
        $('.signup').hide();
        $('.login').show();
    };

    $scope.showForgetPassword = function() {
        $('.login').hide();
        $('.signup').hide();
        $('.forgetpassword').show();
    };

    function getReferralCode() {
        var refchar;
        var refnum;
        $scope.user.fname = replaceSpaces($scope.user.fname);
        var fnameLength = $scope.user.fname.length;
        if (fnameLength > 4) {
            refchar = $scope.user.fname.substring(0, 4);
        } else {
            refchar = $scope.user.fname.substring(0, fnameLength) + $scope.user.lname.substring(0, (4 - fnameLength));
        }
        refnum = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        return refchar + refnum;
    }


    $scope.register = function() {
        $('#gl-circle-loader-wrapper').fadeIn();
        var postData = {
            fname: $scope.user.firstname,
            lname: $scope.user.lastname,
            email: $scope.user.email,
            mobile: $scope.user.mobile,
            createdTime: new Date().getTime(),
            mobileFlag: false,
            emailFlag: false
        };

        var q = $q.defer();


        var emailDuplicate = $scope.user.email.replace(".", "--");
        emailDuplicate = emailDuplicate.replace("@", "*");

        var t = authentication.checkifuserexists(emailDuplicate, $scope.user.mobile, q);
        t.then(function(response) {

            if (!response.userExists) {
                q = $q.defer();
                var r = authentication.signup(postData, emailDuplicate, $scope.user.password, q);
                r.then(function(response1) {
                    $('#gl-side-menu-close-button').click();
                    $('#gl-circle-loader-wrapper').fadeOut();
                    swal("Welcome!", "You have successfully registered!", "success");
                    $rootScope.loginStatus = true;

                })
            } else {
                $('#gl-side-menu-close-button').click();
                $('#gl-circle-loader-wrapper').hide();
            }
        }, function(errors) {
            $('#gl-side-menu-close-button').click();
            $('#gl-circle-loader-wrapper').hide();
            alert("User already exists");
        });
        // Get a key for a new Post.

    }

    $scope.login = function() {
        var q = $q.defer();
        var login = authentication.login($scope.user.email, $scope.user.password, q);
        login.then(function(response) {
            console.log(response);
            $rootScope.loginStatus = true;
        }, function(error) {
            console.log(error);
        })
    };

    $scope.forgetPassword = function() {

        var q = $q.defer();
        var reset = authentication.forgetPassword($scope.user.email, q);
        reset.then(function(response) {
            console.log(response);
        }, function(error) {
            console.log(error);
        })

    }

});


app.service('authentication', function() {

    return {
        checkifuserexists: function(email, mobile, q) {
            db.ref('temp/email/' + email).once('value', function(snapshotEmail) {

                db.ref('temp/mobile/' + mobile).once('value', function(snapshotMobile) {

                    if ((snapshotMobile.val() != null) || (snapshotEmail.val() != null)) {
                        q.reject({
                            userExists: true
                        });
                    } else {
                        q.resolve({
                            userExists: false
                        });
                    }
                });
            });
            return q.promise;
        },

        signup: function(userdata, emaild, password, q) {
            // Write the new post's data simultaneously in the posts list and the user's post list.
            var updates = {};
            var registered;


            firebase.auth().createUserWithEmailAndPassword(userdata.email, password).then(function(user) {
                updates['/users/' + user.uid] = userdata;
                updates['/tempUsers/email/' + emaild] = user.uid;
                updates['/tempUsers/mobile/' + userdata.mobile] = user.uid;
                var user = firebase.auth().currentUser;
                user.updateProfile({
                    displayName: userdata.fname + ' ' + userdata.lname
                }).then(function() {

                    db.ref().update(updates).then(function() {
                        console.log("done");
                        q.resolve({
                            registered: true
                        });

                    });
                    // Update successful.
                }, function(error) {
                    // An error happened.
                });



            }).catch(function(error) {
                // Handle Errors here.
                q.reject({
                    registered: false
                });
                // ...




            });
            return q.promise;

        },

        login: function(email, password, q) {

            firebase.auth().signInWithEmailAndPassword(email, password).then(function(response) {

                q.resolve({
                    login: true,
                    userId: response.uid,
                    custName: response.displayName
                });

            }).catch(function(error) {

                // Handle Errors here.
                q.reject({
                    login: false
                });
                // ...
            });
            return q.promise;
        },

        forgetPassword: function(email, q) {
            var auth = firebase.auth();
            auth.sendPasswordResetEmail(email).then(function() {

                q.resolve({
                    email: true
                });
                // Email sent.
            }, function(error) {
                q.reject({
                    email: false
                });
                // An error happened.
            });

            return q.promise;
        }

    };


})
