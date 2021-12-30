// unitary tests file
const { describe, it } = require('mocha');
const chai = require('chai');

const { expect } = chai;

describe.skip('basic test', () => {
  it('test', () => { expect(1).to.equal(1); });
});
