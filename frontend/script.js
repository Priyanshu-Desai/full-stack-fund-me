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
