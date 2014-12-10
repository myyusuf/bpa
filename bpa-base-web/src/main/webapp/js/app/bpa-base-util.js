var BPA = BPA || {};

BPA.Util = BPA.Util || {};

BPA.Util = {
		getRandomId: function(predifinedId){
			return predifinedId + "_" + Math.floor(Math.random() * 1000) + Date.now();
		}
};

var inheritPrototype = function(childObject, parentObject) {
	var copyOfParent = Object.create(parentObject.prototype);
	copyOfParent.constructor = childObject;
	childObject.prototype = copyOfParent;
}