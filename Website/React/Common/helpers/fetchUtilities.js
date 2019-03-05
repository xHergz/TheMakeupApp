export function deleteRequest(url, authenticationToken = '') {
    return fetch(url, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${authenticationToken}`,
            'Content-Type': 'application/json'
        }
    });
}

export function getRequest(url, authenticationToken = '') {
    return fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authenticationToken}`,
            'Content-Type': 'application/json'
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

export function putRequest(url, data, authenticationToken = '') {
    return fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${authenticationToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}
