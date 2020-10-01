export default class Fetcher {
    static TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImNsdCI6InRlc3QtY2xpZW50IiwidXNyIjoiYjc2ZjkwOTctMzcwYS00MjQxLTk3Y2QtNjg5NjIwODZkOTFmIn0sImlhdCI6MTYwMTUxMDYxOCwiZXhwIjoxNjAxNTEyNDE4fQ.XU9US1yU7twYzgsgtj9yas7RCbu9-akRG53sCvxkq4A';

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

        let request = new Request(path, {
            mode: 'cors',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${Fetcher.TOKEN}`
            }
        });
        return await Fetcher.parseResponse(await fetch(request));
    }

    static async Post(path, data = {}) {
        let request = new Request(path, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${Fetcher.TOKEN}`
            }
        });
        return await Fetcher.parseResponse(await fetch(request));
    }

    static async Put(path, data = {}) {
        let request = new Request(path, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${Fetcher.TOKEN}`
            }
        });
        return await fetch(request);
    }

    static async Delete(path) {
        let request = new Request(path, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${Fetcher.TOKEN}`
            }
        });
        return await fetch(request);
    }

    static async parseResponse(response) {
        const data = await response.json();
        if(data.statusCode >= 200 && data.statusCode < 300) {
            return data.payload;
        } else {
            throw data.message;
        }
    }
}