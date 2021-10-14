import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import ImageGallery from "./components/ImageGallery";
import Searchbar from "./components/Searchbar";
import api from "./services/api";
import ErrorMessage from "./components/ErrorMessage";
import Button from "./components/Button";
import Modal from "./components/Modal";

class App extends React.Component {
  state = {
    searchQuery: "",
    images: null,
    page: 1,
    showModal: false,
    error: null,
    total: null,
    largeURL: "",
    status: "idle",
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      this.setState({ status: "pending" });

      this.fetchImages(searchQuery, page);
    }

    if (prevState.page !== page && page !== 1) {
      this.nextFetchImages(searchQuery, page);
    }
  }

  fetchImages = (searchQuery, page) => {
    api.fetchImage(searchQuery, page).then(({ hits, total }) => {
      this.setState({ images: hits, total, status: "resolved" });

      if (!total) {
        this.setState({
          error: "No results found",
          status: "rejected",
        });
      } else {
        this.setState({ error: null });
      }
    });
  };

  nextFetchImages = (searchQuery, page) => {
    api.fetchImage(searchQuery, page).then(({ hits }) => {
      this.setState((prevState) => ({
        images: [...prevState.images, ...hits],
      }));
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    });
  };

  handleFormSubmit = (searchQuery) => {
    this.setState({
      searchQuery,
      page: 1,
    });
  };

  handleIncrement = () => {
    this.setState({ page: this.state.page + 1 });
  };

  toggleModal = (url) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeURL: url,
    }));
  };

  render() {
    const { error, status, total, showModal, largeURL, images } = this.state;

    return (
      <>
        <div className="App">
          <Searchbar onSubmit={this.handleFormSubmit} />

          {status === "rejected" && <ErrorMessage message={error} />}

          {status === "resolved" && (
            <ImageGallery images={images} openModal={this.toggleModal} />
          )}

          {status === "pending" && (
            <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
          )}

          {total > 0 && <Button onClick={this.handleIncrement} />}

          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={largeURL} alt="" />
            </Modal>
          )}
        </div>
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}

export default App;
