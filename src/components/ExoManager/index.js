import React, { Fragment } from 'react';
import { contextWrapper, ExoContext } from '../../context';
import ExoCard from '../ExoCard';
import TableRow from '../TableRow';
import { Row } from 'reactstrap';
import ExoTable from '../ExoTable';
import SwitchButton from '../SwitchButton';
import FilterBar from '../FilterBar';

class ExoManager extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            asCard: true,
            filterLevel: "all",
            filterName: "",
        }

        this.build = this.build.bind(this);
        this.buildTable = this.buildTable.bind(this);
        this.switchDesign = this.switchDesign.bind(this);
        this.filterByLevel = this.filterByLevel.bind(this);
        this.filterByName = this.filterByName.bind(this);
    }

    build(Component) {
        if (typeof this.context.exercices === 'undefined') {
            if (Component === 'TableRow') {
                return <tr><td>No content found</td></tr>
            }

            return <div>No content found</div>
        }

        let exosToDisplay = this.context.exercices;

        if (this.state.filterLevel !== "all") {
            // No type comparison here ("==" instead of "===") is made on purpose (compare string and number type)
            exosToDisplay = exosToDisplay.filter(exo => exo.difficultyLevel == this.state.filterLevel);
        }

        exosToDisplay = exosToDisplay.filter(e => e.name.toLowerCase().includes(this.state.filterName.toLowerCase()));

        return exosToDisplay.map(exercice => <Component key={exercice.id} exercice={exercice} />);
    }

    buildTable() {
        return (
            <ExoTable>
                {this.build(TableRow)}
            </ExoTable>
        )
    }

    filterByLevel(level) {
        this.setState({ ...this.state, filterLevel: level });
    }

    filterByName(name) {
        this.setState({ ...this.state, filterName: name });
    }

    switchDesign() {
        this.setState({ ...this.state, asCard: !this.state.asCard });
    }

    render() {
        let toDisplayComponent = this.state.asCard ? this.build(ExoCard) : this.buildTable();

        return (
            <Fragment>
                <FilterBar
                    onLevelFilterChange={this.filterByLevel}
                    onNameFilterChange={this.filterByName}
                />

                <h2>Manage exercices</h2>
                <SwitchButton onClick={this.switchDesign} />

                <Row>
                    {toDisplayComponent}
                </Row>
            </Fragment>
        )
    }
}
ExoManager.contextType = ExoContext;

export default contextWrapper(ExoManager);

