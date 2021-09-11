import React, { Fragment } from 'react';
import { API_PATH } from '../../api';
import {
    Button,
    ButtonGroup,
    Popover,
    PopoverBody,
    PopoverHeader,
    Card,
    CardBody,
    CardFooter,
    CardText,
    Col
} from 'reactstrap';
import { deleteExercice } from '../../actions/exoActions';
import { ExoContext } from '../../context';
import { withRouter } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars';

import './exoCard.scss';
import StrengthBar from '../StrengthBar';

class ExoCard extends React.Component {
    constructor(props) {
        super(props);

        this.exercice = props.exercice;
        this.exoUrl = `${API_PATH}/${this.exercice.id}`;

        this.state = {
            areDataDisplayed: false,
            popoverCopyOpen: false,
            popoverDeleteOpen: false,
        };

        this.popoverCopyId = `urlExo${this.exercice.id}`;
        this.popoverDeleteId = `deletion${this.exercice.id}`;

        this.trDataRef = React.createRef();
        this.urlRef = React.createRef();

        this.displayData = this.displayData.bind(this);
        this.navigateToEdit = this.navigateToEdit.bind(this);
        this.copyClipBoard = this.copyClipBoard.bind(this);
        this.togglePopoverCopy = this.togglePopoverCopy.bind(this);
        this.togglePopoverDelete = this.togglePopoverDelete.bind(this);
        this.copyClipBoard = this.copyClipBoard.bind(this);
        this.deleteExercice = this.deleteExercice.bind(this);
    }

    displayData() {
        this.setState({ ...this.state, areDataDisplayed: !this.state.areDataDisplayed })
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

    navigateToEdit() {
        this.props.history.push({
            pathname: '/create',
            state: { exercice: this.exercice }
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

    render() {
        let descriptionStyle = { display: this.state.areDataDisplayed ? 'none' : 'block' },
            dataStyle = { display: this.state.areDataDisplayed ? 'block' : 'none' };

        return (
            <Fragment>
                <Col sm="3">
                    <Card>
                        <header>
                            <h3 className="text-nowrap text-truncate"><abbr title={this.exercice.name}>{this.exercice.name}</abbr></h3>
                        </header>
                        <StrengthBar level={this.exercice.difficultyLevel} />

                        <Scrollbars autoHeight>
                            <CardBody>
                                <CardText style={descriptionStyle}>{this.exercice.description}</CardText>
                                <CardText style={dataStyle}>{this.exercice.data}</CardText>
                            </CardBody>
                        </Scrollbars>

                        <CardFooter className="text-center">
                            <p><input type="text" className="form-control" ref={this.urlRef} value={this.exoUrl} onChange={() => { }} /></p>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <abbr title="Copy API URL to your clipboard">
                                        <Button id={this.popoverCopyId} color="secondary" onClick={this.copyClipBoard}>
                                            <i className="far fa-copy"></i>
                                        </Button>
                                        <Popover placement="bottom" isOpen={this.state.popoverCopyOpen} target={this.popoverCopyId} toggle={this.togglePopoverCopy}>
                                            <PopoverBody>URL copied !</PopoverBody>
                                        </Popover>
                                    </abbr>
                                    <abbr title="Display data">
                                        <Button outline={this.state.areDataDisplayed || false} color="secondary" onClick={this.displayData}>
                                            <i className="fas fa-database"></i>
                                        </Button>
                                    </abbr>
                                    <abbr title="Edit">
                                        <Button color="secondary" onClick={this.navigateToEdit}>
                                            <i className="far fa-edit"></i>
                                        </Button>
                                    </abbr>
                                </div>
                                <div>
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
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                </Col>
            </Fragment>
        );
    }
}

export default withRouter(ExoCard);

ExoCard.contextType = ExoContext;