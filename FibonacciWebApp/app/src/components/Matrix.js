import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/CounterMatrix';
import MatrixCell from './MatrixCell';
import { matrixSize } from '../config';
import * as matrixStyles from '../styles/Matrix.css';

export class Matrix extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            timeout: null
        };
    }

    handleCellMouseClick = (row, column) => {
        if (this.state.timeout !== null) {
            clearTimeout(this.state.timeout);
            this.setState({ timeout: null });
        }

        this.props.increment(row, column).then(() => {
            this.setState({
                // Clears the found sequences after some time (resets them to 0 in the UI)
                timeout: setTimeout(this.props.clearChanges.bind(this), 4500)
            });
        });
    };

    render() {
        return <div className="matrix">
            {[...Array(matrixSize.height).keys()].map(row =>
                <div className="matrix-row" key={row}>
                    {[...Array(matrixSize.width).keys()].map(column => <MatrixCell
                        key={`${row},${column},${this.props.matrix[`${row},${column}`].count}`}
                        cell={this.props.matrix[`${row},${column}`]}
                        onClick={this.handleCellMouseClick}
                    />)}
                </div>)}
        </div>;
    }
}

export default connect(
    state => state.counter,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Matrix);
