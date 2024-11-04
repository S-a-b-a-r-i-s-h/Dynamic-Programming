// Reccursive solution
var findMax = function(ind, nums) {
    if(ind == 0) return nums[ind];
    if(ind < 0) return 0;

    let pick = nums[ind] + findMax(ind-2, nums);
    let notPick = findMax(ind-1, nums);

    return Math.max(pick, notPick);
}
var rob = function(nums) {
    let temp1 = [];
    let temp2 = [];
    if(nums.length == 1) return nums[0];

    for(let i = 0; i < nums.length; i++) {
        if(i != 0) temp1.push(nums[i]);
        if(i != nums.length - 1) temp2.push(nums[i]);
    }
    let n = temp1.length;
    let m = temp2.length;

    return Math.max(findMax(n-1, temp1), findMax(m-1, temp2));
};

// Memoization solution
var findMax = function(ind, nums) {
    let dp = new Array(ind+1).fill(-1);

    if(ind == 0) return nums[ind];
    if(ind < 0) return 0;
    if(dp[ind] != -1) return dp[ind];

    let pick = nums[ind] + findMax(ind-2, nums, dp);
    let notPick = findMax(ind-1, nums, dp);

    return dp[ind] = Math.max(pick, notPick);
}
var rob = function(nums) {
    let temp1 = [];
    let temp2 = [];
    
    if(nums.length == 1) return nums[0];

    for(let i = 0; i < nums.length; i++) {
        if(i != 0) temp1.push(nums[i]);
        if(i != nums.length - 1) temp2.push(nums[i]);
    }
    let n = temp1.length;
    let m = temp2.length;

    return Math.max(findMax(n-1, temp1), findMax(m-1, temp2));
};


// Tabulation solution
var findMax = function(ind, nums) {
    let dp = new Array(ind+1).fill(-1);
    dp[0] = nums[0];

    for(let i = 1; i <= ind; i++) {
        let pick = nums[i];
        if(i > 1) pick += dp[i-2];

        let notPick = dp[i-1];

        dp[i] = Math.max(pick, notPick);
    }
    return dp[ind];
}
var rob = function(nums) {
    let temp1 = [];
    let temp2 = [];
    
    if(nums.length == 1) return nums[0];

    for(let i = 0; i < nums.length; i++) {
        if(i != 0) temp1.push(nums[i]);
        if(i != nums.length - 1) temp2.push(nums[i]);
    }
    let n = temp1.length;
    let m = temp2.length;

    return Math.max(findMax(n-1, temp1), findMax(m-1, temp2));
};


// Optimized Tabulation solution
var findMax = function(temp) {
    let prev = temp[0];
    let prev2 = 0;
    let curr = 0;

    for(let i = 1; i < temp.length; i++) {
        let take = temp[i];
        if(i > 1) take += prev2;
        let notTake = prev;
        curr = Math.max(take, notTake);
        prev2 = prev;
        prev = curr;
    } 
    return prev;
}
var rob = function(nums) {
    let temp1 = [];
    let temp2 = [];
    if(nums.length == 1) return nums[0];
    for(let i = 0; i < nums.length; i++) {
        if(i != 0) temp1.push(nums[i]);
        if(i != nums.length - 1) temp2.push(nums[i]);
    }
    return Math.max(findMax(temp1), findMax(temp2));
};