var burgerIcon = document.querySelector(".burger");
var navLinks = document.querySelector("#navLinks");
var section = document.querySelector("section");
burgerIcon.addEventListener("click", function () {
  navLinks.classList.toggle("show");
  burgerIcon.classList.toggle("navbar-active");
  section.classList.toggle("active");
});

let web3;
let connected = false;
let stakingContractAbi; // ABI variable

async function initWallet() {
  if (typeof window.ethereum !== "undefined") {
    web3 = new Web3(window.ethereum);

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length > 0) {
        const walletAddress = accounts[0];
        document.getElementById("walletAddress").textContent = walletAddress;
        document.getElementById("walletInfo").style.display = "block";
        getBalance(walletAddress);
        connected = true;
      } else {
        alert("No accounts found. Please unlock your wallet.");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to the wallet. Please check your MetaMask.");
    }
  } else {
    alert("MetaMask is not installed. Please install MetaMask.");
  }
}

async function loadAbi() {
  // Load ABI from the JSON file
  const response = await fetch("./abi/staking.json");
  stakingContractAbi = await response.json();
}

window.addEventListener("load", () => {
  loadAbi(); // Load ABI when the page loads
  initWallet();
});

document.getElementById("stake").addEventListener("click", stakeTokens);
document.getElementById("unstake").addEventListener("click", unstakeTokens);

async function getBalance(walletAddress) {
  const balance = await web3.eth.getBalance(walletAddress);
  const balanceInEth = web3.utils.fromWei(balance, "ether");
  document.getElementById("balance").textContent = balanceInEth;
}

async function stakeTokens() {
  if (!connected) {
    alert("Please connect your wallet first.");
    return;
  }

  const stakeAmount = document.getElementById("stakeAmount").value;
  const lockTime = document.getElementById("lockTime").value;

  if (isNaN(stakeAmount) || isNaN(lockTime)) {
    alert(
      "Invalid input. Please enter valid numbers for stake amount and lock time."
    );
    return;
  }

  const stakingContractAddress = "0x7c915Efb15532EC2424A15C38d29B05A1Bb9A13f"; // Replace with your contract address

  const stakingContract = new web3.eth.Contract(
    stakingContractAbi,
    stakingContractAddress
  );

  try {
    const walletAddress = document.getElementById("walletAddress").textContent;
    const weiStakeAmount = web3.utils.toWei(stakeAmount, "ether");
    const lockTimeInSeconds = parseInt(lockTime);
    const gasPrice = await web3.eth.getGasPrice();

    await stakingContract.methods
      .stake(weiStakeAmount, lockTimeInSeconds)
      .send({
        from: walletAddress,
        gas: 200000, // Adjust the gas limit as needed
        gasPrice: gasPrice,
      });

    alert(
      `Staking ${stakeAmount} tokens with a lock time of ${lockTime} seconds.`
    );
  } catch (error) {
    console.error(error);
    alert("Error staking tokens. Please check the input values and try again.");
  }
}

async function unstakeTokens() {
  if (!connected) {
    alert("Please connect your wallet first.");
    return;
  }

  const stakingContractAddress = "0x7c915Efb15532EC2424A15C38d29B05A1Bb9A13f"; // Replace with your contract address

  const stakingContract = new web3.eth.Contract(
    stakingContractAbi,
    stakingContractAddress
  );

  try {
    const walletAddress = document.getElementById("walletAddress").textContent;
    const gasPrice = await web3.eth.getGasPrice();

    await stakingContract.methods.unstake().send({
      from: walletAddress,
      gas: 200000, // Adjust the gas limit as needed
      gasPrice: gasPrice,
    });

    alert("Unstaking tokens.");
  } catch (error) {
    console.error(error);
    alert("Error unstaking tokens. Please try again.");
  }
}
