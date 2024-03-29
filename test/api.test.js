// test/api.test.js

const chai = require('chai');
const chaiHttp = require('chai-http');
// import server app
const test_server = require('../index');
const { idleTimeoutMillis } = require('pg/lib/defaults');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Api Tests', () => {
    it('should return 200 OK', (done) => {
        chai.request(test_server)
        .get('/')
        .end((error, response) => {
            expect(response).to.have.status(200);
            done();
        });
    });
});
