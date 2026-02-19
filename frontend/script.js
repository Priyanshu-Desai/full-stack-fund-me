async function connectMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        window.ethereum.request({ method: 'eth_requestAccounts' });
    } else {
        console.log('MetaMask is not installed. Please install it to use this app.');
    }
}