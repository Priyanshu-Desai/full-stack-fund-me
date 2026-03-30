import { ethers } from "./ethers-5.2.esm.min.js";
import { abi, contractAddress } from "./constants.js";

const connectButton = document.getElementById("connect");
const fundButton = document.getElementById("fund");
const balanceButton = document.getElementById("balance");

connectButton.onclick = connectMetaMask;
fundButton.onclick = fund;
balanceButton.onclick = getBalance;

async function connectMetaMask() {
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.error("User denied account access", error);
    }
    connectButton.innerText = "Connected";
  } else {
    console.log(
      "MetaMask is not installed. Please install it to use this app.",
    );
    connectButton.innerText = "Install MetaMask";
  }
}

async function getBalance() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(contractAddress);
    console.log(
      `Balance of contract at ${contractAddress}: ${ethers.utils.formatEther(balance)} ETH`,
    );
  } else {
    console.log(
      "MetaMask is not installed. Please install it to use this app.",
    );
  }
}


async function fund(ethAmount) {
  ethAmount = document.getElementById("ethAmount").value;
  console.log(`Funding with ${ethAmount} ETH...`);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log("Signer:", signer);
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const transactionResponse = await contract.fund({
      value: ethers.utils.parseEther(ethAmount),
    });
    await listenForTransactionMine(transactionResponse, provider);
    console.log("Funding complete!");
  }
}

function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}...`);
  return new Promise((resolve, reject) => {
    provider.once(transactionResponse.hash, (transactionReceipt) => {
      console.log(
        `Completed with ${transactionReceipt.confirmations} confirmations.`,
      );
      resolve();
    });
  });
}
