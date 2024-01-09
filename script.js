function getPrimesInRange(start, end) {
  const primes = [];

  for (let num = start; num <= end; num++) {
    if (isPrime(num)) {
      primes.push(num);
    }
  }

  return primes;
}

function isPrime(num) {
  if (num <= 1) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
}

function calculateMetrics() {
  const startRange = parseInt(document.getElementById("startRange").value);
  const endRange = parseInt(document.getElementById("endRange").value);

  const startTime = performance.now();
  const primes = getPrimesInRange(startRange, endRange);
  const endTime = performance.now();

  const totalTime = endTime - startTime;
  const singleNumberCheckTime = measureSingleNumberCheckTime();
  const primeNumbersCheckTime = measurePrimeNumbersCheckTime(primes);

  const averageTime = (singleNumberCheckTime + primeNumbersCheckTime) / 2;

  document.getElementById(
    "metric1"
  ).innerText = `Time taken to run getPrimesInRange: ${totalTime.toFixed(
    5
  )} ms`;
  document.getElementById(
    "metric2"
  ).innerText = `Time taken to check if a single number is prime: ${singleNumberCheckTime.toFixed(
    5
  )} ms`;
  document.getElementById(
    "metric3"
  ).innerText = `Time taken to check if a number is prime for each prime found: ${primeNumbersCheckTime.toFixed(
    5
  )} ms`;
  document.getElementById(
    "metric4"
  ).innerText = `Average time for determining primality for all numbers: ${averageTime.toFixed(
    5
  )} ms`;
}

function measureSingleNumberCheckTime(num = 19) {
  const startTime = performance.now();
  isPrime(num); // Example number for measurement
  const endTime = performance.now();
  return endTime - startTime;
}

function measurePrimeNumbersCheckTime(primes) {
  const startTime = performance.now();
  primes.forEach((num) => isPrime(num));
  const endTime = performance.now();
  return endTime - startTime;
}

function showDetails() {
  const detailsPopup = document.getElementById("detailsPopup");
  detailsPopup.style.display = "block";
}

function closePopup() {
  const detailsPopup = document.getElementById("detailsPopup");
  detailsPopup.style.display = "none";
}
