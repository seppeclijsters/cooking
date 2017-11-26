// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const Readable = require('stream').Readable;
class MyStream extends Readable {
 constructor(opts) {
 super(opts);
 }
 _read() {
 }
}
// hook in our stream
process.__defineGetter__('stdin', () => {
 if (process.__stdin) return process.__stdin;
 process.__stdin = new MyStream();
 return process.__stdin;
});


const five = require('johnny-five');
const board = new five.Board();
board.on("ready", () => {
 const led = new five.Led(13);
 led.blink(500);
});

// const Readable = require('stream').Readable;
// const util = require('util');
//
// util.inherits(MyStream, Readable);
// function MyStream(opt) {
//   Readable.call(this, opt);
// }
// MyStream.prototype._read = function() {};
// // hook in our stream
// process.__defineGetter__('stdin', function() {
//   if (process.__stdin) return process.__stdin
//   process.__stdin = new MyStream()
//   return process.__stdin
// });
