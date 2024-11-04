// Reccursive solution
class Solution {
    f(day, last, arr) {
        if(day == 0) {
            let maxValue = 0;
            for(let i = 0; i < 3; i++) {
                if(i != last) {
                    maxValue = Math.max(maxValue, arr[0][i]);
                }
            }
            return maxValue;
        }
        
        let maxValue = 0;
        for(let i = 0; i < 3; i++) {
            if(i != last) {
                let points = arr[day][i] + this.f(day-1, i, arr);
                maxValue = Math.max(maxValue, points);
            }
        }
        return maxValue;
    }
    maximumPoints(arr, n) {
        return this.f(n-1, 3, arr);
    }
}


// Memoization solution
class Solution {
    f(day, last, arr, dp) {
        if(day == 0) {
            let maxValue = 0;
            for(let i = 0; i < 3; i++) {
                if(i != last) {
                    maxValue = Math.max(maxValue, arr[0][i]);
                }
            }
            return maxValue;
        }
        
        if(dp[day][last] != -1) return dp[day][last];
        
        let maxValue = 0;
        for(let i = 0; i < 3; i++) {
            if(i != last) {
                let points = arr[day][i] + this.f(day-1, i, arr, dp);
                maxValue = Math.max(maxValue, points);
            }
        }
        return dp[day][last] = maxValue;
    }
    maximumPoints(arr, n) {
        let dp = Array(n).fill().map(() => Array(4).fill(-1));
        return this.f(n-1, 3, arr, dp);
    }
}


// Tabulation solution
class Solution {
    maximumPoints(arr, n) {
        let dp = Array(n).fill().map(() => Array(4).fill(-1));
        
        dp[0][0] = Math.max(arr[0][1], arr[0][2]);
        dp[0][1] = Math.max(arr[0][0], arr[0][2]);
        dp[0][2] = Math.max(arr[0][0], arr[0][1]);
        dp[0][3] = Math.max(arr[0][0], arr[0][1], arr[0][2]);
        
        for(let day = 1; day < n; day++) {
            for(let last = 0; last < 4; last++) {
                let maxValue = 0;
                
                for(let i = 0; i < 3; i++) {
                    if(i != last) {
                        let points = arr[day][i] + dp[day-1][i];
                        maxValue = Math.max(maxValue, points);
                    }
                }
                dp[day][last] = maxValue;
            }
        }
        
        return dp[n-1][3];
    }
}


// Optimized tabulation solution
class Solution {
    maximumPoints(arr, n) {
        let prev = Array(4).fill(-1);
        
        prev[0] = Math.max(arr[0][1], arr[0][2]);
        prev[1] = Math.max(arr[0][0], arr[0][2]);
        prev[2] = Math.max(arr[0][0], arr[0][1]);
        prev[3] = Math.max(arr[0][0], arr[0][1], arr[0][2]);
        
        let temp = Array(4).fill(-1);
        
        for(let day = 1; day < n; day++) {
            for(let last = 0; last < 4; last++) {
                let maxValue = 0;
                temp[last] = 0;
                for(let i = 0; i < 3; i++) {
                    
                    if(i != last) {
                        let points = arr[day][i] + prev[i];
                        maxValue = Math.max(maxValue, points);
                    }
                }
                temp[last] = maxValue;
                
            }
            prev = [...temp];
        }
        
        return prev[3];
    }
}