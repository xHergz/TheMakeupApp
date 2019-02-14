export function fetchData(url) {
    return fetch(url)
        .then(response => response.json());
        //.then(json => console.log(json));
}

export function postRequest(url, data = {}) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}
