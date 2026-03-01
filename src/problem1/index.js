var sum_to_n_a = function (n = 0) {
  if (n < 1) return

  let result = 0

  for (let i = 1; i <= n; i++) {
    result += i
  }

  return result
};

var sum_to_n_b = function (n) {
  let result = n

  while (n > 0) {
    result += sum_to_n_b(n - 1)
    return result
  }

  return result
};

var sum_to_n_c = function (n) {
  const arrayNumberToN = Array.from({ length: n }, (_, i) => i + 1)

  const result = arrayNumberToN.reduce((a, b) => a + b, 0)

  return result
};

console.log(sum_to_n_a(5))
console.log(sum_to_n_b(3))
console.log(sum_to_n_c(12))
