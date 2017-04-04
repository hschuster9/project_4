angular
.module("project4", [
  "ui.router",
  "ngResource"
])
.config([
  "$stateProvider",
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


function RouterFunction($stateProvider){
  $stateProvider
  .state("welcome", {
    url: "/",
    templateUrl: "/assets/js/ng-views/welcome.html"
  })
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
}

function ItemFactoryFunction( $resource, $http){
  return $resource("/api/items/:title", {}, {
    update: {method: "PUT"}
  })
  var items_array = {
    items: []
  }
  items_array.upvote = function(item){
    return $http.put('/items/'+ item.title+"/upvote").success(function(data){
    item.upvotes += 1
  })
}
  return items_array
}

function ItemIndexControllerFunction(ItemFactory, $state, $scope){
  this.items = ItemFactory.query()
  $scope.items = ItemFactory.items
  $scope.increaseUpvotes = function(item){
      item.upvotes +=1
      this.item.update= function(){
        this.item.$update({title: $stateParam.title})
      }
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
