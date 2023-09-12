import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImages } from '../api';
import { Container } from './App.styled';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';

export const App = () => {
  const [images, setImages] = useState([]);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const getPhotos = async (query, page) => {
      if (!query) return;
      setIsLoading(true);

      try {
        const { hits, totalHits } = await getImages(query, page);

        if (hits.length === 0) {
          setIsEmpty(true);
          toast.warn('Sorry. There are no images ... 😅');
          return;
        }
        setImages(state => [...state, ...hits]);
        setIsVisible(page < Math.ceil(totalHits / 12));
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getPhotos(query, page);
  }, [query, page]);

  const getLargeImage = largeImageUrl => {
    setLargeImageUrl(largeImageUrl);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const onSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setIsVisible(false);
    setIsEmpty(false);
  };

  const onLoadMore = () => {
    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Container>
      <ToastContainer autoClose={3000} />
      <Searchbar onSubmit={onSubmit} />

      {error && !isLoading && toast.error('OOPS! THERE WAS AN ERROR!')}
      {isEmpty && toast.warn('Images not found')}

      <ImageGallery images={images} onClick={getLargeImage}></ImageGallery>

      {largeImageUrl && showModal && (
        <Modal onClose={toggleModal} largeImageUrl={largeImageUrl} />
      )}
      {isLoading && <Loader />}
      {isVisible && <Button onClick={onLoadMore} onLoad={isLoading} />}
    </Container>
  );
};
