import { expect } from 'chai';
import eyeglass from 'eyeglass';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import SassyTest from 'sassy-test';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sassyTest = new SassyTest({
  fixtures: path.join(__dirname, 'fixtures/eyeglass')
});
const options = {
  eyeglass: {
    // Eyeglass will look in the root for a package.json.
    root: sassyTest.fixture()
  }
};

describe('Eyeglass integration tests', function() {
  it('should fail to import Normalize without Eyeglass', function() {
    return sassyTest.compileFixture('import-normalize').then(function() {
      throw new Error('An error should have occurred');
    }).catch(function(error) {
      expect(error).to.exist;
      expect(error.message).to.include('Can\'t find stylesheet to import.');
      expect(error.message).to.include('\'normalize\'');
    });
  });

  it('should import Normalize with Eyeglass', function() {
    return sassyTest.compileFixture('import-normalize', eyeglass(options));
  });
});
