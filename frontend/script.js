import { ethers } from "./ethers-5.7.esm.min.js";

connectButton = document.getElementById("connect");
fundButton = document.getElementById("fund");

connectButton.onclick = connectMetaMask;
fundButton.onclick = fund;

async function connectMetaMask() {
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.error("User denied account access", error);
    }
    document.getElementById("connect").innerText = "Connected";
  } else {
    console.log(
      "MetaMask is not installed. Please install it to use this app.",
    );
    document.getElementById("connect").innerText = "Install MetaMask";
  }
}

async function fund(ethAmount) {
  console.log(`Funding with ${ethAmount} ETH...`);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractAddress = "0xYourContractAddress";
  }
  x``;
}
