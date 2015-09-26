"use strict";

angular.module('pixangular')
  .directive('pixangularCell', pixangularCell);
pixangularCell.$inject = ['$parse'];
function pixangularCell($parse){
  var directive = {
    restrict: 'EA',
    link: link,
    scope: {
      ngModel: '=',
      row: '=',
      column: '=',
      forecolor: '=',
      backcolor: '=',
      showgrid: '='
    }
  };
  var buttons = {
    left: 1,
    right: 2
  };
  return directive;

  function link(scope, element, attrs){
    var fn = $parse(attrs.ngRightClick);
    element.css('background-color',scope.ngModel[scope.row][scope.column]);
    element.bind('contextmenu', function(event) {
        scope.$apply(function() {
            event.preventDefault();
            fn(scope, {$event:event});
            if(event.ctrlKey){
              updateBackColor();
            } else {
              setBackColor();
            }
        });
    });
    element.on('click', function(event){
      if(event.ctrlKey){
        updateForeColor();
      } else {
        setForeColor();
      }
    });
    element.on('mouseenter', function(event){
      switch(event.buttons){
        case buttons.left:
          setForeColor();
          break;
        case buttons.right:
          setBackColor();
          break;
        default:
          break;
      }
    });
    scope.safeApply = function(fn) {
      var phase = this.$root.$$phase;
      if(phase == '$apply' || phase == '$digest') {
        if(fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };
    function setForeColor(){
      scope.safeApply(function(){
        scope.ngModel[scope.row][scope.column] = scope.forecolor;
      });
      element.css('background-color',scope.forecolor);
    }
    function setBackColor(){
      scope.ngModel[scope.row][scope.column] = scope.backcolor;
      element.css('background-color',scope.backcolor);
    }
    function updateForeColor(){
      scope.safeApply(function(){
        scope.forecolor = scope.ngModel[scope.row][scope.column];
      });
    }
    function updateBackColor(){
      scope.safeApply(function(){
        scope.backcolor = scope.ngModel[scope.row][scope.column];
      });
    }
  }
}
