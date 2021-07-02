import { Component } from "react";
import { fetchImages } from "./services/images-api";
import Searchbar from "./Components/Searchbar";
import ImageGallery from "./Components/ImageGallery";
import Button from "./Components/Button";
import Modal from "./Components/Modal";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

class App extends Component {
    state = {
        name: '',
        imageArr: [],
        largeImageUrl: '',
        pageNumber: 1,
        isLoading: false,
        error: null,
        openModal: false
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.name !== this.state.name) {
            this.loadImages()
        }
    }

    handleSubmit = (search) => {
        if (this.state.name === search) return;
        this.setState({
            name: search,
            imageArr: [],
            pageNumber: 1
        })
    }


    loadImages = () => {
        this.setState({isLoading: true})
        fetchImages(this.state.name, this.state.pageNumber)
            .then(nextImages => this.setState(prevState => {
            return ({
               imageArr: [...prevState.imageArr, ...nextImages],
               pageNumber: prevState.pageNumber + 1,
           })
            }))
            .catch(error => {
                this.setState({ error: true })
            })
            .finally(() => {
                this.setState({isLoading: false})
                if (this.state.pageNumber > 2) {
                    window.scrollTo({
                        top: document.documentElement.scrollHeight,
                        behavior: 'smooth',
                    });
                }
            })
    }

    onClickImage = (e) => {
        this.setState({
            openModal: true,
            largeImageUrl: e.target.dataset.largeimage 
        })
    }

    toggleModal = () => {
        this.setState(({ openModal }) => ({
            openModal: !openModal
        }))
    }

    closeModalESC = (e) => {
        if (e.code === 'Escape') {
            this.toggleModal()
        }
    }
    closeModalOverlay = (e) => {
        if (e.currentTarget === e.target) {
            this.toggleModal()
        }
    }

    render() {
        const { imageArr, largeImageUrl, isLoading, error, openModal } = this.state;
        return (
            <>
                <Searchbar
                    onSubmit={this.handleSubmit}
                />
                <ImageGallery
                    images={imageArr}
                    onClick={this.onClickImage}
                />
                {isLoading &&
                    <Loader
                        type="Hearts"
                        color="#00BFFF"
                        height={80}
                        width={80} />              
                }
                {error && <h1>Error...</h1>}
                {imageArr.length > 0 && <Button onClick={this.loadImages} />}
                {openModal && <Modal
                    imageUrl={largeImageUrl}
                    closeEsc={this.closeModalESC}
                    closeOverlay={this.closeModalOverlay}/>}
            </>
        )
    }
}

export default App;
