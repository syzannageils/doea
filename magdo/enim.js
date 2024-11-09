class AESGCMBytes {
    async encrypt(data, key) {
        const encodedData = new TextEncoder().encode(data);
        const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Initialization vector
        const cryptoKey = await window.crypto.subtle.importKey(
            'raw',
            key,
            { name: 'AES-GCM' },
            false,
            ['encrypt']
        );
        const encryptedData = await window.crypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv: iv
            },
            cryptoKey,
            encodedData
        );
        return { iv, encryptedData };
    }

    async decrypt(encryptedObj, key) {
        const cryptoKey = await window.crypto.subtle.importKey(
            'raw',
            key,
            { name: 'AES-GCM' },
            false,
            ['decrypt']
        );
        const decryptedData = await window.crypto.subtle.decrypt(
            {
                name: 'AES-GCM',
                iv: encryptedObj.iv
            },
            cryptoKey,
            encryptedObj.encryptedData
        );
        return new TextDecoder().decode(decryptedData);
    }
}

// Example usage:
(async () => {
    const aes = new AESGCMBytes();
    const key = window.crypto.getRandomValues(new Uint8Array(16)); // 128-bit key
    const data = "Hello, World!";
    
    const encryptedObj = await aes.encrypt(data, key);
    console.log("Encrypted Data:", encryptedObj);

    const decryptedData = await aes.decrypt(encryptedObj, key);
    console.log("Decrypted Data:", decryptedData);
})();
