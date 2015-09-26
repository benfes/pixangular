
"use strict";
angular.module('pixangular',[]);

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
  }
}

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
