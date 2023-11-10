import path from 'node:path';
import { fileURLToPath } from 'node:url';
import SassyTest from 'sassy-test';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('Fork versions', function() {
  describe('Default fork', function() {
    it('should compile properly', function() {
      const sassyTest = new SassyTest({
        fixtures: path.join(__dirname, 'fixtures/fork-versions'),
        loadPaths: [
          // Path to fork version.
          path.join(__dirname, '../fork-versions/default')
        ]
      });
      return sassyTest.compileFixture('default');
    });
  });

  describe('Typey fork', function() {
    it('should compile properly', async function() {
      const typeyPath = fileURLToPath(import.meta.resolve('typey'));
      const sassyTest = new SassyTest({
        fixtures: path.join(__dirname, 'fixtures/fork-versions'),
        loadPaths: [
          // Path to fork version.
          path.join(__dirname, '../fork-versions/typey'),
          // Path to the fork's dependencies.
          path.dirname(typeyPath)
        ]
      });
      return sassyTest.compileFixture('typey');
    });
  });

  describe('Typey, Chroma and KSS fork', async function() {
    it('should compile properly', async function() {
      const chromaPath = fileURLToPath(import.meta.resolve('chroma-sass'));
      const typeyPath = fileURLToPath(import.meta.resolve('typey'));
      const sassyTest = new SassyTest({
        fixtures: path.join(__dirname, 'fixtures/fork-versions'),
        loadPaths: [
          // Path to fork version.
          path.join(__dirname, '../fork-versions/typey-chroma-kss'),
          // Path to the fork's dependencies.
          path.dirname(chromaPath),
          path.dirname(typeyPath)
        ]
      });
      return sassyTest.compileFixture('typey-chroma-kss');
    });
  });
});
