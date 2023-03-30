import React from "react";
import JSEncrypt from "jsencrypt";

const Decrypt = () => {
  let encryptor = new JSEncrypt({ default_key_size: 2048 });
  const privateKey = localStorage.getItem("privateKey");
  const encrypthash = localStorage.getItem("encrypthash");
  const decrypt = () => {
    encryptor.setPrivateKey(privateKey);
    let decrypted = encryptor.decrypt(encrypthash);
    console.log(decrypted);
  };
  return (
    <div>
      <button onClick={decrypt}>decrypt</button>
    </div>
  );
};

export default Decrypt;
