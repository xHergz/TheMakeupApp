// Source: https://stackoverflow.com/a/4760279
function sort(a, b, property, sortOrder) {
    let result = 0;
    if (a[property] < b[property]) {
        result = -1;
    } else if (a[property] > b[property]) {
        result = 1;
    }
    return result * sortOrder;
}

export default function dynamicSort(a, b, property) {
    let sortOrder = 1;
    let sortProperty = property;
    if (property[0] === '-') {
        sortOrder = -1;
        sortProperty = property.substr(1);
    }
    return sort(a, b, sortProperty, sortOrder);
}
