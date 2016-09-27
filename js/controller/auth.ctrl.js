app.controller('authCtrl', function($scope, authentication, $q, $rootScope) {
    $scope.user = {};

    // firebase.auth().signOut();

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

   function getReferralCode(fname, lname) {
        var refchar;
        var refnum;
        // console.log(fname);
        fname = replaceSpaces(fname);
        var fnameLength = fname.length;
        // console.log(fname);
        if (fnameLength > 4) {
            refchar = fname.substring(0, 4);
        } else {
            refchar = fname.substring(0, fnameLength) + lname.substring(0, (4 - fnameLength));
        }
        refnum = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        // console.log(refchar + refnum);
        return refchar + refnum;
    }


       function replaceSpaces(str) {
        var mystring = str;
        var newchar = ' '
        mystring = mystring.split('.').join(newchar);
        mystring = mystring.replace(/ /g, '')
        return mystring;
    }


    $scope.register = function() {
        $('#gl-circle-loader-wrapper').fadeIn();
        var postData = {
            fname: $scope.user.firstname,
            lname: $scope.user.lastname,
            email:{
                emailAddress: $scope.user.email,
                emailVerified: false
            },
            
            mobile: {
              mobileNum:  $scope.user.mobile,
              mobileVerified: false
            },
            createdDate: new Date().getTime(),
            referral: null
        };

        var q = $q.defer();


        var emailDuplicate = $scope.user.email.replace(".", "--");
        emailDuplicate = emailDuplicate.replace("@", "*");

        var t = authentication.checkifuserexists(emailDuplicate, $scope.user.mobile, q);
        t.then(function(response) {

            if (!response.userExists) {
                postData.referral = getReferralCode(postData.fname, postData.lname);
                q = $q.defer();
                var r = authentication.signup(postData, emailDuplicate, $scope.user.password, q);
                r.then(function(response1) {
                    $('#gl-side-menu-close-button').click();
                    $('#gl-circle-loader-wrapper').hide();
                    swal("Welcome!", "You have successfully registered!", "success");
                    $rootScope.loginStatus = true;

                })
            } else {
                $('#gl-side-menu-close-button').click();
                $('#gl-circle-loader-wrapper').hide();
            }
        }, function(errors) {
            
            $('#gl-circle-loader-wrapper').hide();
            swal("Not registered!", "You are already registered!", "error");
        });
        // Get a key for a new Post.

    }

    $scope.login = function() {
    	$('#gl-circle-loader-wrapper').show();
        var q = $q.defer();
        var login = authentication.login($scope.user.email, $scope.user.password, q);
        login.then(function(response) {
        	 $('#gl-side-menu-close-button').click();
            $('#gl-circle-loader-wrapper').hide();
            $rootScope.loginStatus = true;
            swal("Welcome!", "You have successfully loged in!", "success");
        }, function(error) {
        	$('#gl-circle-loader-wrapper').hide();
           swal("Not Logged In!", "Invalid email or password!", "error");
        })
    };

    $scope.forgetPassword = function() {
    	$('#gl-circle-loader-wrapper').fadeIn();
        var q = $q.defer();
        var reset = authentication.forgetPassword($scope.user.email, q);
        reset.then(function(response) {
        	 $('#gl-side-menu-close-button').click();
        	$('#gl-circle-loader-wrapper').hide();
            swal("Email sent!", "Please check your email to reset your password!", "success");
        }, function(error) {
        	$('#gl-circle-loader-wrapper').hide();
        	swal("Email not sent!", "Invalid email!", "error");
            console.log(error);
        })

    }

});


app.service('authentication', function() {

    return {
        checkifuserexists: function(email, mobile, q) {
            db.ref('userRegistration/email/' + email).once('value', function(snapshotEmail) {

                db.ref('userRegistration/mobile/' + mobile).once('value', function(snapshotMobile) {

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
            console.log(userdata);


            firebase.auth().createUserWithEmailAndPassword(userdata.email.emailAddress, password).then(function(user) {
                updates['/users/' + user.uid] = userdata;
                updates['/userRegistration/emails/' + emaild] = user.uid;
                updates['/userRegistration/mobile/' + userdata.mobile.mobileNum] = user.uid;
                updates['/userRegistration/referrals/' + userdata.referral] = user.uid;
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
