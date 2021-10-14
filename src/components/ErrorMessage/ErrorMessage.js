import PropTypes from "prop-types";
import s from "./ErrorMessage.module.css";

const ErrorMessage = ({ message }) => {
  return <p className={s.text}>{message}</p>;
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
