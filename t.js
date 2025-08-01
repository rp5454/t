
let n = parseInt(prompt("Enter the number of terms for Fibonacci series:"));

if (isNaN(n) || n <= 0) {
    console.log("Please enter a valid positive number.");
} else {
    let fib = [0, 1];
    console.log("Fibonacci Series:");
    if (n === 1) {
        console.log(fib[0]);
    } else {
        console.log(fib[0]);
        console.log(fib[1]);
        for (let i = 2; i < n; i++) {
            fib[i] = fib[i - 1] + fib[i - 2];
            console.log(fib[i]);
        }
    }
}






let n = parseInt(prompt("Enter the limit for multiplication table of 8:"));

if (isNaN(n) || n <= 0) {
    console.log("Please enter a valid positive number.");
} else {
    console.log(`Multiplication Table of 8 up to ${n}:`);
    for (let i = 1; i <= n; i++) {
        console.log(`8 x ${i} = ${8 * i}`);
    }
}





