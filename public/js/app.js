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
  ItemFactoryFunction
])
.controller("ItemIndexController", [
  "ItemFactory",
  "$state",
  ItemIndexControllerFunction
])


function RouterFunction($stateProvider){
  $stateProvider
  .state("index", {
    url: "/items",
    templateUrl: "/assets/js/ng-views/index.html",
    controller: "ItemIndexController",
    controllerAs: "vm"
  })
}

function ItemFactoryFunction( $resource){
  return $resource("/api/items/:title", {}, {
    update: {method: "PUT"}
  })
}

function ItemIndexControllerFunction(ItemFactory, $state){
  this.items = ItemFactory.query()
}
