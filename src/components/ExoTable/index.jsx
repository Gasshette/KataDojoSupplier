import React, { Fragment } from 'react';
import { Table } from 'reactstrap';

const ExoTable = (props) => (
    <Fragment>
        <Table>
            <thead className="text-center">
                <tr className="d-flex">
                    <th className="col-1">Level</th>
                    <th className="col-2">Name</th>
                    <th className="col-4">Description</th>
                    <th className="col-3">Url</th>
                    <th className="col-2"></th>
                </tr>
            </thead>
            <tbody className="text-center">
                {props.children}
            </tbody>
        </Table>
    </Fragment>
);

export default ExoTable;