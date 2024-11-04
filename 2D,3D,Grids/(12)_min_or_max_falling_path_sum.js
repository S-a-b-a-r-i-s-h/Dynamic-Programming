// Reccursive solution
var f = function(row, col, matrix, m, n) {
    if(col >= m || col < 0) {
        return Number.MAX_SAFE_INTEGER;
    }
    if(row == 0) {
        return matrix[row][col];
    }

    let left = matrix[row][col] + f(row-1, col-1, matrix, m, n);
    let up = matrix[row][col] + f(row-1, col, matrix, m, n);
    let right = matrix[row][col] + f(row-1, col+1, matrix, m, n);

    return Math.min(left, up, right);
}
var minFallingPathSum = function(matrix) {
    let min = Number.MAX_SAFE_INTEGER;
    let m = matrix.length;
    let n = matrix[0].length;

    for(let i = 0; i < m; i++) {
        let reccurance = f(m-1, i, matrix, m, n);
        min = Math.min(min, reccurance);
    }

    return min;
};


// Memoization solution
var f = function(row, col, matrix, m, n, dp) {
    if(col >= m || col < 0) {
        return Number.MAX_SAFE_INTEGER;
    }
    if(row == 0) {
        return matrix[row][col];
    }
    if(dp[row][col] != -1) return dp[row][col];

    let left = matrix[row][col] + f(row-1, col-1, matrix, m, n, dp);
    let up = matrix[row][col] + f(row-1, col, matrix, m, n, dp);
    let right = matrix[row][col] + f(row-1, col+1, matrix, m, n, dp);

    return dp[row][col] = Math.min(left, up, right);
}
var minFallingPathSum = function(matrix) {
    let min = Number.MAX_SAFE_INTEGER;
    let m = matrix.length;
    let n = matrix[0].length;
    let dp = Array(m).fill().map(() => Array(n).fill(-1));

    for(let i = 0; i < m; i++) {
        let reccurance = f(m-1, i, matrix, m, n, dp);
        min = Math.min(min, reccurance);
    }

    return min;
};


// Tabulation solution
var f = function(matrix, m, n, dp) {

    for(let row = 1; row < m; row++) {
        for(let col = 0; col < n; col++) {
            let left = matrix[row][col];
            left += col > 0 ?  + dp[row-1][col-1] : Number.MAX_SAFE_INTEGER;

            let down = matrix[row][col];
            down += dp[row-1][col];

            let right = matrix[row][col];
            right += col < n-1 ? dp[row-1][col+1] : Number.MAX_SAFE_INTEGER;

            dp[row][col] = Math.min(left, down, right);
        }
    }

    let min = Number.MAX_SAFE_INTEGER;
    for(let i = 0; i < n; i++) {
        min = Math.min(min, dp[m-1][i]);
    }
    return min;
}
var minFallingPathSum = function(matrix) {
    let min = Number.MAX_SAFE_INTEGER;
    let m = matrix.length;
    let n = matrix[0].length;
    let dp = Array(m).fill().map(() => Array(n).fill(-1));
    for(let i = 0; i < m; i++) {
        dp[0][i] = matrix[0][i];
    }

    return f(matrix, m, n, dp);
};


// Optimized tabulation solution
var f = function(matrix, m, n, dp) {
    let temp = Array(m).fill(0);

    for(let row = 1; row < m; row++) {
        for(let col = 0; col < n; col++) {
            let left = matrix[row][col];
            left += col > 0 ?  + dp[col-1] : Number.MAX_SAFE_INTEGER;

            let down = matrix[row][col];
            down += dp[col];

            let right = matrix[row][col];
            right += col < n-1 ? dp[col+1] : Number.MAX_SAFE_INTEGER;

            temp[col] = Math.min(left, down, right);
        }
        dp = [ ...temp ];
    }

    let min = Number.MAX_SAFE_INTEGER;
    for(let i = 0; i < n; i++) {
        min = Math.min(min, dp[i]);
    }
    return min;
}
var minFallingPathSum = function(matrix) {
    let min = Number.MAX_SAFE_INTEGER;
    let m = matrix.length;
    let n = matrix[0].length;
    let dp = Array(n).fill(0);

    for(let i = 0; i < m; i++) {
        dp[i] = matrix[0][i];
    }

    return f(matrix, m, n, dp);
};