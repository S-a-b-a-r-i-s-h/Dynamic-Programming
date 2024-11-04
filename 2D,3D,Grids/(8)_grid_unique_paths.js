// Reccursive solution
var f = function(row, col) {
    if(row == 0 && col == 0) {
        return 1;
    }
    if(row < 0 || col < 0) {
        return 0;
    }
    let up = f(row-1, col);
    let left = f(row, col-1);

    return up + left;
}
var uniquePaths = function(m, n) {
    return f(m-1, n-1);
};


// Memoization solution
var f = function(row, col, dp) {
    if(row == 0 && col == 0) {
        return 1;
    }
    if(row < 0 || col < 0) {
        return 0;
    }
    if(dp[row][col] != -1) return dp[row][col];

    let up = f(row-1, col, dp);
    let left = f(row, col-1, dp);

    return dp[row][col] = up + left;
}
var uniquePaths = function(m, n) {
    let dp = Array(m).fill().map(() => Array(n).fill(-1));
    return f(m-1, n-1, dp);
};


// Tabulation solution
var f = function(m, n, dp) {
    for(let row = 0; row < m; row++) {
        for(let col = 0; col < n; col++) {
            if(row == 0 && col == 0) {
                dp[row][col] = 1;
            } else {
                let down = row > 0 ? dp[row-1][col] : 0;
                let right = col > 0 ? dp[row][col-1] : 0;
                dp[row][col] = down + right;
            }
        }
    }

    return dp[m-1][n-1];
}
var uniquePaths = function(m, n) {
    let dp = Array(m).fill().map(() => Array(n).fill(-1));
    return f(m, n, dp);
};


// Optimized tabulation solution
var f = function(m, n, dp) {
    let temp = Array(n).fill(1);
    for(let row = 0; row < m; row++) {
        for(let col = 0; col < n; col++) {
            if(row == 0 && col == 0) {
                dp[col] = 1;
            } else {
                let down = row > 0 ? dp[col] : 0;
                let right = col > 0 ? temp[col-1] : 0;
                temp[col] = down + right;
            }
        }
        dp = [ ...temp ];
    }
    
    return dp[n-1];
}
var uniquePaths = function(m, n) {
    let dp = Array(n).fill(0);
    return f(m, n, dp);
};