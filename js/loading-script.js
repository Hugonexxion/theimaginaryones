(() => {
  setInterval(() => {
    let n = `0x${generateRandomString(3)}...${generateRandomString(
      3
    )} just minted ${getRdm(1, 4)} NFTs!`;
    notify(n);
  }, 4000);
})();

function getRdm(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Generate a random string of a given length
function generateRandomString(length) {
  const possibleCharacters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";
  for (let i = 0; i < length; i++) {
    text += possibleCharacters.charAt(
      Math.floor(Math.random() * possibleCharacters.length)
    );
  }
  return text;
}

function notify(msg) {
  Toastify({
    text: msg,
    duration: 2000,
    gravity: "top",
    position: "right",
  }).showToast();
}
