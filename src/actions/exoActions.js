import * as Api from '../api';
import * as Types from './actionTypes.js';

export const getExercices = () =>
    Api.getExercices()
        .then(json => ({ type: Types.GET_EXERCICES, payload: json }));

export const createExercice = exercice =>
    Api.createExercice(exercice).then(json => ({ type: Types.CREATE_EXERCICE, payload: json }));

export const editExercice = exercice =>
    Api.editExercice(exercice).then(json => ({ type: Types.EDIT_EXERCICE, payload:  json}));

export const deleteExercice = id =>
    Api.deleteExercice(id).then(_ => ({ type: Types.DELETE_EXERCICE, payload: id }));


export const showSnackbar = properties => Promise.resolve({ type: Types.SHOW_SNACKBAR, payload: properties });
export const hideSnackbar = properties => Promise.resolve({ type: Types.HIDE_SNACKBAR, payload: properties });

export const startLoading = () => Promise.resolve({ type: Types.START_LOADING, payload: true });
export const stopLoading = () => Promise.resolve({ type: Types.STOP_LOADING, payload: false });