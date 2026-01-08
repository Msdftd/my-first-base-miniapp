let userAccount = null;

// 👇 YAHAN APNA CONTRACT ADDRESS DAALNA HAI
const CONTRACT_ADDRESS = "0xe4E190fF37396B0870360753Af9112571dEA8CEa";

// ABI (isko mat chhedna)
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

const connectBtn = document.getElementById("connect");
const checkInBtn = document.getElementById("checkin");
const walletText = document.getElementById("wallet");
const statusText = document.getElementById("status");
const messageText = document.getElementById("message");

checkInBtn.disabled = true;

// WALLET CONNECT
connectBtn.onclick = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();

  userAccount = await signer.getAddress();
  walletText.innerText = "Wallet: " + userAccount;
  statusText.innerText = "Status: Wallet connected";
  checkInBtn.disabled = false;
};

// BUTTON CLICK = BLOCKCHAIN CALL
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

    messageText.innerText = "✅ Check-in successful (onchain)";
    statusText.innerText = "Status: Checked in";

  } catch (err) {
    messageText.innerText = "❌ Already checked in or error";
    statusText.innerText = "Status: Failed";
  }
};
