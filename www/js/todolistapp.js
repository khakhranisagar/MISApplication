// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module("todoList", ["ionic", "firebase"])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

/** Fabrica para tener la referencia al objeto en firebase */
.factory("ToDos", function($firebaseArray) {
  var toDosRef = new Firebase("https://betodolist.firebaseio.com/ToDos");
  return $firebaseArray(toDosRef);
})

/** Controlador encargado de procesar las todos */
.controller("TodoListCtrl", function($scope, ToDos, $ionicPopup, $ionicLoading) {

  $ionicLoading.show({
    template: 'Loading...'
  });

  /** Configuraciones para la lista */
  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true

  /** Se obtiene la referencia al objeto que contiene los ToDos */
  $scope.toDos = ToDos;

  $scope.toDos.$loaded().then(function (todo) {
      $ionicLoading.hide();
  });

  /** Funcion encargada de eliminar un ToDo */
  $scope.eliminar = function (item) {

    $scope.toDos.$remove(item).then(function(ref) {
      ref.key() === item.$id; // true
      console.log("ID: " + item.$id + " was removed");
    });

  }

  /** Funcion encargada de editar un ToDo */
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

  /** Funcion encargada de Agregar un ToDo */
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
                  "name": $scope.data.toDoNuevo
                });

                return $scope.data.toDoNuevo;
              }
            }
          }
        ]
      });

  };
});
