const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect; // Определяем тип машины (прямая или обратная)
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error("Incorrect arguments!");
    }

    return this.process(message, key, true);
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) {
      throw new Error("Incorrect arguments!");
    }

    return this.process(encryptedMessage, key, false);
  }

  process(input, key, isEncrypting) {
    input = input.toUpperCase();
    key = key.toUpperCase();

    const result = [];
    const A = 65;
    const Z = 90;
    const alphabetLength = 26;

    let keyIndex = 0;

    for (let i = 0; i < input.length; i++) {
      const charCode = input.charCodeAt(i);

      if (charCode >= A && charCode <= Z) {
        const keyCharCode = key.charCodeAt(keyIndex % key.length) - A;
        const shift = isEncrypting
          ? (charCode - A + keyCharCode) % alphabetLength
          : (charCode - A - keyCharCode + alphabetLength) % alphabetLength;

        result.push(String.fromCharCode(A + shift));
        keyIndex++;
      } else {
        result.push(input[i]);
      }
    }

    return this.isDirect ? result.join("") : result.reverse().join("");
  }
}

module.exports = {
  VigenereCipheringMachine,
};
