import React, { Component } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Search from './components/Search';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MediaCard from './components/MediaCard';
import Loading from './components/Loading';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      loadingTop: false,
      loadingBottom: false,
    }
  }

  fetchImages = async (keyword, scroll) => {
    const keyLoading = scroll ? 'loadingBottom' : 'loadingTop';
    const newOffset = scroll ? this.state.offset + 25 : 0;

    this.setState({ [keyLoading]: true });

    const url = `https://api.giphy.com/v1/gifs/search?api_key=R8Tn7WP68lMvqGDTD9Qn82x9kZgAXZIR&q=${keyword}&limit=25&offset=${newOffset}&rating=g&lang=vi`
    const res = await axios.get(url);

    const fetchImages = res.data.data;
    const newImages = scroll ? [...this.state.images, ...fetchImages] : fetchImages;

    this.setState({
      [keyLoading]: false,
      images: newImages,
      offset: newOffset
    });

  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Header />
          <Search fetchData={this.fetchImages} />
          <div className="result">
            <Loading loading={this.state.loadingTop} />
            {this.state.images.map(image => <MediaCard key={image.id} item={image} />)}
            <Loading loading={this.state.loadingBottom} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
