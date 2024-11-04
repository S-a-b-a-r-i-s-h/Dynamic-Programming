// Reccursive solution
class Solution {
    f(row, col1, col2, n, m, grid) {
        if(col1 < 0 || col1 >= m || col2 < 0 || col2>= m) return Number.MIN_SAFE_INTEGER;
        
        if(row == n-1) {
            if(col1 == col2) return grid[row][col1];
            else return grid[row][col1] + grid[row][col2];
        }
        
        let maxi = Number.MIN_SAFE_INTEGER;
        for(let i = -1; i <= 1; i++) {
            for(let j = -1; j <= 1; j++) {
                if(col1 == col2) {
                    maxi = Math.max(maxi, grid[row][col1] + this.f(row+1, col1+i, col2+j, n, m, grid));
                } else {
                    maxi = Math.max(maxi, grid[row][col1] + grid[row][col2] + this.f(row+1, col1+i, col2+j, n, m, grid));
                }
            }
        }
        return maxi;
    }
    solve(n, m, grid) {
        return this.f(0, 0, m-1, n, m, grid);
    }
}


// Memoization solution
class Solution {
    f(row, col1, col2, n, m, grid, dp) {
        if(col1 < 0 || col1 >= m || col2 < 0 || col2>= m) return Number.MIN_SAFE_INTEGER;
        
        if(row == n-1) {
            if(col1 == col2) return grid[row][col1];
            else return grid[row][col1] + grid[row][col2];
        }
        
        if(dp[row][col1][col2] != -1) return dp[row][col1][col2];
        
        let maxi = Number.MIN_SAFE_INTEGER;
        for(let i = -1; i <= 1; i++) {
            for(let j = -1; j <= 1; j++) {
                if(col1 == col2) {
                    maxi = Math.max(maxi, grid[row][col1] + this.f(row+1, col1+i, col2+j, n, m, grid, dp));
                } else {
                    maxi = Math.max(maxi, grid[row][col1] + grid[row][col2] + this.f(row+1, col1+i, col2+j, n, m, grid, dp));
                }
            }
        }
        return dp[row][col1][col2] = maxi;
    }
    solve(n, m, grid) {
        let dp = Array(n).fill().map(() => Array(m).fill().map(() => Array(m).fill(-1)));
        return this.f(0, 0, m-1, n, m, grid, dp);
    }
}


// Tabulation solution
class Solution {
    f(n, m, grid, dp) {
        
        // Base case
        for(let i = 0; i < m; i++) {
            for(let j = 0; j < m; j++) {
                if(i == j) {
                    dp[n-1][i][j] = grid[n-1][i];
                } else {
                    dp[n-1][i][j] = grid[n-1][i] + grid[n-1][j];
                }
            }
        }
        
        for(let row = n-2; row >=0; row--) {
            for(let col1 = 0; col1 < m; col1++) {
                for(let col2 = 0; col2 < m; col2++) {
                    let maxi = Number.MIN_SAFE_INTEGER;
                    
                    for(let i = -1; i <= 1; i++) {
                        for(let j = -1; j <= 1; j++) {
                            let value = 0;
                            if(col1 == col2) value = grid[row][col1];
                            else value = grid[row][col1] + grid[row][col2];
                            
                            if(col1+i >= 0 && col1+i < m && col2+j >=0 && col2+j < m) {
                                value += dp[row+1][col1+i][col2+j];
                            } else {
                                value += Number.MIN_SAFE_INTEGER;
                            }
                            
                            maxi = Math.max(maxi, value);
                        }
                    }
                    dp[row][col1][col2] = maxi;
                }
            }
        }
        return dp[0][0][m-1];
    }
    solve(n, m, grid) {
        let dp = Array(n).fill().map(() => Array(m).fill().map(() => Array(m).fill(-1)));
        return this.f(n, m, grid, dp);
    }
}


// Optimized tabulation solution
class Solution {
    f(n, m, grid, dp) {
        let temp = Array(m).fill().map(() => Array(m).fill(-1));
        
        // Base case
        for(let i = 0; i < m; i++) {
            for(let j = 0; j < m; j++) {
                if(i == j) {
                    dp[i][j] = grid[n-1][i];
                } else {
                    dp[i][j] = grid[n-1][i] + grid[n-1][j];
                }
            }
        }
        
        for(let row = n-2; row >=0; row--) {
            for(let col1 = 0; col1 < m; col1++) {
                for(let col2 = 0; col2 < m; col2++) {
                    let maxi = Number.MIN_SAFE_INTEGER;
                    
                    for(let i = -1; i <= 1; i++) {
                        for(let j = -1; j <= 1; j++) {
                            let value = 0;
                            if(col1 == col2) value = grid[row][col1];
                            else value = grid[row][col1] + grid[row][col2];
                            
                            if(col1+i >= 0 && col1+i < m && col2+j >=0 && col2+j < m) {
                                value += dp[col1+i][col2+j];
                            } else {
                                value += Number.MIN_SAFE_INTEGER;
                            }
                            
                            maxi = Math.max(maxi, value);
                        }
                    }
                    temp[col1][col2] = maxi;
                }
            }
            dp = temp.map(arr => [...arr]);;
        }
        return dp[0][m-1];
    }
    solve(n, m, grid) {
        let dp = Array(m).fill().map(() => Array(m).fill(-1));
        return this.f(n, m, grid, dp);
    }
}