// Reccursive solution
class Solution {
    f(k, arr, ind) {
        if(ind === 0) return 0;
        
        let minSteps = Number.MAX_SAFE_INTEGER;
        let jump = Number.MAX_SAFE_INTEGER;
        
        for(let i = 1; i <= k; i++) {
            if(ind - i >= 0){
                jump = this.f(k, arr, ind-i) + Math.abs(arr[ind] - arr[ind-i]);
            }
            minSteps = Math.min(jump, minSteps);
        }
        
        return minSteps;
    }
    minimizeCost(k, arr) {
        return this.f(k, arr, arr.length-1);
    }
}


// Memoization solution
class Solution {
    f(k, arr, ind, dp) {
        if(ind === 0) return 0;
        if(dp[ind] != -1) return dp[ind];
        
        let minSteps = Number.MAX_SAFE_INTEGER;
        let jump = Number.MAX_SAFE_INTEGER;
        
        for(let i = 1; i <= k; i++) {
            if(ind - i >= 0){
                jump = this.f(k, arr, ind-i, dp) + Math.abs(arr[ind] - arr[ind-i]);
            }
            minSteps = Math.min(jump, minSteps);
        }
        
        return dp[ind] = minSteps;
    }
    minimizeCost(k, arr) {
        let n = arr.length;
        let dp = new Array(n).fill(-1);
        
        return this.f(k, arr, n-1, dp);
    }
}


// Tabulation solution
class Solution {
    minimizeCost(k, arr) {
        let n = arr.length;
        let dp = new Array(n).fill(-1);
        
        dp[0] = 0;
        
        
        for(let ind = 1; ind < n; ind++) {
            let minSteps = Number.MAX_SAFE_INTEGER;
            
            for(let i = 1; i <= k; i++) {
                if(ind - i >= 0) {
                    let jump = dp[ind-i] + Math.abs(arr[ind] - arr[ind-i]);
                    minSteps = Math.min(jump, minSteps);
                }
            }
            dp[ind] = minSteps;
        }
        return dp[n-1];
    }
}