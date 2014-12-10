define([], function () {
	
	var Observable = function(theSubscribers){
		this.subscribers = theSubscribers;
	}
	
	Observable.prototype.visitSubscribers = function (action, arg, type) {
		var _pubtype = type || 'any',
		_tmpsubscribers = this.subscribers[_pubtype], i, _max = _tmpsubscribers.length;
		for (i = 0; i < _max; i += 1) {
			if (action === 'publish') {
				_tmpsubscribers[i](arg);
			} else {
				if (_tmpsubscribers[i] === arg) {
					_tmpsubscribers.splice(i, 1);
				}
			}
		}
	};
	
	Observable.prototype.subscribe = function (fn, type) {
		type = type || 'any';
		if (typeof this.subscribers[type] === "undefined") {
			this.subscribers[type] = [];
		}
			this.subscribers[type].push(fn);
	};
	
	Observable.prototype.unsubscribe = function (fn, type) {
		this.visitSubscribers('unsubscribe', fn, type);
	};
	
	Observable.prototype.publish = function (publication, type) {
		this.visitSubscribers('publish', publication, type);
	};
	
    return Observable;
    
});