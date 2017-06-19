require('should');
/* global describe, it */
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

  describe('make a call to timezonebyName API', () => {
    it('should get a timezone object back cor US Central Time', (done) => {
      const bundle = {
        inputData: {
          zoneName: 'CT',
        }
      };

      appTester(App.creates.timezoneName.operation.perform, bundle)
        .then((result) => {
          result.should.have.property('timeZoneName').which.containEql("Central");
          done();
        })
        .catch(done);
    });

    it('should get a timezone object back for Central Europe', (done) => {
      const bundle = {
        inputData: {
          zoneName: 'CET',
        }
      };

      appTester(App.creates.timezoneName.operation.perform, bundle)
        .then((result) => {
          result.should.have.property('timeZoneName').which.containEql("Central European");
          done();
        })
        .catch(done);
    });

    it('should get a status object back for a bad timezone', (done) => {
      const bundle = {
        inputData: {
          zoneName: 'FAKE',
        }
      };

      appTester(App.creates.timezoneName.operation.perform, bundle)
        .then((result) => {
          result.should.have.property('status').which.containEql("ERROR");
          console.log(result);
          done();
        })
        .catch(done);
    });
  });









});