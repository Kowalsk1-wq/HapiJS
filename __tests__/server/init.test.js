const server = require('../../src/server')
let status = 0;

describe('Server', function () {
    it('Server Successful Inited', async () => {
        try {
            await server.start();
        } catch (error) {
            console.error('Erro:', error);
            status = 1
        }
        expect(status).toBe(0);
    })
})
