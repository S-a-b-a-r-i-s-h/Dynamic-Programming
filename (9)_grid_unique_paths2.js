// Reccursive solution
var f = function(row, col, obstacleGrid) {
    if(row == 0 && col == 0) {
        if(obstacleGrid[row][col] == 1) return 0;
        else return 1;
    }
    if(row < 0 || col < 0) {
        return 0;
    }
    if(obstacleGrid[row][col] == 1) return 0;
    let up = f(row-1, col, obstacleGrid);
    let left = f(row, col-1, obstacleGrid);

    return up + left;
}
var uniquePathsWithObstacles = function(obstacleGrid) {
    let m = obstacleGrid.length;
    let n = obstacleGrid[0].length;
    return f(m-1, n-1, obstacleGrid);
};


// Memoization solution
var f = function(row, col, obstacleGrid, dp) {
    if(row == 0 && col == 0) {
        if(obstacleGrid[row][col] == 1) return 0;
        else return 1;
    }
    if(row < 0 || col < 0) {
        return 0;
    }

    if(dp[row][col] != -1) return dp[row][col];

    if(obstacleGrid[row][col] == 1) return 0;

    let up = f(row-1, col, obstacleGrid, dp);
    let left = f(row, col-1, obstacleGrid, dp);

    return dp[row][col] = up + left;
}
var uniquePathsWithObstacles = function(obstacleGrid) {
    let m = obstacleGrid.length;
    let n = obstacleGrid[0].length;
    let dp = Array(m).fill().map(() => Array(n).fill(-1));

    return f(m-1, n-1, obstacleGrid, dp);
};


// Tabulation solution
var f = function(m, n, obstacleGrid, dp) {
    for(let row = 0; row < m; row++) {
        for(let col = 0; col < n; col++) {  
            if(obstacleGrid[row][col] == 1) dp[row][col] = 0;  
            else if(row == 0 && col == 0) {
                dp[row][col] = 1;
            }         
            else {
                let down = row > 0 ? dp[row-1][col] : 0;
                let right = col > 0 ? dp[row][col-1] : 0;
                dp[row][col] = down + right;
            }
        }
    }
    return dp[m-1][n-1];
}
var uniquePathsWithObstacles = function(obstacleGrid) {
    let m = obstacleGrid.length;
    let n = obstacleGrid[0].length;
    let dp = Array(m).fill().map(() => Array(n).fill(-1));

    return f(m, n, obstacleGrid, dp);
};


// Optimized tabulation solution
var f = function(m, n, obstacleGrid, dp) {
    let temp = Array(n).fill(0);

    for(let row = 0; row < m; row++) {
        for(let col = 0; col < n; col++) {  
            if(obstacleGrid[row][col] == 1) temp[col] = 0;  
            else if(row == 0 && col == 0) {
                temp[col] = 1;
            }         
            else {
                let down = row > 0 ? dp[col] : 0;
                let right = col > 0 ? temp[col-1] : 0;
                temp[col] = down + right;
            }
        }
        dp = [ ...temp ];
    }
    return dp[n-1];
}
var uniquePathsWithObstacles = function(obstacleGrid) {
    let m = obstacleGrid.length;
    let n = obstacleGrid[0].length;
    let dp = Array(m).fill(0);

    return f(m, n, obstacleGrid, dp);
};