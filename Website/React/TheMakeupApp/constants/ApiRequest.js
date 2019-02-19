import HTTP_STATUS from '../../Common/constants/HttpStatus';

export default function ApiRequest(request, methodName) {
    return new Promise((resolve, reject) => {
        return request
            .then((response) => {
                if (response.status !== HTTP_STATUS.OK) {
                    const errorMessage = `Error calling '${methodName}': HTTP Status = ${response.status}`;
                    reject(new Error(errorMessage));
                    return null;
                }
                return response.json();
            })
            .then((json) => {
                if (json === null || json === undefined) {
                    const errorMessage = `Error calling '${methodName}': JSON is null or undefined`;
                    reject(new Error(errorMessage));
                    return;
                }
                if (json.status !== 0) {
                    const errorMessage = `Error calling '${methodName}': Status = ${json.status}`;
                    reject(new Error(errorMessage));
                    return;
                }
                console.log('Got here');
                resolve(json);
            });
    });
}
