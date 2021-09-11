import * as  Types from '../actions/actionTypes.js';

export default function (state = {}, action) {
    var newExercices,
        index;

    switch (action.type) {
        case Types.STOP_LOADING:
        case Types.START_LOADING:
            return { ...state, isLoading: action.payload };
        case Types.GET_EXERCICES:
            return { ...state, exercices: action.payload };
        case Types.CREATE_EXERCICE:
            return { ...state, exercices: [...state.exercices, action.payload] };
        case Types.EDIT_EXERCICE:
            newExercices = Object.assign([], [...state.exercices]);
            index = state.exercices.findIndex(exo => exo.id === action.payload.id);
            newExercices[index] = action.payload;
            return {...state, exercices: newExercices};
        case Types.DELETE_EXERCICE:
            newExercices = Object.assign([], [...state.exercices]);
            index = state.exercices.findIndex(exo => exo.id === action.payload);
            newExercices.splice(index, 1);
            return { ...state, exercices: newExercices };
        case Types.HIDE_SNACKBAR:
        case Types.SHOW_SNACKBAR:
            return { ...state, snackbarProps: action.payload };
        default:
            return { ...state };
    }
}