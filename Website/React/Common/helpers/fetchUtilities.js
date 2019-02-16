export function getRequest(url, authenticationToken = '') {
    return fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authenticationToken}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

export function postRequest(url, data, authenticationToken = '') {
    return fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${authenticationToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}
