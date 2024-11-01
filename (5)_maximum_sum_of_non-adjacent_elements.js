// Reccursive solution
var f = function(ind, nums) {
    if(ind == 0) return nums[ind];
    if(ind < 0) return 0;

    let pick = nums[ind] + f(ind-2, nums);
    let notPick = f(ind-1, nums);

    return Math.max(pick, notPick);
}
var rob = function(nums) {
    let n = nums.length;
    return f(n-1, nums);
};


// Memoization solution
var f = function(ind, nums, dp) {
    if(ind == 0) return nums[ind];
    if(ind < 0) return 0;
    if(dp[ind] != -1) return dp[ind];

    let pick = nums[ind] + f(ind-2, nums, dp);
    let notPick = f(ind-1, nums, dp);

    return dp[ind] = Math.max(pick, notPick);
}
var rob = function(nums) {
    let n = nums.length;
    let dp = new Array(n+1).fill(-1);

    return f(n-1, nums, dp);
};

// Tabulation solution
var rob = function(nums) {
    let n = nums.length;
    let dp = new Array(n+1).fill(-1);

    dp[0] = nums[0];

    for(let ind = 1; ind < n; ind++) {
        let pick = nums[ind];
        if(ind > 1) pick += dp[ind-2];

        let notPick = dp[ind-1];

        dp[ind] = Math.max(pick, notPick);
    }

    return dp[n-1];
};


// Optimized Tabulation solution
var rob = function(nums) {
    let n = nums.length;
    
    let prev = nums[0];
    let prev2 = 0;
    let curr;

    for(let ind = 1; ind < n; ind++) {
        let pick = nums[ind];
        if(ind > 1) pick += prev2;

        let notPick = prev;

        curr = Math.max(pick, notPick);
        prev2 = prev;
        prev = curr;
    }

    return prev;
};