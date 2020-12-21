// 10
const SHA256 = require('crypto-js/sha256');

// 6
class Block {

    constructor(timestamp, lastHash, hash, data) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    // 7
    toString() {
        return `Block -
        Timestamp : ${this.timestamp}
        Last Hash : ${this.lastHash.substring(0, 10)}
        Hash : ${this.hash.substring(0, 10)}
        Data : ${this.data}`;
    }

    // 8
    static genesis() {
        return new this('Genesis time', '----', 'genesis-hash', []);
    }

    // 11
    static hash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }

    // 12
    static mineBlock(lastBlock, data) {
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        return new this(timestamp, lastHash, this.hash(timestamp,
            lastHash, data), data);
    }
    
}
module.exports = Block;