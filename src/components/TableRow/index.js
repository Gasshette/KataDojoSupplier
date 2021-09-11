import React, { Fragment } from 'react';
import { Button, ButtonGroup, Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import { API_PATH } from '../../api';
import { deleteExercice } from '../../actions/exoActions';
import { ExoContext } from '../../context';
import { withRouter } from "react-router-dom";
import Chip from '../Chip';
import './tableRow.scss';

class TableRow extends React.Component {
    constructor(props) {
        super(props);

        this.exercice = props.exercice;
        this.popoverCopyId = `urlExo${this.exercice.id}`;
        this.popoverDeleteId = `deletion${this.exercice.id}`;
        this.exoUrl = `${API_PATH}/${this.exercice.id}`;
        this.trDataRef = React.createRef();
        this.urlRef = React.createRef();
        this.state = {
            caret: "fas fa-caret-down",
            popoverCopyOpen: false,
            popoverDeleteOpen: false,
        };

        this.copyClipBoard = this.copyClipBoard.bind(this);
        this.togglePopoverCopy = this.togglePopoverCopy.bind(this);
        this.togglePopoverDelete = this.togglePopoverDelete.bind(this);
        this.openDataTr = this.openDataTr.bind(this);
        this.navigateToEdit = this.navigateToEdit.bind(this);
    }

    openDataTr() {
        var node = this.trDataRef.current;
        node.classList.contains('hidden') ? node.classList.remove('hidden') : node.classList.add('hidden');

        this.setState({ caret: this.state.caret === "fas fa-caret-down" ? "fas fa-caret-up" : "fas fa-caret-down" });
    }

    copyClipBoard() {
        var urlInput = this.urlRef.current;
        urlInput.select();
        document.execCommand('copy');
        this.togglePopoverCopy();
    }

    deleteExercice(id) {
        deleteExercice(id).then(action => {
            this.context.dispatch(action);
        });
    }

    togglePopoverCopy() {
        this.setState({ popoverCopyOpen: !this.state.popoverCopyOpen });
        setTimeout(() => {
            if (this.state.popoverCopyOpen) {
                this.setState({ popoverCopyOpen: false });
            }
        }, 2000);
    }

    togglePopoverDelete() {
        this.setState({ popoverDeleteOpen: !this.state.popoverDeleteOpen });
    }

    navigateToEdit() {
        this.props.history.push({
            pathname: '/create',
            state: { exercice: this.exercice }
        })
    }

    render() {
        return (
            <Fragment key={this.exercice.id}>
                <tr className="d-flex">
                    <td className="col-1"><Chip color={this.exercice.difficultyLevel} text={this.exercice.difficultyLevel} /></td>
                    <td className="col-2">{this.exercice.name}</td>
                    <td className="col-4">{this.exercice.description}</td>
                    <td className="col-3"><input type="text" className="form-control" ref={this.urlRef} value={this.exoUrl} onChange={() => { }} /></td>
                    <td className="col-2">
                        <abbr title="Copy API URL to your clipboard">
                            <Button id={this.popoverCopyId} color="secondary" onClick={this.copyClipBoard}><i className="far fa-copy"></i></Button>
                            <Popover placement="bottom" isOpen={this.state.popoverCopyOpen} target={this.popoverCopyId} toggle={this.togglePopoverCopy}>
                                <PopoverBody>URL copied !</PopoverBody>
                            </Popover>
                        </abbr>
                        <abbr title="Display data">
                            <Button color="secondary" onClick={this.openDataTr}>
                                <i className={this.state.caret}></i>
                            </Button>
                        </abbr>
                        <abbr title="Edit">
                            <Button color="secondary" onClick={this.navigateToEdit}>
                                <i className="far fa-edit"></i>
                            </Button>
                        </abbr>
                        <abbr title="Delete">
                            <Button color="danger" id={this.popoverDeleteId} onClick={this.togglePopoverDelete}>
                                <i className="fas fa-trash-alt"></i>
                            </Button>
                        </abbr>
                        <Popover placement="top" isOpen={this.state.popoverDeleteOpen} target={this.popoverDeleteId} toggle={this.togglePopoverDelete}>
                            <PopoverHeader>Are you sure ?</PopoverHeader>
                            <PopoverBody className="text-center">
                                <ButtonGroup>
                                    <Button outline color="danger" onClick={() => this.deleteExercice(this.exercice.id)}>
                                        <i className="far fa-trash-alt"></i>
                                    </Button>
                                    <Button outline color="secondary" onClick={this.togglePopoverDelete}>
                                        <i className="fas fa-times"></i>
                                    </Button>
                                </ButtonGroup>
                            </PopoverBody>
                        </Popover>
                    </td>
                </tr>
                <tr className="col-12 table-active hidden text-left" ref={this.trDataRef}>
                    <td colSpan="5" className="data-td">
                        <pre className="preshow">{this.exercice.data}</pre>
                    </td>
                </tr>
            </Fragment>
        )
    }
}

export default withRouter(TableRow);

TableRow.contextType = ExoContext;
