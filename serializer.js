function Serializer() {
}

Serializer.prototype._types = {};

Serializer.prototype.register = function(type) {
  this._types[type.name] = type;
}

Serializer.prototype.serialize = function(object) {
  var c = object.constructor;
  
  var data = {};
  while (c) {
    if (c.prototype.serialize) {
      c.prototype.serialize.call(object, data);
    }
    c = c.super_;
  }

  return {
    type: object.constructor.name,
    properties: data
  }
}

Serializer.prototype.deserialize = function(data) {
  var type = this._types[data.type];
  console.log(type);
  var instance = new type();
  for (var k in data.properties) {
    instance[k] = data.properties[k];
  }
  return instance;
}

module.exports = Serializer;