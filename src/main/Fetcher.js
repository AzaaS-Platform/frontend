export default class Fetcher {
    static async Get(path, data = {}) {
        let els = Object.keys(data);
        if(els.length > 0) {
            for(let i = 0; i < els.length; i++) {
                if(i === 0) {
                    path += '?';
                } else {
                    path += '&';
                }

                path += `${els[i]}=${data[els[i]]}`;
            }
        }

        let request = new Request(`${Fetcher.SERVER_ADDRESS}clients/${Fetcher.CLIENT}/path`, {
            mode: 'cors',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${Fetcher.TOKEN}`
            }
        });
        return await (await fetch(request)).json();
    }

    static async Post(path, data = {}) {
        let request = new Request(`${Fetcher.SERVER_ADDRESS}clients/${Fetcher.CLIENT}/path`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${Fetcher.TOKEN}`
            }
        });
        return await (await fetch(request)).json();
    }
}

Fetcher.SERVER_ADDRESS = /*'https://ad1o51iav4.execute-api.eu-central-1.amazonaws.com/dev/'*/'http://localhost:3000/dev/';
Fetcher.CLIENT = 'test-client';
Fetcher.TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImNsdCI6InRlc3QtY2xpZW50IiwidXNyIjoiYjc2ZjkwOTctMzcwYS00MjQxLTk3Y2QtNjg5NjIwODZkOTFmIn0sImlhdCI6MTYwMTQwOTg4NCwiZXhwIjoxNjAxNDExNjg0fQ.Ki3aQbzwp12F_NZ3jMe9SagS0MgcgiXe0j2mXGy7hjo';