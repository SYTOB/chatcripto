
// Execute when they click the button.
var encrypt = function (privateKey, data) {

    // Create the encryption object.
    var crypt = new JSEncrypt();

    // Set the private.
    crypt.setPrivateKey(privateKey);

    return crypt.encrypt(data);

}

var decrypt = function (publicKey, data) {

    // Create the encryption object.
    var crypt = new JSEncrypt();

    // Set the private.
    crypt.setPublicKey(publicKey);

    return crypt.decrypt(data);

}

var generateKeys = function () {

    var keySize = 2048;
    var crypt = new JSEncrypt({ default_key_size: keySize });

    crypt.getKey();

    var privateKey = crypt.getPrivateKey();
    var publicKey = crypt.getPublicKey();

    return { privateKey, publicKey }
}
