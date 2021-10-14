import React from "react";
import PropTypes from "prop-types";
import s from "./Searchbar.module.css";
import { toast } from "react-toastify";

class Searchbar extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    imageName: "",
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.imageName.trim() === "") {
      toast.error("Please, enter picture name");
      return;
    }
    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: "" });
  };
  handleNameChange = (event) => {
    this.setState({ imageName: event.currentTarget.value.toLowerCase() });
  };
  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchForm_button}>
            <span className={s.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={s.SearchForm_input}
            type="text"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
            onChange={this.handleNameChange}
            value={this.state.imageName}
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;
