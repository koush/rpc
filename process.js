function Process() {
  var args = Array.prototype.slice.call(arguments);
  var generatorFunc = args.pop();
  args.unshift(this._receive.bind(this));
  this._generator = generatorFunc.apply(null, args);
  process.nextTick(function() {
    // kick off the process
    this.run().next();
  }.bind(this));
}

Process.prototype.getGenerator = function() {
  return this._generator;
}

Process.prototype.run = function*() {
  await* = this.getGenerator();
}

Process.prototype._event_queue = {};
Process.prototype._receive = function(event, callback) {
  this._receive.event = event;
  this._receive.callback = callback;
  this._check_event(event, this._event_queue[event]);
}

Process.prototype._check_event = function(event, queue) {
  // see if we're waiting for this
  if (this._receive.event != event) {
    return;
  }

  // grab the queue as necessary
  if (!queue) {
    queue = this._event_queue[event];
  }

  // see if we have a queued event
  if (!queue || !queue.length) {
    return;
  }

  var args = queue.shift();
  if (!queue.length) {
    delete this._event_queue[event];
  }

  var callback = this._receive.callback;
  
  delete this._receive.event;
  delete this._receive.callback;
  callback.apply(this, args);
}

Process.prototype.send = function() {
  var event = arguments[0];
  var args = [];
  for (var i = 1; i < Object.keys(arguments).length; i++) {
    args.push(arguments[i]);
  }
  var queue = this._event_queue[event];
  if (!queue) {
    queue = this._event_queue[event] = [];
  }
  
  queue.push(args);
  
  this._check_event(event, queue);
}

Process.prototype.$ = Process.prototype.send;

module.exports = Process;