
const hashMap = {
    "john_doe": 42,
    "jane_smith": 35,
    "user123": 67,
    "admin": 99
  };  

function populateTable(map) {
    const tableBody = document.getElementById("hashmap-table");
    tableBody.innerHTML = ""; // Clear existing rows

    // Sort the hashMap by values in descending order
    const sortedEntries = sortHashMapByValue(map);

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
        alert("populate table map");
}

let selectedPaymentMethod = null;

function sortHashMapByValue(map) {
    return Object.entries(map).sort((a, b) => b[1] - a[1]); // Sort by value (descending)
    }          

function handleFormSubmit(event) {
    //event.preventDefault(); Prevent default form submission

    const cardNumber = document.getElementById("card-number").value.trim();
    const nameInput = document.getElementById("name");
    const numberInput = document.getElementById("number");
    
    const name = nameInput.value.trim();
    const numberToAdd = parseInt(numberInput.value, 10);

    if (!/^\d{16}$/.test(cardNumber)) {
        alert("Please enter a valid 16-digit credit card number.");
        return;
    }

    if (!selectedPaymentMethod) {
        alert("Please select a payment method.");
        return;
    }
    
    if (name && !isNaN(numberToAdd)) {
        alert("something");
        // Update or add the key-value pair in the HashMap
        hashMap[name] = numberToAdd;
    
        // Clear and repopulate the table with sorted values
        populateTable(hashMap);
    
        // Clear the form inputs
        nameInput.value = "";
        numberInput.value = "";
    }
}

function setPaymentMethod(method) {
    selectedPaymentMethod = method;
    document.getElementById("selected-payment").textContent = "Selected Payment Method: " + method;
}

populateTable(hashMap);

const form = document.getElementById("update-form");
form.addEventListener("submit", handleFormSubmit);
