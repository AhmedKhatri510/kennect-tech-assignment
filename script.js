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

  // Generate tables for single number checks and prime number checks
  generateSingleNumberTable();
  generatePrimeNumbersTable();

  // Show the "Single Number Checks" tab by triggering its click event
  const singleNumberTabButton = document.querySelector(
    ".tablinks:nth-child(1)"
  );
  singleNumberTabButton.click(); // Trigger click event
}

function closePopup() {
  const detailsPopup = document.getElementById("detailsPopup");
  detailsPopup.style.display = "none";
}

function generateSingleNumberTable() {
  const start = parseInt(document.getElementById("startRange").value);
  const end = parseInt(document.getElementById("endRange").value);
  const singleNumberTable = document.getElementById("singleNumberTable");

  // Clear previous content if any
  singleNumberTable.innerHTML = "";

  // Example data for single number checks
  const singleNumberChecksData = [];

  for (let i = start; i <= end; i++) {
    const time = measureSingleNumberCheckTime(i);
    singleNumberChecksData.push({
      number: i,
      result: isPrime(i) ? "Prime" : "Normal",
      time: time,
    });
  }

  // Create table header
  const tableHeader = `<tr>
          <th>Number</th>
          <th>Result</th>
          <th>Time In ms</th>
        </tr>`;

  // Generate table rows
  const tableRows = singleNumberChecksData
    .map((data) => {
      return `<tr>
            <td>${data.number}</td>
            <td>${data.result}</td>
            <td>${data.time}</td>
          </tr>`;
    })
    .join("");

  // Set table content
  singleNumberTable.innerHTML = tableHeader + tableRows;
}

function generatePrimeNumbersTable() {
  const start = parseInt(document.getElementById("startRange").value);
  const end = parseInt(document.getElementById("endRange").value);
  const primeNumbersTable = document.getElementById("primeNumbersTable");

  // Clear previous content if any
  primeNumbersTable.innerHTML = "";

  // Example data for prime number checks
  const primeNumbersChecksData = [];

  for (let i = start; i <= end; i++) {
    const time = measureSingleNumberCheckTime(i);
    primeNumbersChecksData.push({ number: i, time: time });
  }

  // Create table header
  const tableHeader = `<tr>
          <th>Number</th>
          <th>Time in ms</th>
        </tr>`;

  // Generate table rows
  const tableRows = primeNumbersChecksData
    .map((data) => {
      return `<tr>
            <td>${data.number}</td>
            <td>${data.time}</td>
          </tr>`;
    })
    .join("");

  // Set table content
  primeNumbersTable.innerHTML = tableHeader + tableRows;
}

function openTab(evt, tabName) {
  let i, tabcontent, tablinks;

  // Hide all tab content
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Deactivate all tab buttons
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the specific tab content and activate the clicked tab button
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
