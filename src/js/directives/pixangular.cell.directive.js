"use strict";

angular.module('pixangular')
  .directive('pixangularCell', pixangularCell);
pixangularCell.$inject = ['$parse']
function pixangularCell($parse){
  var directive = {
    restrict: 'EA',
    link: link,
    scope: {
      ngModel: '=',
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
    element.bind('contextmenu', function(event) {
        scope.$apply(function() {
            event.preventDefault();
            fn(scope, {$event:event});
            setBackColor();
        });
    });
    element.on('click', function(event){
      setForeColor();
    });
    element.on('mouseenter', function(event){
      // console.log(scope.ngModel, event.buttons, buttons.left);
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
    function setForeColor(){
      console.log(scope.ngModel, scope.forecolor);
      scope.ngModel = scope.forecolor;
      element.css('background-color',scope.forecolor);
    }
    function setBackColor(){
      scope.ngModel = scope.backcolor;
      element.css('background-color',scope.backcolor);
    }
  }
}
