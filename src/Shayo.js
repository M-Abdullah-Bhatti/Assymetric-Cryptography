import React, { useState } from "react";

async function generateKeyPair() {
  return await crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  );
}

async function exportPublicKeyToPem(publicKey) {
  const exported = await crypto.subtle.exportKey("spki", publicKey);
  const exportedAsString = String.fromCharCode.apply(
    null,
    new Uint8Array(exported)
  );
  const pemHeader = "-----BEGIN PUBLIC KEY-----\n";
  const pemFooter = "\n-----END PUBLIC KEY-----";
  return pemHeader + btoa(exportedAsString) + pemFooter;
}

async function encryptFile(file, recipientPublicKey) {
  const fileBytes = await file.arrayBuffer();
  const encryptedBytes = await crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    recipientPublicKey,
    fileBytes
  );
  return new Blob([encryptedBytes]);
}

function Shayo() {
  const [file, setFile] = useState(null);
  const [publicKey, setPublicKey] = useState(null);
  const [encryptedFile, setEncryptedFile] = useState(null);

  async function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  async function handleGenerateKeyPair() {
    const { publicKey } = await generateKeyPair();
    const publicKeyPem = await exportPublicKeyToPem(publicKey);
    setPublicKey(publicKeyPem);
  }

  async function handleEncryptFile() {
    const encryptedFile = await encryptFile(file, publicKey);
    setEncryptedFile(encryptedFile);
  }

  return (
    <div>
      <h1>File Encryption Example</h1>
      <label>
        Choose a file to encrypt:
        <input type="file" onChange={handleFileChange} />
      </label>
      <br />
      <button onClick={handleGenerateKeyPair}>Generate Key Pair</button>
      {publicKey && (
        <div>
          <h2>Public Key</h2>
          <pre>{publicKey}</pre>
        </div>
      )}
      {file && (
        <div>
          <h2>File Details</h2>
          <p>Name: {file.name}</p>
          <p>Type: {file.type}</p>
          <p>Size: {file.size} bytes</p>
          <button onClick={handleEncryptFile}>Encrypt File</button>
        </div>
      )}
      {encryptedFile && (
        <div>
          <h2>Encrypted File</h2>
          <p>Name: {file.name}.enc</p>
          <p>Type: application/octet-stream</p>
          <p>Size: {encryptedFile.size} bytes</p>
          <a
            href={URL.createObjectURL(encryptedFile)}
            download={`${file.name}.enc`}
          >
            Download Encrypted File
          </a>
        </div>
      )}
    </div>
  );
}

export default Shayo;
