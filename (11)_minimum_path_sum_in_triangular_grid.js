// Reccursive solution
var f = function(row, col, m, triangle) {
    if(row == m-1) {
        return triangle[row][col];
    }
    let down = triangle[row][col];
    let diagonal = triangle[row][col];

    down += f(row+1, col, m, triangle);
    diagonal += f(row+1, col+1, m, triangle);

    return Math.min(down, diagonal);
}
var minimumTotal = function(triangle) {
    let m = triangle.length;
    return f(0,0, m, triangle)
};


// Memoization solution
var f = function(row, col, m, triangle, dp) {
    if(row == m-1) {
        return triangle[row][col];
    }
    if(dp[row][col] != -1) return dp[row][col];

    let down = triangle[row][col];
    let diagonal = triangle[row][col];

    down += f(row+1, col, m, triangle, dp);
    diagonal += f(row+1, col+1, m, triangle, dp);

    return dp[row][col] = Math.min(down, diagonal);
}
var minimumTotal = function(triangle) {
    let m = triangle.length;
    let dp = Array(m).fill().map(() => Array(m).fill(-1));

    return f(0,0, m, triangle, dp)
};


// Tabulation solution
var f = function(row, col, m, triangle, dp) {
    for(let i = 0; i < m; i++) {
        dp[m-1][i] = triangle[m-1][i];
    }

    for(let row = m-2; row >= 0; row--) {
        for(let col=  row; col >= 0; col--) {
            let down = triangle[row][col] + dp[row+1][col];
            let diagonal = triangle[row][col] + dp[row+1][col+1];
            dp[row][col] = Math.min(down, diagonal);
        }
    }

    return dp[0][0];
}
var minimumTotal = function(triangle) {
    let m = triangle.length;
    let dp = Array(m).fill().map(() => Array(m).fill(-1));

    return f(0,0, m, triangle, dp)
};


// Optimized tabulation solution
var f = function(row, col, m, triangle, dp) {
    for(let i = 0; i < m; i++) {
        dp[i] = triangle[m-1][i];
    }
    let temp = Array(m).fill(0);

    for(let row = m-2; row >= 0; row--) {
        for(let col=  row; col >= 0; col--) {
            let down = triangle[row][col] + dp[col];
            let diagonal = triangle[row][col] + dp[col+1];
            temp[col] = Math.min(down, diagonal);
        }
        dp = [ ...temp ]
    }

    return dp[0];
}
var minimumTotal = function(triangle) {
    let m = triangle.length;
    let dp = Array(m).fill(0);

    return f(0,0, m, triangle, dp)
};