//  Reccursive solution
var f = function(n) {
    if(n <= 1) {
        return 1;
    }
    return f(n-1) + f(n-2);  
}
var climbStairs = function(n) {
    return f(n);
};


// Memoization solution
var f = function(n, dp) {
    if(n < 2) {
        return 1;
    }
    if(dp[n] != -1) {
        return dp[n];
    }
    return dp[n] = f(n-1, dp) + f(n-2, dp);  
}

var climbStairs = function(n) {
    let dp = new Array(n+1).fill(-1);
    return f(n, dp);
};


// Tabulation solution
var climbStairs = function(n) {
    let dp = new Array(n+1).fill(-1);
    dp[0] = 0;
    dp[1] = 1;
    for(let i = 2; i <= n+1; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n+1];
};


// Optimized Tabulation solution
var climbStairs = function(n) {
    if (n < 2) {
        return 1;
    }
    
    let firstStep = 1;
    let secondStep = 1;
    let thirdStep = 0;
    
    for (let i = 2; i <= n; i++) {
        thirdStep = firstStep + secondStep;
        firstStep = secondStep;
        secondStep = thirdStep;
    }
    return thirdStep;
};