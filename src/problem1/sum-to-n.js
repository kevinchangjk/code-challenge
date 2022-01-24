var n = 100;

// adding directly in an iterative process
var sum_to_n_a = function(n) {
  let res = 0;
  for (let i = 1; i <= n; i += 1) {
    res += i;
  }
  return res;
}

// adding using a recursive procedure, iterative process 
var sum_to_n_b = function(n) {
  function helper(i, res) {
    return i > n ? res : helper(i + 1, res + i);
  }

  return helper(1, 0);
}

// summing up using arithmetic progression formula
var sum_to_n_c = function(n) {
  return n * (n + 1) / 2;
}

// console.log(sum_to_n_a(n));
// console.log(sum_to_n_b(n));
// console.log(sum_to_n_c(n));
