import React from 'react';
import PropTypes from 'prop-types';
import * as styles from '../styles/MatrixCell.css';

export default class MatrixCell extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isChanged: false
        };
    }

    handleClick = () => {
        const { cell: { row, column }, onClick } = this.props;
        if (onClick) {
            onClick(row, column);
        }
    };

    getCount = () => {
        const { cell } = this.props;

        let count = cell.temporaryCount !== null ? cell.temporaryCount : cell.count;
        if (count === 0) {
            count = '';
        }

        return count;
    };

    render() {
        return <div
            className={ `matrix-cell${!!this.props.cell.active ? ' matrix-cell-active' : ''}${this.props.cell.previousCount !== null ? ' matrix-cell-changed' : ''}`}
            onClick={this.handleClick}
        >
            {this.getCount()}
        </div>;
    }
}

MatrixCell.propTypes = {
    onMouseIn: PropTypes.func,
    onMouseOut: PropTypes.func,
    onClick: PropTypes.func,
    cell: PropTypes.object,
    style: PropTypes.object
};