import React from 'react';
import { FormGroup, Label, Col, Row, Input } from 'reactstrap';

import './filterBar.scss';

class FilterBar extends React.Component {
    constructor(props) {
        super(props);

        this.onLevelFilterChange = this.props.onLevelFilterChange;
        this.onNameFilterChange = this.props.onNameFilterChange;

        this.levelRef = React.createRef();
        this.nameRef = React.createRef();

        this.filterLevel = this.filterLevel.bind(this);
        this.filterName = this.filterName.bind(this);
    }

    filterLevel() {
        this.onLevelFilterChange(this.levelRef.current.value);
    }

    filterName() {
        setTimeout(_ => {
            if (this.nameRef.current.value.length === 0 || this.nameRef.current.value.length >= 3) {
                this.onNameFilterChange(this.nameRef.current.value);
            }
        }, 300);
    }

    render() {
        return (
            <div className="filter-bar-component">
                <Row>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="level">Difficulty level</Label>
                            <Input
                                type="select"
                                id="level"
                                innerRef={this.levelRef}
                                onChange={this.filterLevel}
                            >
                                <option value="all"></option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="name">Exercice's name</Label>
                            <Input
                                type="text"
                                id="name"
                                innerRef={this.nameRef}
                                placeholder="(Part of) Exercice's name"
                                onChange={this.filterName}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default FilterBar;