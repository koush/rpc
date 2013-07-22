var net = require('net');
var binary = require('binary');
var Process = require('./process');
var util = require('util');

function RemoteProcess() {
  Process.apply(this, arguments);

  this.vm = arguments[0];
  var self = this;
  var generator = this.getGenerator();
  var next = generator.next;
  generator.next = function() {
    self.resume();
    var i = next.apply(this, arguments);
    self.suspend();
    return i;
  }.bind(generator);
}
util.inherits(RemoteProcess, Process);

RemoteProcess.prototype.resume = function() {
  this.vm.currentProcess = this;
}

RemoteProcess.prototype.suspend = function() {
  this.vm.currentProcess = null;
}

RemoteProcess.prototype.run = function*() {
  await* = Process.prototype.getGenerator.apply(this, arguments);
}

RemoteProcess.prototype.vm = null;




function VirtualMachine(options) {
}

VirtualMachine.prototype.currentProcess = null;

function remoteKey(options) {
  return options.host + ':' + options.port;
}

VirtualMachine.prototype._rpc = function(options) {
  var key = remoteKey(options);
}

VirtualMachine.prototype.execute = function(f) {
  return new RemoteProcess(this, f);
}

VirtualMachine.prototype.nodes = {};

VirtualMachine.prototype._handle = function(buf) {
  var data = buf.toString();
  console.log(data);
}

VirtualMachine.prototype._connect_loop = function*(c) {
  while (true) {
    await vars = binary().word32bu('len').tap();
    var len = vars.len;
    console.log('got len: ' + len);
    await vars = binary().buffer('buf', len).tap();
    var buf = vars.buf;
    console.log('got buf: ' + buf);
    this._handle(buf);
  }
}

VirtualMachine.prototype.connect = function(options) {
  var self = this;
  var c = net.connect(options, function() {
    console.log('connected');
    self._connect_loop(c).next();
  });
  c.on('error', function() {
    
  })
  var key = remoteKey(options);
  this.nodes[key] = c;
}

VirtualMachine.prototype.listen = function(options) {
  var self = this;
  var server = net.createServer(function(c) {
    console.log('listened');
    var key = remoteKey(options);
    self.nodes[key] = c;
    self._connect_loop(c).next();
  });
  server.on('error', function() {
  })
  
  server.listen(options.port);
  return server;
}

exports.VirtualMachine = VirtualMachine;
exports.RemoteProcess = RemoteProcess;