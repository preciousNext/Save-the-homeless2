var burgerIcon = document.querySelector(".burger");
var navLinks = document.querySelector("#navLinks");
var section = document.querySelector("section");
burgerIcon.addEventListener("click", function () {
  section.classList.toggle("shift");
  navLinks.classList.toggle("show");
  burgerIcon.classList.toggle("navbar-active");
});

// Load the contract ABI from a JSON file
// const contractAbi = <?php echo file_get_contents('./abi/donations.json'); ?>;

// Connect to the Ethereum network using web3.js
if (typeof web3 !== "undefined") {
  web3 = new Web3(web3.currentProvider);
} else {
  // If web3 is not present, provide an error message
  console.error("Please install a web3 browser extension like MetaMask");
}

// Define your contract's address
const contractAddress = "0x5F89e9052b94E86eDd05EDb219CbAd40bA4A8B75";

const contract = new web3.eth.Contract(contractAbi, contractAddress);

// Function to donate Ether
async function donateEther() {
  const donationAmount = document.getElementById("donationAmount").value;

  // Get the current Ethereum account (assuming MetaMask is used)
  const accounts = await ethereum.request({ method: "eth_accounts" });
  const senderAddress = accounts[0];

  try {
    // Send the donation transaction
    await contract.methods.donate().send({
      from: senderAddress,
      value: web3.utils.toWei(donationAmount, "ether"),
    });

    alert("Donation successful!");
    displayDonations(); // Refresh the donation list after a donation
  } catch (error) {
    alert("Donation failed: " + error.message);
  }
}

// Function to fetch and display the list of donors and their donations
async function displayDonations() {
  const donators = await contract.methods.showAllDonators().call();

  const donationListTable = document.getElementById("donationListTable");
  donationListTable.innerHTML = "";

  for (const donatorAddress of donators) {
    const donationSum = await contract.methods
      .showDonationSum(donatorAddress)
      .call();
    const donationRow = document.createElement("tr");

    const addressCell = document.createElement("td");
    addressCell.innerText = donatorAddress;

    const donationCell = document.createElement("td");
    donationCell.innerText = web3.utils.fromWei(donationSum, "ether") + " HTHW";

    donationRow.appendChild(addressCell);
    donationRow.appendChild(donationCell);
    donationListTable.appendChild(donationRow);
  }
}

// Call the function to display the list of donations when the page loads
displayDonations();
//
