import { Component } from 'react';
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import PropTypes from 'prop-types';
import styles from "./ImageGallery.module.css";

class ImageGallery extends Component {
    render() {
        const { images, onClick } = this.props;
        return (
            <ul className={styles["ImageGallery"]}>
                {images.map(image => {
                    return (
                        <ImageGalleryItem
                            key={image.id}
                            src={image.webformatURL}
                            alt={image.tags}
                            largeImage={image.largeImageURL}
                            onClickImage={onClick}
                        />
                    )})}
            </ul>
        )   
    }
}

ImageGallery.propTypes = {
    images: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired
}

export default ImageGallery;