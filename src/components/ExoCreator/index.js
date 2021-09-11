import React, { Fragment } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert, Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import { contextWrapper } from '../../context';
import { createExercice, showSnackbar, startLoading, stopLoading, editExercice } from '../../actions/exoActions';
import { ExoContext } from '../../context';
import { withRouter } from "react-router-dom";

import './exoCreator.scss';

class ExoCreator extends React.Component {
    constructor(props) {
        super(props);

        this.sessionNameRef = React.createRef();
        this.levelRef = React.createRef();
        this.nameRef = React.createRef();
        this.descriptionRef = React.createRef();
        this.dataRef = React.createRef();

        this.sleepingPanda = require('../../assets/img/sleeping-panda.gif');

        this.state = {
            isFormEdited: false,
            isPopoverPandaOpen: false,
            exercice: {
                creatorSessionName: "",
                difficultyLevel: "",
                name: "",
                description: "",
                data: '',
            }
        };

        if (typeof this.props.location.state !== 'undefined' && this.props.location.state !== {}) {
            this.state.exercice = this.props.location.state.exercice;
        }

        this.onFormChange = this.onFormChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.setExercice = this.setExercice.bind(this);
        this.toggleSnackbar = this.toggleSnackbar.bind(this);
        this.compareState = this.compareState.bind(this);
        this.resetAlert = this.resetAlert.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    componentDidMount() {
        if (typeof this.props.location.state !== 'undefined') {
            var exo = this.props.location.state.exercice;

            this.sessionNameRef.current.value = exo.creatorSessionName;
            this.levelRef.current.value = exo.difficultyLevel;
            this.nameRef.current.value = exo.name;
            this.descriptionRef.current.value = exo.description;
            this.dataRef.current.value = exo.data;
        }

        this.setExercice(() => this.baseStateExercice = this.state.exercice);
    }

    setExercice(callback) {
        this.setState({
            exercice: {
                ...this.state.exercice,
                creatorSessionName: this.sessionNameRef.current.value,
                difficultyLevel: this.levelRef.current.value,
                name: this.nameRef.current.value,
                description: this.descriptionRef.current.value,
                data: this.dataRef.current.value,
            }
        }, callback);
    }

    compareState() {
        return JSON.stringify(this.state.exercice) === JSON.stringify(this.baseStateExercice);
    }

    resetAlert(shouldForceReset = false) {
        if (this.compareState() || shouldForceReset === true) {
            this.setState({ isFormEdited: false });
        }
    }

    onFormChange(nodeName) {
        switch (nodeName) {
            case 'sessionName':
                if (this.sessionNameRef.current !== null) {
                    this.setState({ isFormEdited: true, exercice: { ...this.state.exercice, creatorSessionName: this.sessionNameRef.current.value } }, this.resetAlert);
                }
                break;
            case 'level':
                if (this.levelRef.current !== null) {
                    this.setState({ isFormEdited: true, exercice: { ...this.state.exercice, difficultyLevel: this.levelRef.current.value } }, this.resetAlert);
                }
                break;
            case 'name':
                if (this.nameRef.current !== null) {
                    this.setState({ isFormEdited: true, exercice: { ...this.state.exercice, name: this.nameRef.current.value } }, this.resetAlert);
                }
                break;
            case 'description':
                if (this.descriptionRef.current !== null) {
                    this.setState({ isFormEdited: true, exercice: { ...this.state.exercice, description: this.descriptionRef.current.value } }, this.resetAlert);
                }
                break;
            case 'data':
                if (this.dataRef.current !== null) {
                    this.setState({ isFormEdited: true, exercice: { ...this.state.exercice, data: this.dataRef.current.value } }, this.resetAlert);
                }
                break;
            default:
                console.log('error');
                break;
        }
    }

    validateForm() {
        if (this.state.isFormEdited) {
            this.setExercice(_ => {
                startLoading().then(startLoadingAction => {
                    let promise = undefined,
                        mode = '';

                    this.context.dispatch(startLoadingAction);

                    if (typeof this.props.location.state !== 'undefined') {
                        mode = 'edition';
                        promise = editExercice(this.state.exercice);
                    }
                    else {
                        mode = 'creation';
                        promise = createExercice(this.state.exercice)
                    }

                    if (promise !== undefined) {
                        promise.then(action => {
                            this.toggleSnackbar(mode, action.payload);
                            if (typeof action.payload === 'object') {
                                this.context.dispatch(action);
                            }

                            stopLoading().then(stopLoadingAction => this.context.dispatch(stopLoadingAction));
                        });
                    }
                });
            });

            this.baseStateExercice = this.state.exercice;
            this.setState({ isFormEdited: false });
        }
        else {
            this.setState({ isPopoverPandaOpen: true });
            setTimeout(() => {
                this.setState({ isPopoverPandaOpen: false });
            }, 3000);
        }
    }

    resetForm() {
        this.setState({ ...this.state, exercice: this.baseStateExercice });
        this.sessionNameRef.current.value = this.baseStateExercice.creatorSessionName;
        this.levelRef.current.value = this.baseStateExercice.difficultyLevel;
        this.nameRef.current.value = this.baseStateExercice.name;
        this.descriptionRef.current.value = this.baseStateExercice.description;
        this.dataRef.current.value = this.baseStateExercice.data;
        this.resetAlert(true);
    }

    toggleSnackbar(mode, payload) {
        if (typeof payload === 'object') {
            showSnackbar({
                color: "success",
                message: `Your exercice has been ${mode === "creation" ? 'created' : 'edited'} successfully ! :)`,
                isOpen: true,
            })
                .then(action => this.context.dispatch(action));
        }
        else {
            showSnackbar({
                color: 'danger',
                message: payload,
                isOpen: true,
            })
                .then(action => this.context.dispatch(action));
        }
    }

    render() {
        return (
            <Fragment>
                <h2>Create a new exercice</h2>
                <div className="alert-block">
                    <Alert color="info" isOpen={!this.state.isFormEdited}><i className="fas fa-info-circle"></i> There is currently nothing to save</Alert>
                    <Alert color="warning" isOpen={this.state.isFormEdited}><i className="fas fa-exclamation-triangle"></i> There is unsaved modifications</Alert>
                </div>

                <Form>
                    <div className="row">
                        <div className="col-6">
                            <FormGroup>
                                <Label for="sessionname">Creator's session name</Label>
                                <Input
                                    type="text"
                                    name="sessionName"
                                    id="sessionName"
                                    innerRef={this.sessionNameRef}
                                    placeholder="Creator's windows session name"
                                    onChange={() => this.onFormChange('sessionName')}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="level">Difficulty level of the exercice</Label>
                                <Input
                                    type="select"
                                    name="level"
                                    id="level"
                                    innerRef={this.levelRef}
                                    placeholder="Difficulty level"
                                    onChange={() => this.onFormChange('level')}
                                    required
                                >
                                    <option></option>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Exercice's name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    innerRef={this.nameRef}
                                    placeholder="Exercice's name"
                                    onChange={() => this.onFormChange('name')}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Exercice's rules description</Label>
                                <Input
                                    type="textarea"
                                    name="description"
                                    id="description"
                                    innerRef={this.descriptionRef}
                                    placeholder="Exercice's rules description"
                                    onChange={() => this.onFormChange('description')}
                                    required
                                />
                            </FormGroup>
                        </div>
                        <div className="data-displayer col-6">
                            <FormGroup>
                                <Label for="data">Exercice's starter data input</Label>
                                <Input
                                    type="textarea"
                                    rows={13}
                                    name="data"
                                    id="data"
                                    innerRef={this.dataRef}
                                    placeholder="Exercice's input data"
                                    onChange={() => this.onFormChange('data')}
                                />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="text-center">
                        <Button type="button" color="info" id="popoverPanda" onClick={this.validateForm}>Submit your exercice</Button>{' '}
                        <Popover placement="bottom" isOpen={this.state.isPopoverPandaOpen} target="popoverPanda" toggle={this.validateForm}>
                            <PopoverHeader>Lemme sleep plz...</PopoverHeader>
                            <PopoverBody className="text-center">
                                <img src={this.sleepingPanda} alt="Do not make me work for nothing !" id="img-panda" />
                            </PopoverBody>
                        </Popover>
                        <Button outline type="button" color="secondary" onClick={this.resetForm}>Reset form's values</Button>
                    </div>
                </Form>
            </Fragment>
        )
    }
}

export default withRouter(contextWrapper(ExoCreator));

ExoCreator.contextType = ExoContext;
