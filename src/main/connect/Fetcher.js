export default class Fetcher {
    static async Get(path, headers, data = {}) {
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
            method: 'GET',
            headers,
            signal: Fetcher.controller.signal,
        });
        return await Fetcher.parseResponse(await fetch(request));
    }

    static async Post(path, headers, data = {}) {
        let request = new Request(path, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            signal: Fetcher.controller.signal,
        });
        return await Fetcher.parseResponse(await fetch(request));
    }

    static async Put(path, headers, data = {}) {
        let request = new Request(path, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            signal: Fetcher.controller.signal,
        });
        return await Fetcher.parseResponse(await fetch(request));
    }

    static async Delete(path, headers) {
        let request = new Request(path, {
            method: 'DELETE',
            headers,
            signal: Fetcher.controller.signal,
        });
        return await Fetcher.parseResponse(await fetch(request));
    }

    static async parseResponse(response) {
        let data;
        try {
            data = await response.json();
        } catch(e) {
            return;
        }

        if(data.statusCode) {
            if(data.statusCode >= 200 && data.statusCode < 300) {
                return data.payload;
            } else {
                throw {
                    statusCode: data.statusCode,
                    message: data.message,
                };
            }
        }
    }

    static abortAll() {
        Fetcher.controller.abort();
        Fetcher.controller = new AbortController();
    }
}

Fetcher.controller = new AbortController();