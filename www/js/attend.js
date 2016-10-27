/* var myApp = angular.module('newApp', ['ionic']);

myApp.controller('MainCtrl', function() {
  this.items = [];
  for (var i = 1; i <= 72; i++) this.items.push(i);
});

*/



angular.module('newApp', ['ionic'])
.controller('MainCtrl',function($scope, $ionicPopup, $timeout,$ionicHistory,$stateProvider,$urlRouterProvider) {

  

  $scope.toggle = function() {
        $scope.myVar = !$scope.myVar;
    };


 this.items = [];
  for (var i = 1; i <= 72; i++) this.items.push(i);


 // Triggered on a button click, or some other target

$scope.showPost=false;
$scope.showView=false;
$scope.showStats=false;

$scope.attendpost=function(){
$scope.showPost=true;
$scope.apply();

}





 $scope.showPopup = function() {
   $scope.data = {}

   // An elaborate, custom popup <input type="text" ng-model="data.wifi">
   var myPopup = $ionicPopup.show({
     template: '<h3>Select Batch</h3><select><option>14MCA</option><option selected>15MCA</option><option>16MCA</option></select></br><input type="text" ng-model="data.wifi">',
     title: 'Enter Date',
     subTitle: 'dd/mm/yyyy',
     scope: $scope,
     buttons: [
       { text: 'Cancel' },
       {
         text: '<b>See</b>',
         type: 'button-positive',
         onTap: function(e) {
           if (!$scope.data.wifi) {
             //don't allow the user to close unless he enters wifi password
             e.preventDefault();
           } else {
             return $scope.data.wifi;
           }
         }
       },
     ]
   });
   myPopup.then(function(res) {
     console.log('Tapped!', res);
     var alertPopup = $ionicPopup.alert({
       title: 'Thank you',
       template: 'Attendance Posted Successfully'
     });
   });
   $timeout(function() {
     myPopup.close(); //close the popup after 3 seconds for some reason
   }, 15000);
  };
   // A confirm dialog
   $scope.showConfirm = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Consume Ice Cream',
       template: 'Are you sure you want to eat this ice cream?'
     });
     confirmPopup.then(function(res) {
       if(res) {
         console.log('You are sure');
       } else {
         console.log('You are not sure');
       }
     });
   };

   // An alert dialog
   $scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Don\'t eat that!',
       template: 'It might taste good'
     });
     alertPopup.then(function(res) {
       console.log('Thank you for not eating my delicious ice cream cone');
     });
   };
});