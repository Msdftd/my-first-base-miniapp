let userAccount = null;

// ✅ YOUR DEPLOYED CONTRACT ADDRESS (Base)
const CONTRACT_ADDRESS = "0xe4E190fF37396B0870360753Af9112571dEA8CEa";

// ✅ ABI (DO NOT CHANGE)
const CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "checkIn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMyCheckIns",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// UI Elements
const connectBtn = document.getElementById("connect");
const checkInBtn = document.getElementById("checkin");
const walletText = document.getElementById("wallet");
const statusText = document.getElementById("status");
const messageText = document.getElementById("message");

// Disable check-in until wallet is connected
checkInBtn.disabled = true;

// 🔵 CONNECT WALLET
connectBtn.onclick = async () => {
  if (!window.ethereum) {
    alert("Wallet not found. Please install MetaMask or OKX Wallet.");
    return;
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    userAccount = await signer.getAddress();

    walletText.innerText = "Wallet: " + userAccount;
    statusText.innerText = "Status: Wallet connected";
    checkInBtn.disabled = false;

  } catch (error) {
    console.error(error);
    alert("Wallet connection failed");
  }
};

// 🟢 CHECK-IN (ONCHAIN TRANSACTION)
checkInBtn.onclick = async () => {
  try {
    statusText.innerText = "Status: Sending transaction...";

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

    const tx = await contract.checkIn();
    await tx.wait();

    messageText.innerText = "✅ Check-in successful! (On-chain)";
    statusText.innerText = "Status: Checked in";

  } catch (error) {
    console.error(error);
    messageText.innerText = "❌ Already checked in today or transaction failed";
    statusText.innerText = "Status: Failed";
  }
};
