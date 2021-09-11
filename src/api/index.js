import fetch from 'isomorphic-fetch';
import { isJsonString } from '../helpers';

export let API_PATH = undefined;
if (process.env.NODE_ENV === 'development') {
    API_PATH = process.env.REACT_APP_API_PATH_DEV;
}
else {
    API_PATH = process.env.REACT_APP_API_PATH_PROD;
}

export const getExercices = () => fetch(API_PATH)
    .then(
        exos => exos.json(),
        error => console.log('error : ', error),
    ).then(
        json => json,
        error => console.log('Error while getting Promise value : ', error),
    );

export const createExercice = exercice => fetch(API_PATH, getFetchParams('POST', exercice))
    .then(
        response => readBody(response.body),
        error => console.log('Error while posting new exercice : ', error),
    ).then(
        json => isJsonString(json) ? JSON.parse(json) : json,
        error => console.log('Error while getting promise value : ', error),
    );

export const editExercice = exercice => fetch(`${API_PATH}/${exercice.id}`, getFetchParams('PUT', exercice))
    .then(
        response => readBody(response.body),
        error => console.log(`An error occured while editing the following exercice : ${JSON.stringify(exercice)}, error = ${error}`),
    ).then(
        json => json === "" ? exercice : json,
        error => console.log('Error while getting promise value : ', error),
    );

export const deleteExercice = id => fetch(`${API_PATH}/${id}`, getFetchParams('DELETE', id))
    .then(
        response => response,
        error => console.log(`Error while deleting exercice with id ${id} : `, error),
    );


function getFetchParams(httpVerb, bodyDatas) {
    var customHeaders = new Headers();
    customHeaders.append("Content-Type", "application/json");

    var params = {
        method: httpVerb,
        headers: customHeaders,
        body: JSON.stringify(bodyDatas),
    }

    return params;
}

function readBody(body) {
    const reader = body.getReader();

    // https://stackoverflow.com/a/36949791/9868549
    // https://developer.mozilla.org/fr/docs/Web/API/Body/body
    function pump() {
        return reader.read().then(({ done, value }) => {
            return new TextDecoder("utf-8").decode(value);
        }).then(value => value);
    }

    return pump();
}

