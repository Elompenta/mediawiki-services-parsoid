/**
 * Generic node factory.
 * 
 * @class
 * @constructor
 */
ve.NodeFactory = function() {
	this.registry = [];
};

/* Methods */

/**
 * Register a node type with the factory.
 * 
 * Arguments will be passed through directly to the constructor.
 * @see {ve.NodeFactory.prototype.createNode}
 * 
 * @param {String} type Node type
 * @param {Function} constructor Node constructor subclassing ve.Node
 * @throws 'Constructor must be a function, cannot be a string'
 */
ve.NodeFactory.prototype.register = function( type, constructor ) {
	if ( typeof constructor !== 'function' ) {
		throw 'Constructor must be a function, cannot be a ' + typeof constructor;
	}
	this.registry[type] = constructor;
};

/**
 * Create a node based on a type.
 * 
 * Type is used to look up the constructor to use, while all additional arguments are passed to the
 * constructor directly, so leaving one out will pass an undefined to the constructor.
 * 
 * WARNING: JavaScript does not allow using new and .apply together, so we just pass through 2
 * arguments here since we know we only need that many at this time. If we need more in the future
 * we should change this to suit that use case. Because of undefined pass through, there's no harm
 * in adding more.
 * 
 * @param {String} type Node type
 * @param {Mixed} [...] Up to 2 additional arguments to pass through to the constructor
 * @returns {ve.Node} The new node object
 * @throws 'Unknown node type'
 */
ve.NodeFactory.prototype.createNode = function( type, a, b ) {
	if ( type in this.registry ) {
		return new this.registry[type]( a, b );
	}
	throw 'Unknown node type: ' + type;
};

/**
 * Checks if a given node type can have child nodes.
 * 
 * @param {String} type Node type
 * @returns {Boolean} The node can have children
 * @throws 'Unknown node type'
 */
ve.NodeFactory.prototype.canNodeHaveChildren = function( type ) {
	if ( type in this.registry ) {
		return this.registry[type].rules.canHaveChildren;
	}
	throw 'Unknown node type: ' + type;
};

/**
 * Checks if a given node type can have grandchild nodes.
 * 
 * @param {String} type Node type
 * @returns {Boolean} The node can have grandchildren
 * @throws 'Unknown node type'
 */
ve.NodeFactory.prototype.canNodeHaveGrandchildren = function( type ) {
	if ( type in this.registry ) {
		return this.registry[type].rules.canHaveGrandchildren;
	}
	throw 'Unknown node type: ' + type;
};
