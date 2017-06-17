require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('creates', () => {

  describe('make a call to timezone API', () => {
    it('should get a timezone object back', (done) => {
      const bundle = {
        inputData: {
          latitude: '33.835',
          longitude: '-118.3406',
        }
      };

      appTester(App.creates.timezone.operation.perform, bundle)
        .then((result) => {
          result.should.have.property('rawOffset');
          done();
        })
        .catch(done);
    });
  });
});
