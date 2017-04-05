angular
 .module("project4", [
  "ui.router",
  "ngResource"
 ])
 .config([
  "$stateProvider",
  "$urlRouterProvider",
  RouterFunction
 ])
 .factory("ItemFactory", [
  "$resource",
  "$http",
  ItemFactoryFunction
 ])
 .controller("ItemIndexController", [
  "ItemFactory",
  "$state",
  "$scope",
  ItemIndexControllerFunction
 ])
 .controller("ItemNewController", [
  "ItemFactory",
  "$state",
  ItemNewControllerFunction
 ])
 .controller("ItemShowController", [
  "ItemFactory",
  "$state",
  "$stateParams",
  ItemShowControllerFunction
 ])


 function RouterFunction($stateProvider, $urlRouterProvider){
  $stateProvider
  .state("index", {
    url: "/items",
    templateUrl: "/assets/js/ng-views/index.html",
    controller: "ItemIndexController",
    controllerAs: "vm"
  })
  .state("new", {
    url: "/items/new",
    templateUrl: "/assets/js/ng-views/new.html",
    controller: "ItemNewController",
    controllerAs: "vm"
  })
  .state("show", {
    url: "/items/:title",
    templateUrl: "/assets/js/ng-views/show.html",
    controller: "ItemShowController",
    controllerAs: "vm"
  })
  $urlRouterProvider.otherwise("items")
 }

 function ItemFactoryFunction( $resource, $http){
  return $resource("/api/items/:title/:action", {}, {
    update: {method: "PUT"}
  })
}

 function ItemIndexControllerFunction(ItemFactory, $state, $scope){
  this.items = ItemFactory.query()
  $scope.items = ItemFactory.items
  $scope.increaseUpvotes = function(item){
      var self = this;
      this.item.$update({title: item._id, action: 'upvote'}).then(function(a,b){
        console.log(a);
        self.upvotes +=1
      });
  }

 }

 function ItemNewControllerFunction(ItemFactory, $state){

  this.item = new ItemFactory()
  this.create = function(){
    this.item.$save().then(function(item){
      $state.go("show", { title: item.title})
    })


  }
 }

 function ItemShowControllerFunction( ItemFactory, $state, $stateParams){
  this.item = ItemFactory.get({title: $stateParams.title})
  this.destroy = function(){
    this.item.$delete({ title: $stateParams.title}).then(function(){
      $state.go("index")
    })
  }
  this.update = function(){
      this.item.$update({ title: $stateParams.title})
    }

  }
