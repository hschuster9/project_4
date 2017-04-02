angular
  .module("project4", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .factory("Factory",[
    "$resource",
    FactoryFunction
  ])
  .controller("ItemIndexController",[
    "Factory",
    "$state",
    ItemIndexControllerFunction
  ])
  .controller("ItemNewController", [
    "Factory",
    "$state",
    ItemNewControllerFunction
  ])
  .controller("ReviewNewController", [
    "$stateParams",
    "$state",
    "Factory",
    ReviewNewControllerFunction
  ])
  .controller("ItemShowController", [
    "$stateParams",
    "Factory",
    "$state",
    ItemShowControllerFunction
  ])


  function RouterFunction($stateProvider){
    $stateProvider
      .state("ItemIndex", {
        url: "/items",
        templateUrl: "/assets/js/ng-views/item-index.html",
        controller: "ItemIndexController",
        controllerAs: "vm"
      })
      .state("ItemNew", {
        url: "/items/new",
        templateUrl: "/assets/js/ng-views/item-new.html",
        controller: "ItemNewController",
        controllerAs: "vm"
      })
      .state("ItemShow", {
        url: "/items/:item_id",
        templateUrl: "/assets/js/ng-views/item-show.html",
        controller: "ItemShowController",
        controllerAs: "vm"
      })
      .state("ReviewNew", {
        url: "/items/:item_id/reviews/new",
        templateUrl: "/assets/js/ng-views/review-new.html",
        controller: "ReviewNewController",
        controllerAs: "vm"
      })
  }


  function FactoryFunction($resource, $stateParams){
    return {
    items: $resource( "/api/items/:id", {id: "@id"}, {
      query: {method: "GET", params: {}, isArray: true },
      create: {method: "POST"},
      get: {method: "GET", params: {id: "@id"}, isArray: false},
      update: {method: "PUT", params: {id: "@id"}, isArray: false},
      remove: {method: "DELETE", params: {id: "@id"}}
    }),
    reviews: $resource( "/api/items/:item_id/reviews/:review_id", {item_id:"@item_id", review_id: "@review_id"}, {
      query: {method: "GET", params: {}, isArray: true},
      get: {method: "GET", params: {item_id: "@item_id", review_id: "@review_id"}, isArray: false},
      create: {method: "POST", params: {item_id: "@item_id"}},
      remove: {method: "DELETE", params: {item_id: "@item_id", review_id: "@review_id"}},
      update: {method: "PUT", params: {item_id: "@item_id", review_id: "@review_id"}}
    })
}
}

function ItemIndexControllerFunction(Factory, $state){
  this.items = Factory.items.query();
}

function ItemNewControllerFunction(Factory, $state){
  this.newItem = new Factory.items()
  this.create = function() {
    this.newItem.$save().then(function(item){
      $state.go("ItemShow", {item_id: item._id})
    })
  }
}

function ItemShowControllerFunction($stateParams, Factory, $state){

  this.item = Factory.items.get({id: $stateParams.item_id}, (item) => {
    this.reviews = item.reviews
  })

  this.update = function(){
    this.item.$update({id: $stateParams.item_id}, function() {
     $state.reload()
   })
  }


  this.destroy = function(){
    this.item.$delete({id: $stateParams.item_id}, function(){
       $state.go("ItemIndex")
     })
  }
};


function ReviewNewControllerFunction($stateParams, $state, Factory){
  vm = this;
  this.item = Factory.items.get({id: $stateParams.item_id});

    this.review = new Factory.reviews()
    this.review.create = function (){
      vm.review.$save({item_id: $stateParams.item_id}).then(function(review){
        vm.item.reviews.push(review)

            $state.go("ItemShow", {item_id: item._id})
        })
      }


  }
