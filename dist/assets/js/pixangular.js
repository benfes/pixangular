
"use strict";

angular.module('pixangular')
  .directive('pixangular', pixangular);

function pixangular(){
  var directive = {
    restrict: 'EA',
    link: link,
    scope: {

    },
    controller: pixangularController,
    controllerAs: 'vm',
    bindToController: true,
    templateUrl: '',
  };
  return directive;

  /////////////////////////////////////////////////////

  function link(scope, element, attrs){

  }
}

function pixangularController(){
  /*jshint validthis:true */
  var vm = this;
}

angular.module('pixangular',[]);
