// 21

import { Blockchain } from '../blockchain/index'; // 37
import { Block } from '../blockchain/block';

describe("Blockchain", () => {
    let blockchain: Blockchain;
    let blockchain2: Blockchain; // 29

    beforeEach(() => {
        blockchain = new Blockchain();
        blockchain2 = new Blockchain(); // 29
    });

    it('starts with the genesis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block', () => {
        const data = "foo";
        blockchain.addBlock(data);
        expect(blockchain.chain[blockchain.chain.length -
            1].data).toEqual(data);
    });

    // 30
    it('validates a valid chain', () => {
        blockchain2.addBlock('foo');
        // conventional method for check true and false is toBe
        expect(blockchain.isValidChain(blockchain2.chain)).toBe(true);
    });
    it('invalidates a chain with a corrupted genesis block', () => {
        blockchain2.chain[0].data = 'bad data';
        expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);
    });
    it('invalidates a corrupt chain', () => {
        blockchain2.addBlock('foo');
        blockchain2.chain[1].data = 'not foo';
        expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);
    });

    // 31
    it('replaces the chain with a valid chain', () => {
        blockchain2.addBlock('goo');
        blockchain.replaceChain(blockchain2.chain);
        expect(blockchain.chain).toEqual(blockchain2.chain);
    });
    it('does not replaces the chain with a one with less than or equal to chain', () => {
        blockchain.addBlock('foo');
        blockchain.replaceChain(blockchain2.chain);
        expect(blockchain.chain).not.toEqual(blockchain2.chain);
    });
});