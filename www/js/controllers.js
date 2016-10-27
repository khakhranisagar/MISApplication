angular.module('starter.controllers', ['firebase'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$firebaseObject,$firebaseAuth,$firebaseArray,$filter,$state,$ionicPopup,$ionicLoading) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
/*   
*/
$scope.currentUser=null;


$scope.myobj1 = {
        
        "background-color" : "#AED8ED",
        "border" : "solid 1px"
        
    }

    $scope.myobj2 = {
        
        "background-color" : "#EEF6FB",
        "border" : "solid 1px"
    }

    $scope.myobj4 = {
        
        "background-color" : "#6A7B83",
        
    }




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
$scope.showAlert("Successfully Logged In AS "+authData.uid);
$state.go('app.mymenu');
$scope.currentUser=username;
}).catch(function(error){
$scope.showAlert("error while Logging In "+error);
});
}
/*------------*/

$scope.mynewregister=function(email,password)
{
firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
$scope.showAlert("Your Account Has Been Created Kindly Verify Your Email by the link which is sent to you.\n Thank you \n MIS Team");

}).catch(function(error) {
  // Handle Errors here.
$scope.showAlert("Errors Occured"+error);
});

}

$scope.signOut=function(){

firebase.auth().signOut().then(function() {
  $scope.showAlert("You Are Signed Out");
  $state.go('app.sign-in');


  // Sign-out successful.
}, function(error) {
  // An error happened.
    $scope.showAlert("Error"+error);

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
/*-----------*/







                                                  /*-- my todo */

var myUser=$scope.currentUser;
var todoref=new firebase.database().ref('/todos/'); 

  var todo=$firebaseArray(todoref);
  $scope.toDos=todo;
  $scope.mytoDo={};

   angular.forEach($scope.toDos, function(newtoDo) {

      if(newtoDo.user===$scope.currentUser)
      {
     
            $scope.mytoDo.$add({"name" : newtoDo.name});
    }


        })


   /*$ionicLoading.show({
    template: 'Loading...'
  });

*/
 $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true;

/*$scope.toDo.$loaded().then(function (todo) {
      $ionicLoading.hide();
  });
*/
/*--Function responsible for removing a ToDo--*/
$scope.eliminar = function (item) {

    $scope.toDos.$remove(item).then(function(ref) {
      ref.key === item.$id; // true
      console.log("ID: " + item.$id + " was removed");
    });

  }

/*--Function responsible for editing a ToDo--*/
$scope.editar = function (toDo) {

    $scope.data = {
      "toDoEditado": toDo.name
    };

      var myPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="data.toDoEditado">',
        title: 'What are you going to do?',
        scope: $scope,
        buttons: [
          { text: 'Cance1' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {

              console.log($scope.data.toDoEditado);
              if (!$scope.data.toDoEditado) {
                console.log("No income nothing");
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                console.log("Entry " +  $scope.data.toDoEditado);

                toDo.name = $scope.data.toDoEditado;

                $scope.toDos.$save(toDo).then(function(ref) {
                  ref.key() === toDo.$id; // true
                  console.log("Editado registro " + toDo.$id);
                });

                return $scope.data.toDoEditado;
              }
            }
          }
        ]
      });
  }




/*--Function responsible for adding a ToDo--*/

$scope.agregar = function() {

    $scope.data = {};

      var myPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="data.toDoNuevo">',
        title: 'What are you going to do?',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {

              console.log($scope.data.toDoNuevo);
              if (!$scope.data.toDoNuevo) {
                console.log("No Entry Found");
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                console.log("Entry " +  $scope.data.toDoNuevo);

                /** Se guadar en firebase */
                $scope.toDos.$add({
                  "name": $scope.data.toDoNuevo,
                  "user":$scope.currentUser
                });

                return $scope.data.toDoNuevo;
              }
            }
          }
        ]
      });

  }













/*-- my todo */

/*----Shared To Do---------*/


var sharedtodoref=new firebase.database().ref('/sharedtodos/'); 


  var sharedtodo=$firebaseArray(sharedtodoref);
  $scope.sharedtoDos=sharedtodo;

var mysharedtodoref=new firebase.database().ref('/mysharedtodos/'); 
  var newsharedtodo=$firebaseArray(mysharedtodoref);

  $scope.mysharedtoDos=newsharedtodo;




angular.forEach($scope.sharedtoDos, function(sharednewtoDo) {

      if(sharednewtoDo.to==$scope.currentUser)
      {
             
            $scope.mysharedtoDos.$add({"name" : sharednewtoDo.name,
                "from":sharednewtoDo.from,
                "to":$scope.currentUser


          });



    }


        })







angular.forEach($scope.sharedtoDos, function(sharednewtoDo) {

      if(sharednewtoDo.from==$scope.currentUser)
      {
             
            $scope.mysharedtoDos.$add({"name" : sharednewtoDo.name,
                "from":$scope.currentUser,
                "to":sharednewtoDo.to


          });



    }


        })







/*

$scope.newTest=function()
{
$scope.showAlert($scope.mysharedtoDos.name);
}*/
   /*$ionicLoading.show({
    template: 'Loading...'
  });

*/
 $scope.sharedshouldShowDelete = false;
  $scope.sharedshouldShowReorder = false;
  $scope.sharedlistCanSwipe = true;

/*$scope.toDo.$loaded().then(function (todo) {
      $ionicLoading.hide();
  });
*/
/*--Function responsible for removing a ToDo--*/
$scope.sharedeliminar = function (item) {

    $scope.sharedtoDos.$remove(item).then(function(ref) {
      ref.key === item.$id; // true
      console.log("ID: " + item.$id + " was removed");
    });

  }

/*--Function responsible for editing a ToDo--*/
$scope.sharededitar = function (sharedtoDo) {

    $scope.data = {
      "toDoEditado": sharedtoDo.name,
        "sharedto":sharedtoDo.sharedto
    };

      var myPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="data.sharedtoDoEditado"><input type="text" ng-model="data.sharedto">',
        title: 'Editing Your Task',
        scope: $scope,
        buttons: [
          { text: 'Cance1' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {

              console.log($scope.data.sharedtoDoEditado);
              if (!$scope.data.sharedtoDoEditado) {
                console.log("editing cancelled");
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                console.log("Entry " +  $scope.data.sharedtoDoEditado);

                sharedtoDo.name = $scope.data.sharedtoDoEditado;
                sharedtoDo.sharedto=$scope.data.sharedto;

                $scope.sharedtoDos.$save(sharedtoDo).then(function(ref) {
                  ref.key() === toDo.$id; // true
                  console.log("Editado registro " + toDo.$id);
                });

                return $scope.data.sharedtoDoEditado;
              }
            }
          }
        ]
      });
  }




/*--Function responsible for adding a ToDo--*/

$scope.sharedagregar = function() {

    $scope.data = {};

      var myPopup = $ionicPopup.show({
        template: '<input type="text" placeholder="Enter Your Task" ng-model="data.sharedtoDoNuevo"><input type="text" placeholder="Name of person to share with" ng-model="data.sharedto">',
        title: 'Adding a group task',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {

              console.log($scope.data.sharedtoDoNuevo);
              if (!$scope.data.sharedtoDoNuevo && !$scope.data.sharedto) {
                console.log("No Entry Found");
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                console.log("Entry " +  $scope.data.sharedtoDoNuevo);

                /** Se guadar en firebase */
                $scope.sharedtoDos.$add({
                  "name": $scope.data.sharedtoDoNuevo,
                    "to":$scope.data.sharedto,
                    "from":$scope.currentUser

                });

                return $scope.data.sharedtoDoNuevo;
              }
            }
          }
        ]
      });

  }













/*------Sharedtodo---------------*/

/*------Alert---*/
$scope.showAlert = function(message) {
   var alertPopup = $ionicPopup.alert({
     title: 'Message',
     template: message
   });

   alertPopup.then(function(res) {
     console.log('Popup Shown for'+message);
   });
 };

                                                                                            /*------Alert---*/



$scope.registerWithGoogle=function(){
var fbAuth=$firebaseAuth();
var provider = new firebase.auth.GoogleAuthProvider();

provider.addScope('https://www.googleapis.com/auth/plus.login');
                                                                        /*--------Google Auth-----------------*/
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
                                                              /*--------Old Register-----------------*/
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
                                                        /*--------Login Popup-----------------*/
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
  var accounts=$firebaseArray(accountRef);
$scope.newId=accounts.length+1;






  


    $scope.branches = ["Institute Of Technology", "Institute Of Management", "Institute Of Law",
    "Institute Of Pharmacy,Institute Of Science","Institute Of Architecture"];

                   

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/signup.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal2 = modal;
  });
                                                                                /*--------Sign Up-----------------*/
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
                                                                        /*--------Login-----------------*/

$scope.createAccount=function(){
var newAccount= {
    "firstname":$scope.signupData.firstname,
    "lastname": $scope.signupData.lastname,
    "email": $scope.signupData.email,
    "contact":$scope.signupData.contact,
    "department": $scope.signupData.department,
    "password": $scope.signupData.password
  }


 /*
newaccountref.set({ newID : { 
"firstname":$scope.signupData.firstname,
    "lastname": $scope.signupData.lastname,
    "email": $scope.signupData.email,
    "contact":$scope.signupData.contact,
    "department": $scope.signupData.department,
    "password": $scope.signupData.password
  
}});
    
*/



//alert(newAccount);
//accountRef.child($scope.newId).set(newAccount);
accounts.$add(newAccount).then(function(result){
  

});
$scope.mynewregister($scope.signupData.email,$scope.signupData.password);

}


/*---------New Account End---------*/

/*-------Search User-----------*/
var usersref=new firebase.database().ref('/users/'); 

  var users=$firebaseArray(usersref);
  $scope.Users=users;

$scope.showusers=function(){

accounts.$loaded()
    .then(function(){ 
        angular.forEach(accounts, function(account) {
            $scope.Users.$add({"fullName" : account.firstname+" "+account.lastname,
              "email":account.email});
        })
    });
$scope.showAlert(Users);

}

var friendRequestref=new firebase.database().ref('/friendRequests/'); 

  var friendrequests=$firebaseArray(friendRequestref);
  $scope.friendRequests=friendrequests;

$scope.user={};
$scope.sendrequest=function(user)
{
   


if($scope.currentUser!=null)
{
  $scope.friendRequests.$add({
        "from":$scope.currentUser,
          "to":user.email,
          "fromname":user.fullName
       });
  $scope.showAlert("Request Sent Successfully");
}else{
  $scope.showAlert("You Are Not Signed in Properly \n Kindly SignOut and Sign In Again");
}
       

       


}

$scope.viewRequests=function()
{
  var myrequests={};
  $scope.showRequests=false;
  friendrequests.$loaded()
    .then(function(){ 
        angular.forEach(friendrequests, function(friendrequest) {
            if(friendrequest.to===$scope.currentUser)
                myrequests.$add({"fullName":friendrequest.fromname,
                  "requestFrom":friendrequest.from
              });
        })
    });

if(myrequests.length>0)
{
  $scope.showRequests=true;
}
}











/*-------Search User End-----------*/
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
                                                                  /*--------Attendance-----------------*/
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









})

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
*/

});
