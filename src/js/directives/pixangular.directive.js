"use strict";

angular.module('pixangular')
  .directive('pixangular', pixangular);

function pixangular(){
  var directive = {
    restrict: 'EA',
    link: link,
    scope: {
      grid: '=',
      width: '@',
      height: '@'
    },
    controller: pixangularController,
    controllerAs: 'vm',
    bindToController: true,
    templateUrl: 'dist/assets/views/pixangular.html'
  };
  return directive;

  /////////////////////////////////////////////////////

  function link(scope, element, attrs){
    scope.name = "ben";
    console.log(element.find('.pixangular-cell'));
    element.find('.pixangular-cell').on('click', function(){
      console.log('I was clicked');
    });
    element.find('.pixangular-cell').on('mouseenter',function(){
      console.log('your on me');
    });
  }
}

function pixangularController(){
  /*jshint validthis:true */
  var vm = this;
  vm.forecolor = "#000000";
  vm.backcolor = "#FFFFFF";
  vm.colorIn = colorIn;
  vm.dragging = false;
  vm.showGrid = true;
  vm.output = vm.grid;
  vm.generateOutput = generateOutput;

  function colorIn(cell){
    if(vm.dragging){
      return vm.currentColor;
    }
    return cell;
  }

  function generateOutput(){
    vm.output = vm.grid;
  }
}
