// Reccursive solution
class Solution {
    f(ind, height) {
        if(ind == 0) return 0;
        
        let first_step = this.f(ind - 1, height) + Math.abs(height[ind] - height[ind-1]);
        
        let second_step = Number.MAX_SAFE_INTEGER;
        if(ind > 1)
            second_step = this.f(ind - 2, height) + Math.abs(height[ind] - height[ind-2]);
        
        return Math.min(first_step, second_step);
    }
    minimumEnergy(height, n)
    {
        return this.f(n-1, height)
    }
}


// Memoization solution
class Solution {
    f(ind, height, dp) {
        if(ind == 0) return 0;
        if(dp[ind] != -1) return dp[ind];
        
        let first_step = this.f(ind - 1, height, dp) + Math.abs(height[ind] - height[ind-1]);
        
        let second_step = Number.MAX_SAFE_INTEGER;
        if(ind > 1)
            second_step = this.f(ind - 2, height, dp) + Math.abs(height[ind] - height[ind-2]);
        
        return dp[ind] = Math.min(first_step, second_step);
    }
    minimumEnergy(height, n)
    {
        let dp = new Array(n+1).fill(-1);
        return this.f(n-1, height, dp)
    }
}


// Tabulation solution
class Solution {
    minimumEnergy(height, n)
    {
        let dp = new Array(n+1).fill(-1);
        dp[0] = 0;

        let second_step = Number.MAX_SAFE_INTEGER;
        for(let ind = 1; ind < n; ind++) {
            let first_step = dp[ind-1] + Math.abs(height[ind] - height[ind-1]);

            if(ind > 1) 
                second_step = dp[ind-2] + Math.abs(height[ind] - height[ind-2]);
            
            dp[ind] = Math.min(first_step, second_step)
        }
        return dp[n-1];
    }
}

// Optimized Tabulation solution
class Solution {
    minimumEnergy(height, n)
    {
        let prev = 0;
        let prev2 = 0;
        
        let second_step = Number.MAX_SAFE_INTEGER;
        for(let ind = 1; ind < n; ind++) {
            let first_step = prev + Math.abs(height[ind] - height[ind-1]);
            
            if(ind > 1) 
                second_step = prev2 + Math.abs(height[ind] - height[ind-2]);
                
            let curr = Math.min(first_step, second_step);
            prev2 = prev;
            prev = curr;
        }

        return prev;
    }
}