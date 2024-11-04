// Reccursive solution
var f = function(row, col, grid) {
    if(row == 0 && col == 0) {
        return grid[row][col];
    }
    if(row < 0 || col < 0) {
        return Number.MAX_SAFE_INTEGER;
    }
    let top = grid[row][col] + f(row-1, col, grid);
    let left = grid[row][col] + f(row, col-1, grid);

    return Math.min(top, left);
}
var minPathSum = function(grid) {
    let m = grid.length;
    let n = grid[0].length;

    return f(m-1, n-1, grid);
};


// Memoization solution
var f = function(row, col, grid, dp) {
    if(row == 0 && col == 0) {
        return grid[row][col];
    }
    if(row < 0 || col < 0) {
        return Number.MAX_SAFE_INTEGER;
    }

    if(dp[row][col] != -1) return dp[row][col];

    let top = grid[row][col] + f(row-1, col, grid, dp);
    let left = grid[row][col] + f(row, col-1, grid, dp);

    return dp[row][col] = Math.min(top, left);
}
var minPathSum = function(grid) {
    let m = grid.length;
    let n = grid[0].length;
    let dp = Array(m).fill().map(() => Array(n).fill(-1));

    return f(m-1, n-1, grid, dp);
};


// Tabulation solution
var f = function(m, n, grid, dp) {
    for(let row = 0; row < m; row++) {
        for(let col = 0; col < n; col++) {
            if(row == 0 && col == 0) {
                dp[0][0] = grid[0][0];
            } else {
                let down = grid[row][col];
                let left = grid[row][col];
                if(row > 0) {
                    down += dp[row-1][col];
                } else {
                    down += Number.MAX_SAFE_INTEGER;
                }

                if(col > 0) {
                    left += dp[row][col-1];
                } else {
                    left += Number.MAX_SAFE_INTEGER;
                }

                dp[row][col] = Math.min(down, left);
            }
        }
    }
    return dp[m-1][n-1];
}
var minPathSum = function(grid) {
    let m = grid.length;
    let n = grid[0].length;
    let dp = Array(m).fill().map(() => Array(n).fill(-1));

    return f(m, n, grid, dp);
};


// Optimized tabulation solution
var f = function(m, n, grid, dp) {
    let temp = Array(n).fill(0);

    for(let row = 0; row < m; row++) {
        for(let col = 0; col < n; col++) {
            if(row == 0 && col == 0) {
                temp[0] = grid[0][0];
            } else {
                let down = grid[row][col];
                let left = grid[row][col];
                if(row > 0) {
                    down += dp[col];
                } else {
                    down += Number.MAX_SAFE_INTEGER;
                }

                if(col > 0) {
                    left += temp[col-1];
                } else {
                    left += Number.MAX_SAFE_INTEGER;
                }

                temp[col] = Math.min(down, left);
            }
        }
        dp = [ ...temp ];
    }
    return dp[n-1];
}
var minPathSum = function(grid) {
    let m = grid.length;
    let n = grid[0].length;
    let dp = Array(n).fill(0);

    return f(m, n, grid, dp);
};