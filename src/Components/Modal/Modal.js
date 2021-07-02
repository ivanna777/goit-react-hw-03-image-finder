import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from "./Modal.module.css"

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.props.closeEsc)
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.props.closeEsc)
    }
    render() {
        const {  imageUrl, closeOverlay} = this.props;
        return createPortal (
            <div className={styles["Overlay"]} onClick={closeOverlay}>
                <div className={styles["Modal"]}>
                    <img src={imageUrl} alt='' />
                </div>
            </div>,
            modalRoot,
        )
    }
}

Modal.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    closeOverlay: PropTypes.func.isRequired
}

export default Modal;