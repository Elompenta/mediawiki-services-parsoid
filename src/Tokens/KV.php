<?php
// phpcs:disable MediaWiki.Commenting.FunctionComment.DefaultNullTypeParam -- T218324, T218816
declare( strict_types = 1 );

namespace Parsoid\Tokens;

/**
 * Represents a Key-value pair.
 */
class KV implements \JsonSerializable {
	/** Commonly a string, but where the key might be templated,
	 *  this can be an array of tokens even.
	 * @var string|array<Token>
	 */
	public $k;

	/** @var string|Token|array<Token> */
	public $v;

	/** @var ?array<int> wikitext source offsets (Unicode char units) */
	public $srcOffsets;

	/** @var ?string wikitext source */
	public $ksrc;

	/** @var ?string wikitext source */
	public $vsrc;

	/**
	 * @param string|array<Token> $k
	 *     Commonly a string, but where the key might be templated,
	 *     this can be an array of tokens even.
	 * @param string|Token|array<Token> $v
	 *     The value: string, token, of an array of tokens
	 * @param ?array<int> $srcOffsets wikitext source offsets (Unicode char units)
	 * @param ?string $ksrc
	 * @param ?string $vsrc
	 */
	public function __construct(
		$k, $v, ?array $srcOffsets = null,
		?string $ksrc = null, ?string $vsrc = null
	) {
		$this->k = $k;
		$this->v = $v;
		$this->srcOffsets = $srcOffsets;
		if ( $ksrc ) {
			$this->ksrc = $ksrc;
		}
		if ( $vsrc ) {
			$this->vsrc = $vsrc;
		}
	}

	/**
	 * Lookup a string key in a KV array and return the first matching KV object
	 *
	 * @param ?array<KV> $kvs
	 * @param string $key
	 * @return ?KV
	 */
	public static function lookupKV( ?array $kvs, string $key ): ?KV {
		if ( $kvs === null ) {
			return null;
		}

		foreach ( $kvs as $kv ) {
			// PORT-FIXME: JS trim() will remove non-ASCII spaces (such as NBSP) too,
			// while PHP's won't. Does that matter?
			if ( is_string( $kv->k ) && trim( $kv->k ) === $key ) {
				return $kv;
			}
		}

		return null;
	}

	/**
	 * Lookup a string key (first occurrence) in a KV array
	 * and return the value of the KV object
	 *
	 * @param ?array<KV> $kvs
	 * @param string $key
	 * @return string|Token|array<Token>
	 */
	public static function lookup( ?array $kvs, string $key ) {
		$kv = self::lookupKV( $kvs, $key );
		// PORT_FIXME: Potential bug lurking here ... if $kv->v is an array
		// this will return a copy, which if modified will not reflect
		// in the original KV object.
		return $kv === null ? null : $kv->v;
	}

	/**
	 * @inheritDoc
	 */
	public function jsonSerialize(): array {
		$ret = [ "k" => $this->k, "v" => $this->v ];
		if ( $this->srcOffsets ) {
			$ret["srcOffsets"] = $this->srcOffsets;
		}
		if ( $this->ksrc ) {
			$ret["ksrc"] = $this->ksrc;
		}
		if ( $this->vsrc ) {
			$ret["vsrc"] = $this->vsrc;
		}
		return $ret;
	}
}
