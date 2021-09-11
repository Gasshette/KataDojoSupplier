import React from 'react';
import SnackBar from '../Snackbar';
import Loader from '../Loader';
import './displayer.scss';

const Displayer = (props) => (
    <div className="displayer-component">
        {props.children}

        <SnackBar />
        <Loader size="full" />
    </div>
);

export default Displayer;