let userAccount = null;

const connectBtn = document.getElementById("connect");
const checkInBtn = document.getElementById("checkin");
const walletText = document.getElementById("wallet");
const statusText = document.getElementById("status");
const messageText = document.getElementById("message");

// Disable check-in button until wallet is connected
checkInBtn.disabled = true;

// Connect Wallet
connectBtn.onclick = async () => {
  if (!window.ethereum) {
    alert("MetaMask not detected. Please install MetaMask.");
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    userAccount = accounts[0];
    walletText.innerText = "Wallet: " + userAccount;
    statusText.innerText = "Status: Wallet connected";
    checkInBtn.disabled = false;
  } catch (error) {
    console.error(error);
    alert("Wallet connection failed");
  }
};

// Check-In Button (Onchain next step)
checkInBtn.onclick = () => {
  messageText.innerText = "✅ Check-in button clicked (onchain coming next)";
};

