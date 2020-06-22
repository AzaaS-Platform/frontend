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

        let request = new Request(path, {method: 'GET'});
        return (await fetch(request)).json();
    }

    static async Post(path, data = {}) {
        let request = new Request(path, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        return (await fetch(request)).json();
    }
}

Fetcher.SERVER_ADDRESS = 'https://ad1o51iav4.execute-api.eu-central-1.amazonaws.com/dev/';