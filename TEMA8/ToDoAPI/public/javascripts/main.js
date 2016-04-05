var todoapp = angular.module('todoApp', ['ui.router']);

todoapp.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('index', {
      url: "/",
      templateUrl: "/templates/index.html",
      controller: function($scope) {
        console.log($scope)
      }
    })
    .state('list', {
      url: "/list",
      templateUrl: "/templates/list.html",
      controller: function($scope, $http) {
        // console.log($scope)
        $scope.items = ["A", "List", "Of", "Items"];
        $http.get('/api/list').then(
                                      function(res){
                                        console.log(res)
                                        $scope.tareas = res.data
                                      }
                                    ,
                                      function(error){
                                        console.log(error)
                                      }
                                    )
      },
    })
    // .state('ficha', {
    //   url: "/state2",
    //   templateUrl: "partials/state2.html"
    // })
    // .state('state2.list', {
    //   url: "/list",
    //   templateUrl: "partials/state2.list.html",
    //   controller: function($scope) {
    //     $scope.things = ["A", "Set", "Of", "Things"];
    //   }
    // });
});