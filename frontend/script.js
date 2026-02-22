async function connectMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        document.getElementById('connect').innerText = 'Connected';
    } else {
        console.log('MetaMask is not installed. Please install it to use this app.');
        document.getElementById('connect').innerText = 'Install MetaMask';
    }
}