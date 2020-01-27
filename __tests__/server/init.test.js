const server = require('../../src/server')
let status = 0;

describe('Server', function () {
    it('Server Successful Inited', async () => {
        try {
            await server.start();
            status = 1
        } catch (error) {
            console.error('Erro:', error);
            status = 0
        }
        expect(status).toBe(1);
    })
})