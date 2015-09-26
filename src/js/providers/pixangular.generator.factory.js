angular.module('pixangular')
  .factory('pixangularGenerator',pixangularGenerator);

function pixangularGenerator(){
  var factory = {
    generateGrid: generateGrid
  };
  return factory;

  ////////////////

  function generateGrid(rows, columns, baseColor){
    var grid = [];
    for(var row = 0; row < rows; row++){
      var currentRow = [];
      for(var column = 0; column < columns; column++){
        currentRow.push(baseColor);
      }
      grid.push(currentRow);
    }
    return grid;
  }
}
