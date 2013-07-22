var util = require('util');
var Process = require('./process');
var vm = require('./vm');
var RemoteProcess = vm.RemoteProcess;

var v = new vm.VirtualMachine();

function timeout(time, cb) {
  setTimeout(cb, time);
}

var p = v.execute(function*($) {
  console.log('waiting');
  console.log(arguments);
  await foo = $('foo');
  console.log(foo);
});


setTimeout(function() {
  p.$('foo', 'bar');
}, 2000);

// var util = require('util');
// var Serializer = require('./serializer');
// var inherit = require('./inherit');
// 
// var s = new Serializer();
// 
// function Foo() {
//   console.log('foo init');
// }
// 
// Foo.prototype.poop = function() {
//   console.log(this.data);
// }
// 
// Foo.prototype.data = 2;
// Foo.prototype.serialize = function(o) {
//   o.data = this.data;
// }
// 
// function Bar() {
//   Foo.apply(this);
// }
// util.inherits(Bar, Foo);
// 
// Bar.prototype.data2 = 4;
// Bar.prototype.poop = function() {
//   Foo.prototype.poop.call(this);
//   console.log(this.data2);
// }
// Bar.prototype.serialize = function(o) {
//   o.data2 = this.data2;
// }
// 
// s.register(Foo)
// s.register(Bar)
// 
// var f = new Bar();
// f.data = 5;
// f.poop();
// 
// var data = s.serialize(f);
// console.log(data);
// var f2 = s.deserialize(data);
// 
// f2.poop();
