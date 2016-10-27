angular.module('starter.controllers', ['firebase'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$firebaseObject,$firebaseAuth,$firebaseArray,$filter,$state,$ionicPopup) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
/*   
*/
$scope.currentUser=null;


  var ref=firebase.database().ref();
$scope.name=$firebaseObject(ref);
var newref=new firebase.database().ref('/events'); 
newref.on('child_added', function(data) {
 console.log(data.val().date, data.val().name);  
}); 
  var events=$firebaseArray(newref);

$scope.mylogin=function(username,pword)
{
  //alert(username+" "+pword);
var fbAuth=$firebaseAuth();
fbAuth.$signInWithEmailAndPassword(username,pword).then(function(authData){
alert("Successfully Logged In");
$state.go('app.mymenu');

}).catch(function(error){
alert("error while Logging In "+error);
});
}
/*------------*/

$scope.mynewregister=function(email,password)
{
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
showAlert("Errors Occured"+error);
});

}

$scope.test=function(username,password){
  alert(username+" "+password);


}
/****---Academic Start-----*******/


 var date = new Date();
            $scope.today = $filter('date')(new Date(), 'dd/MM/yyyy');


  $scope.myevents=events;
$scope.myfun=function(){

  alert();
}
  

 

/****---Academic End-----*******/

/*-----Alert--*/
$scope.showAlert = function(message) {
   var alertPopup = $ionicPopup.alert({
     title: 'Don\'t eat that!',
     template: message
   });

/*-----Alert--*/


$scope.registerWithGoogle=function(){
var fbAuth=$firebaseAuth();
var provider = new firebase.auth.GoogleAuthProvider();

provider.addScope('https://www.googleapis.com/auth/plus.login');

fbAuth.$signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  //var currentUser = result.user;
  console.log(user);
  $state.go('app.mymenu');
  // ...
}).catch(function(error) {
  // Handle Errors here.
  alert(error);
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});

}


/**-----------*/

$scope.myregister=function(username,password)
{
  alert("fu"+" "+username +" "+ password);

var fbAuth=$firebaseAuth(ref);
fbAuth.$createuser(username,password).then(function(){

return fbAuth.$authWithPassword({
  email:username,
  password:password
});
}).then(function(authData){
alert("Successfully signed up");

}).catch(function(error){

alert("Error Sign Up :"+error);
});
}



/*----------*/
/*var users = $firebase(ref.child('users')).$asArray();
 
    var User = {
      all: users,
      create: function (user) {
        return users.$add(user);
      },
      get: function (userID) {
        return $firebase(ref.child('users').child(userID)).$asObject();
      },
      delete: function (user) {
        return messages.$remove(user);
      }
    };
*/
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

var x=$scope.loginData.username;
var y=$scope.loginData.password;



alert(x + y);
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 60000);
  };


/***********************************/
 $scope.signupData = {};

var accountRef=new firebase.database().ref('/accounts');

    $scope.branches = ["Institute Of Technology", "Institute Of Management", "Institute Of Law",
    "Institute Of Pharmacy,Institute Of Science","Institute Of Architecture"];

 

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/signup.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal2 = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeSignup = function() {
    $scope.modal2.hide();
  };

  // Open the login modal
  $scope.signup = function() {
    $scope.modal2.show();
   // $scope.modal.hide();
  };

$scope.getDepartment=function(dept)
{
$scope.signupData.department=dept;

}

  // Perform the login action when the user submits the login form
  $scope.doSignup = function() {
    console.log('Doing login', $scope.signupData);


   // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 60000);
  };


$scope.createAccount=function(){
var newAccount= {
    "firstname":$scope.signupData.firstname,
    "lastname": $scope.signupData.lastname,
    "email": $scope.signupData.email,
    "contact":$scope.signupData.contact,
    "department": $scope.signupData.department,
    "password": $scope.signupData.password
  }

//alert(newAccount);
$scope.mynewregister($scope.signupData.email,$scope.signupData.password);
accountRef.set(newAccount);
showAlert("Your Account has been created");
}


/*------------------*/



  $ionicModal.fromTemplateUrl('templates/postattendance.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal3 = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeattend = function() {
    $scope.modal3.hide();
  };

  // Open the login modal
  $scope.postattend = function() {
    $scope.modal3.show();
   // $scope.modal.hide();
  };

  // Perform the login action when the user submits the login form
  $scope.postedattend = function() {
    console.log('Doing login', $scope.loginData);


    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 60000);
  };



  $ionicModal.fromTemplateUrl('templates/postattendance2.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal4 = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeattend2 = function() {
    $scope.modal4.hide();
  };

  // Open the login modal
  $scope.postattend2 = function() {
    $scope.modal4.show();
   // $scope.modal.hide();
  };

  // Perform the login action when the user submits the login form
  $scope.postedattend2 = function() {
    console.log('Doing login', $scope.loginData);


    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 60000);
  };










$scope.attendsuccess=function(){
  $scope.modal3.hide();

var alertPopup = $ionicPopup.alert({
     title: 'Message',
     template: 'Attendance Posted Successfully'
   });


};

  
/***********************************/









/*
.controller('PlaylistsCtrl', function($scope) {




  
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
/*

$scope.myownpopup=function(){


var myPopup = $ionicPopup.show({
    template: '<input type="password" ng-model="data.wifi">',
    templateUrl:'templates/mytemp.html'
    title: 'Enter Wi-Fi Password',
    subTitle: 'Please use normal things',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.wifi) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            return $scope.data.wifi;
          }
        }
      }
    ]
  });

  myPopup.then(function(res) {
    console.log('Tapped!', res);
  });

  $timeout(function() {
     myPopup.close(); //close the popup after 3 seconds for some reason
  }, 3000);
 };





}


});
*/

