// npm init
// npm install lrs (Linkable Ring Signatures are cryptographic primitives that allow someone to sign a message in name of a group.)
// Run with command: node ring.js

var lrs = require("lrs"); 

// 3 parties generate their public and private key pairs
var alice = lrs.gen();
var bob = lrs.gen();
var eve = lrs.gen();

// The list of public key is known and distributed
// We are getting all the public keys and storing it in "group"
var group = [alice, bob, eve].map((m) => m.publicKey);

// Alice signs a message in behalf of one of the 3
var signed = lrs.sign(group, alice, "The body is buried on the backyard.");

// Anyone is able to verify that one of them signed that message
var verified = lrs.verify(group, signed, "The body is buried on the backyard.");
console.log("The sign has been verified as ", verified);
  
// If that same person signs another message...
var signed2 = lrs.sign(group, alice, "Just kidding, he is alive.");
//var signed2 = lrs.sign(group, bob, "Just kidding, he is alive.");

// We are able to tell the signature came from the same person By comparing signed and signed2
var compared = lrs.link(signed, signed2);

if (compared == true) {
    console.log("Both signatures are from the same person.");
} else {
    console.log("Both signatures are not from the same person.");
}
