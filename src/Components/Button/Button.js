import { Component } from "react";
import PropTypes from 'prop-types';
import styles from "./Button.module.css";

class Button extends Component {
    render() {
        return (
            <button type="button" onClick={ this.props.onClick} className={styles['load-more-btn']}>Load more</button>
        )
    }
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default Button;