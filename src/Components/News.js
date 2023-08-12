import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)}  - NewsAgent`
  }

  async updateNews() {
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=116625893f244ba2a3a248018d97f0c3&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    this.props.setProgress(30)
    let data = await fetch(url);
    let parsedUrl = await data.json();
    this.props.setProgress(70)
    this.setState({
      articles: parsedUrl.articles,
      totalResults: parsedUrl.totalResults,
      loading: false
    })
    this.props.setProgress(100)
    console.log(parsedUrl);
  }
  async componentDidMount() {
    this.updateNews();
  }
  handlePrevClick = async () => {
    await this.setState({ page: this.state.page - 1 });
    this.updateNews();
  }

  handleNextClick = async () => {
    await this.setState({ page: this.state.page + 1 });
    this.updateNews();
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  fetchMoreData = async () => {
    this.setState({page: this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=116625893f244ba2a3a248018d97f0c3&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedUrl = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedUrl.articles),
      totalResults: parsedUrl.totalResults
    })
  }
  render() {
    return (
      <>
          <h1 className='text-center' style={{ margin: "35px", marginTop: "90px"}}>NewsAgent - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
          {this.state.loading && <Spinner/>}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner/>}
          >
            <div className='container'>
              <h1 className="text-center"></h1>
              <div className='row'>
                {this.state.articles.map((element) => {
                  return <div className='col-md-3 my-3' key={element.url}>
                    <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} name={element.author} source={element.source.name} />
                  </div>
                })}
              </div>
            </div>
          </InfiniteScroll>
      </>
    )
  }
}

export default News