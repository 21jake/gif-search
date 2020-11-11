import React, { Component } from 'react';
import debouce from 'lodash.debounce';
import throttle from 'lodash.throttle';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }


  fetchData = debouce(() => {
    this.props.fetchData(this.state.keyword);
  }, 500);


  handleScroll = throttle(() => {
    const scrollingElement = (document.scrollingElement || document.body);

    if (scrollingElement.scrollHeight - scrollingElement.scrollTop - scrollingElement.clientHeight <= 100) {
      this.props.fetchData(this.state.keyword, true);
    }
  }, 1000);

  handleChangeKeyword = (event) => {
    this.setState({
      keyword: event.target.value
    }, this.fetchData);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12 text-center">
          <div className="form-group">
            <input type="text" className="form-control" value={this.state.value} onChange={this.handleChangeKeyword} />
          </div>
        </div>
      </div>
    )
  }
}

export default Search;