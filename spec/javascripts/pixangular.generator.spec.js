describe('pixangular.pixangularGenerator', function(){
  beforeEach(module['pixangular']);

  beforeEach(module(function($provide){
    $provide.value('pixangularGenerator',{});
  }))

  var $factory;

  describe('pixangularGenerator.generateGrid', function(){

    it('generates a 2d array matching the specified number of rows and columns', function(){
      var rows = 5;
      var columns = 5;
      var baseColor = "#FF0000";
      var grid = generateGrid(rows, columns, baseColor);
      expect(Array.isArray(grid)).toBeTruthy();
      expect(grid.length).toEqual(rows);
      expect(grid[0].length).toEqual(columns);
      expect(grid[rows - 1].length).toEqual(columns);
    });

    it('sets the background color of all cells', function(){
      var rows = 5;
      var columns = 5;
      var baseColor = "#FF0000";
      var grid = generateGrid(rows, columns, baseColor);
      for(var row = 0; row < rows; row++){
        for(var column = 0; column < columns; column++){
          expect(grid[row][column]).toEqual('#FF0000');
        }
      }
    });

    it('sets the background color to white if no color is specified', function(){
      var rows = 5;
      var columns = 5;
      var grid = generateGrid(rows, columns);
      console.log(grid);
      for(var row = 0; row < rows; row++){
        for(var column = 0; column < columns; column++){
          expect(grid[row][column]).toEqual('#FFFFFF');
        }
      }
    });
  });
});
