document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('plaintext').value = e.target.result;
        };
        reader.readAsText(file);
    }
});

function encrypt() {
    const plaintext = document.getElementById('plaintext').value;
    const key = document.getElementById('key').value;
    const cipherMethod = document.getElementById('cipherMethod').value;
    let result = '';

    if (!plaintext || !key) {
        alert("Plaintext dan kunci tidak boleh kosong!");
        return;
    }

    switch (cipherMethod) {
        case 'vigenere':
            result = vigenereEncrypt(plaintext, key);
            break;
        case 'autokeyVigenere':
            result = autoVigenereEncrypt(plaintext, key);
            break;
        case 'playfair':
            result = playfairEncrypt(plaintext, key);
            break;
        default:
            result = 'Metode enkripsi tidak dikenali!';
    }

    document.getElementById('outputText').innerText = result;
}

function decrypt() {
    const ciphertext = document.getElementById('plaintext').value;
    const key = document.getElementById('key').value;
    const cipherMethod = document.getElementById('cipherMethod').value;
    let result = '';

    if (!ciphertext || !key) {
        alert("Ciphertext dan kunci tidak boleh kosong!");
        return;
    }

    switch (cipherMethod) {
        case 'vigenere':
            result = vigenereDecrypt(ciphertext, key);
            break;
        case 'autokeyVigenere':
            result = autoVigenereDecrypt(ciphertext, key);
            break;
        case 'playfair':
            result = playfairDecrypt(ciphertext, key);
            break;
        default:
            result = 'Metode dekripsi tidak dikenali!';
    }

    document.getElementById('outputText').innerText = result;
}

function vigenereEncrypt(plaintext, key) {
    plaintext = plaintext.replace(/[^a-zA-Z]/g, '').toUpperCase();
    key = key.toUpperCase();
    let ciphertext = '';
    for (let i = 0, j = 0; i < plaintext.length; i++) {
        const c = plaintext.charCodeAt(i);
        const k = key.charCodeAt(j % key.length);
        ciphertext += String.fromCharCode((c + k - 2 * 65) % 26 + 65);
        j++;
    }
    return ciphertext;
}

function autoVigenereEncrypt(plaintext, key) {
    plaintext = plaintext.replace(/[^a-zA-Z]/g, '').toUpperCase();
    key = key.toUpperCase() + plaintext;
    let ciphertext = '';
    for (let i = 0; i < plaintext.length; i++) {
        const c = plaintext.charCodeAt(i);
        const k = key.charCodeAt(i);
        ciphertext += String.fromCharCode((c + k - 2 * 65) % 26 + 65);
    }
    return ciphertext;
}

function playfairEncrypt(ciphertext, key) {
    ciphertext = ciphertext.replace(/[^a-zA-Z]/g, '').toUpperCase();
    key = key.toUpperCase();
    let plaintext = '';
    for (let i = 0, j = 0; i < ciphertext.length; i++) {
        const c = ciphertext.charCodeAt(i);
        const k = key.charCodeAt(j % key.length);
        plaintext += String.fromCharCode((c - k + 26) % 26 + 65);
        j++;
    }
    return plaintext;
}

function autoVigenereDecrypt(ciphertext, key) {
    ciphertext = ciphertext.replace(/[^a-zA-Z]/g, '').toUpperCase();
    key = key.toUpperCase();
    let plaintext = '';
    for (let i = 0; i < ciphertext.length; i++) {
        const c = ciphertext.charCodeAt(i);
        const k = (i < key.length) ? key.charCodeAt(i) : plaintext.charCodeAt(i - key.length);
        plaintext += String.fromCharCode((c - k + 26) % 26 + 65);
    }
    return plaintext;
}
