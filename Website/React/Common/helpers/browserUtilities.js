// Source: https://plainjs.com/javascript/utilities/set-cookie-get-cookie-and-delete-cookie-5/
export function getCookie(name) {
    const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
    return v ? v[2] : null;
}

// Source: https://howchoo.com/g/nwywodhkndm/how-to-turn-an-object-into-query-string-parameters-in-javascript
export function createQueryString(data) {
    return Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&');
}
