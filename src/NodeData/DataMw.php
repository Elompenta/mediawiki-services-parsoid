<?php
declare( strict_types = 1 );

namespace Wikimedia\Parsoid\NodeData;

use stdClass;

/**
 * Editing data for a DOM node.  Managed by DOMDataUtils::get/setDataMw().
 *
 * To reduce memory usage, most of the properties need to be dynamic, but
 * we use the property declarations below to allow type checking.
 *
 * @property list<string|stdClass> $parts
 * @property string $name
 * @property string $extPrefix
 * @property string $extSuffix
 * @property list $attribs
 * @property string $src
 * @property string $caption
 * @property string $thumb
 * @property bool $autoGenerated
 * @property list $errors
 * @property stdClass $body
 * @property mixed $html
 * @property float $scale
 * @property string $starttime
 * @property string $endtime
 * @property string $thumbtime
 * @property string $page
 * == Annotations ==
 * @property string $rangeId
 * @property list<int> $wtOffsets
 * @property bool $extendedRange
 * @property stdClass $attrs
 */
#[\AllowDynamicProperties]
class DataMw {
	public function __construct( array $initialVals = [] ) {
		foreach ( $initialVals as $k => $v ) {
			// @phan-suppress-next-line PhanNoopSwitchCases
			switch ( $k ) {
				// Add cases here for components which should be instantiated
				// as proper classes.
			default:
				$this->$k = $v;
				break;
			}
		}
	}
}