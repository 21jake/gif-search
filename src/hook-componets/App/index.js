import { useMemo, useState, useEffect, useRef } from 'react';
import Header from '../Header';
import FormSearch from '../FormSearch';
import ImageCard from '../ImageCard';
import Loading from '../Loading';
import axios from 'axios';
import debounce from 'lodash.debounce';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'bootstrap/dist/css/bootstrap.min.css';

import './style.css';

// component
function App() {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [keyword, setKeyword] = useState('');

  const renderImages = () => {
    return images.map((image, idx) => {
      return (
        <ImageCard
          key={idx}
          src={image.src}
          alt={image.alt}
          title={image.title}
        />
      )
    })
  }

  const fetchData = async (keyword, offset = 0) => {
    const urlApi = `https://api.giphy.com/v1/gifs/search?api_key=R8Tn7WP68lMvqGDTD9Qn82x9kZgAXZIR&q=${keyword}&limit=25&offset=${offset}&rating=g&lang=vi`;

    if (offset) setLoading(true);

    const res = await axios({
      url: urlApi,
      method: 'GET',
    });

    const newImages = res.data.data.map(img => {
      return {
        src: img.images.downsized.url,
        alt: img.title,
        title: img.title
      }
    });
    const total = res.data.pagination.total_count;

    const newStateImages = offset > 0 ? [images, ...newImages] : newImages;
    const hasMore = newStateImages.length <= total;

    setImages(newStateImages);
    setOffset(offset);
    setHasMore(hasMore);
    setLoading(false);
  };

  const fetchMoreData = () => {
    fetchData(keyword, offset + 25);
  }

  const debounceFetch = useMemo(() => {
    return debounce((keyword) => {
      fetchData(keyword);
    }, 1000);
  }, []);


  const onChangeKeyword = (event) => {
    const keyword = event.target.value;
    setKeyword(keyword);
    // debounceFetch(keyword)
  }

  const firstMount = useRef(true);

  useEffect(() => {
    if (!firstMount.current) {
      debounceFetch(keyword)
    } else {
      firstMount.current = false;
    }
  }, [keyword]);


  const onHandleSubmitForm = () => {
    fetchData(keyword, offset);
  }

  return (
    <div className="App">
      <div className="container mb-4">
        <Header />
        <FormSearch
          keyword={keyword}
          onChangeKeyword={onChangeKeyword}
          onHandleSubmitForm={onHandleSubmitForm}
        />
      </div>
      <div className="container">
        {loading && <Loading />}
        <InfiniteScroll
          dataLength={images.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={images.length ? <Loading /> : null}
          endMessage={
            <div className="text-center">
              <b>Bạn đã xem hết ảnh</b>
            </div>
          }
        >
          {renderImages()}
        </InfiniteScroll>
      </div>
    </div>
  )

}

export default App;
