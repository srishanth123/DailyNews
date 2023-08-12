import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, date, name, source} = this.props;
    return (
      <div>
        <div className="card">
          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0"
          }}>
            <span class="badge rounded-pill bg-danger" style={{left: "90%", zIndex: "1"}}>
              {source}
            </span>
          </div>
          <img src={!imageUrl ? "https://www.drugtargetreview.com/wp-content/uploads/Human-Brain-project.jpg" : imageUrl} className="card-img-top" alt='Human-Brain-project.jpg' />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">By {!name ? "Unknown" : name} on {new Date(date).toDateString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem