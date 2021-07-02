import { Component } from "react";
import PropTypes from 'prop-types';
import styles from "./Searchbar.module.css";

class Searchbar extends Component {
    state = {
        search: ''
    }

    inputChange = (e) => {
        this.setState({ search: e.target.value })
    }

    formSubmit = (e) => {
        e.preventDefault();
        if (this.state.search) {
            this.props.onSubmit(this.state.search)
        }
        this.setState({ search: '' })
    }

    render() {
        return (
            <header className={styles['Searchbar']}>
                <form onSubmit={this.formSubmit}
                    className={styles["SearchForm"]}>
                    <button type="submit" onClick={this.props.onClick} className={styles["SearchForm-button"]}>
                        <span className={styles["SearchForm-button-label"]}>Search</span>
                    </button>

                    <input
                        className={styles["SearchForm-input"]}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.inputChange}
                    />
                </form>
            </header>
        )
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func
}

export default Searchbar;