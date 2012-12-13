"use strict";

/**
 * General DOM utilities
 */

var HTML5 = require( 'html5' ).HTML5;

var DOMUtils = {
	dataParsoid: function(n) {
		var str = n.getAttribute("data-parsoid");
		return str ? JSON.parse(str) : {};
	},

	setDataParsoid: function(n, dpObj) {
		n.setAttribute("data-parsoid", JSON.stringify(dpObj));
	},

	// Build path from n ---> ancestor
	// Doesn't include ancestor in the path itself
	pathToAncestor: function (n, ancestor) {
		var path = [];
		while (n && n !== ancestor) {
			path.push(n);
			n = n.parentNode;
		}

		return path;
	},

	pathToRoot: function(n) {
		return this.pathToAncestor(n, null);
	},

	// Build path from n ---> sibling (default)
	// If left is true, will build from sibling ---> n
	// Doesn't include sibling in the path in either case
	pathToSibling: function(n, sibling, left) {
		var path = [];
		while (n && n !== sibling) {
			path.push(n);
			n = left ? n.previousSibling : n.nextSibling;
		}

		return path;
	},

	// Does 'n1' occur before 'n2 in their parent's children list?
	inSiblingOrder: function(n1, n2) {
		while (n1 && n1 !== n2) {
			n1 = n1.nextSibling;
		}
		return n1 !== null;
	},

	// Is 'n1' an ancestor of 'n2' in the DOM?
	isAncestorOf: function (n1, n2) {
		while (n2 && n2 !== n1) {
			n2 = n2.parentNode;
		}
		return n2 !== null;
	},

	hasNodeName: function(n, name) {
		return n.nodeName.toLowerCase() === name;
	},

	isMarkerMeta: function(n, type) {
		return this.hasNodeName(n, "meta") && n.getAttribute("typeof") === type;
	},

	isTplMetaType: function(nType)  {
		return nType.match(/\bmw:Object(\/[^\s]+)*\b/);
	},

	isTplMarkerMeta: function(n)  {
		return (
			this.hasNodeName(n, "meta") &&
			this.isTplMetaType(n.getAttribute("typeof"))
		);
	},

	isTplStartMarkerMeta: function(n)  {
		if (this.hasNodeName(n, "meta")) {
			var t = n.getAttribute("typeof");
			var tMatch = t.match(/\bmw:Object(\/[^\s]+)*\b/);
			return tMatch && !t.match(/\/End\b/);
		} else {
			return false;
		}
	},

	isTplEndMarkerMeta: function(n)  {
		if (this.hasNodeName(n, "meta")) {
			var t = n.getAttribute("typeof");
			return t.match(/\bmw:Object(\/[^\s]+)*\/End\b/);
		} else {
			return false;
		}
	},

	hasLiteralHTMLMarker: function(dp) {
		return dp.stx === 'html';
	},

	isLiteralHTMLNode: function(n) {
		return this.hasLiteralHTMLMarker(this.dataParsoid(n));
	},

	isIndentPre: function(n) {
		return this.hasNodeName(n, "pre") && !this.isLiteralHTMLNode(n);
	},

	indentPreDSRCorrection: function(textNode) {
		// NOTE: This assumes a text-node and doesn't check
		var numNLs = (textNode.data.match(/\n/g)||[]).length;
		return numNLs && this.isIndentPre(textNode.parentNode) ? numNLs : 0;
	}
};

if (typeof module === "object") {
	module.exports.DOMUtils = DOMUtils;
}
