var hashMap = new Map();

// Replace this with your Gist URL
// const gistUrl = 'https://gist.githubusercontent.com/pranavmal/cdf2a6dde791e2d471306e2e62faf075/raw/f26eb5238cede57e1bed448141409779a2635401/EqualBitesLeaderboard.txt';

// Replace this with your Gist ID
const gistId = 'cdf2a6dde791e2d471306e2e62faf075';

// URL for the Gist API
const gistUrl = `https://api.github.com/gists/${gistId}`;

// Fetch the Gist content
fetch(gistUrl)
  .then(response => response.json())
  .then(data => {
    // Access the file contents
    const files = data.files;
    for (const filename in files) {
      if (files.hasOwnProperty(filename)) {
        const fileContent = files[filename].content;
        console.log(fileContent);
        const items = fileContent.match(/[^ ]+:[^ ]+/g);
        items.forEach((item) => {
            const [key, value] = item.split(':');
            hashMap.set(key, value);
        });
        console.log(hashMap);
        populateTable();
      }
    }
  })
  .catch(error => {
    console.error('Error fetching the Gist:', error);
  });



// // Fetch the Gist content
// fetch(gistUrl)
//   .then(response => response.text())
//   .then(content => {
//     // Ensure we handle all parts of the content
//     console.log(content);
//     const items = content.match(/[^ ]+:[^ ]+/g);
//     items.forEach((item) => {
//       const [key, value] = item.split(':');
//       hashMap.set(key, value);
//     });

//     // Call populateTable after the hashMap is populated
//     populateTable();
//   })
//   .catch(error => {
//     console.error('Error fetching the Gist:', error);
//   });

function populateTable() {
    const tableBody = document.getElementById("hashmap-table");
    tableBody.innerHTML = ""; // Clear existing rows

    // Sort the hashMap by values in descending order
    const sortedEntries = Array.from(hashMap.entries()).sort((a, b) => b[1] - a[1]);

    for (const [key, value] of sortedEntries) {
        const row = document.createElement("tr");

        const keyCell = document.createElement("td");
        keyCell.textContent = key; // Display name as plain text

        const valueCell = document.createElement("td");
        valueCell.textContent = value; // Display score as plain text

        row.appendChild(keyCell);
        row.appendChild(valueCell);
        tableBody.appendChild(row);
    }
}

let selectedPaymentMethod = null;

function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    const cardNumber = document.getElementById("card-number").value.trim();
    const nameInput = document.getElementById("name");
    const numberInput = document.getElementById("number");

    const name = nameInput.value.trim();
    const numberToAdd = parseInt(numberInput.value, 10);

    if (!/^\d{16}$/.test(cardNumber)) {
        alert("Please enter a valid 16-digit credit card number.");
        return;
    }

    if (selectedPaymentMethod) {
        alert("Please select a payment method.");
        return;
    }

    if (name && !isNaN(numberToAdd)) {
        // Update or add the key-value pair in the HashMap
        hashMap.set(name, numberToAdd);

        // Clear and repopulate the table with sorted values
        populateTable();

        // Clear the form inputs
        nameInput.value = "";
        numberInput.value = "";
    }

    hashMap.set(name, numberToAdd);
    console.log(hashMap);
    const mapString = Array.from(hashMap)
        .map(([key, value]) => `${key}:${value}`)
        .join(' ');

    console.log(mapString);
  
    const gistId = 'cdf2a6dde791e2d471306e2e62faf075';

    // New content to replace the existing Gist content
    const newContent = mapString;

    // URL for the Gist API
    const gistUrl = `https://api.github.com/gists/${gistId}`;

    // Fetch options
    const options = {
        method: 'PATCH',
        headers: {
            'Authorization': `token ${{secrets.API_KEY}}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            files: {
                'EqualBitesLeaderboard.txt': {
                    content: newContent
                }
            }
        })
    };

    // Update the Gist content
    fetch(gistUrl, options)
        .then(response => response.json())
        .then(data => {
            console.log('Gist updated successfully:', data);
        })
        .catch(error => {
            console.error('Error updating the Gist:', error);
        });
}

function setPaymentMethod(method) {
    document.getElementById('selected-payment').innerText = `Selected payment method: ${method}`;
}

const form = document.getElementById("update-form");
form.addEventListener("submit", handleFormSubmit);
