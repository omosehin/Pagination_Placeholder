import React, { Component } from "react";
import { CapitaliseFirstLetter } from "../Component/Shared/Shared";
import Card from "../Component/Card";
import Pagination from "../Component/Shared/Pagination";
import Spinner from "../Component/Shared/Spinner";
import "../Component/App.css";
class Blog extends Component {
  constructor() {
    super();
    this.state = {
      allPosts: [],
      currentPosts: [],
      currentPage: null,
      totalPages: null,
      datas: [],
      isLoading: false,
      err: null
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(Post => {
        this.getData(Post);
        this.setState({ isLoading: false });
      })
      .catch(err => {
        this.getError(err);
        this.setState({ isLoading: false });
      });
  }
  getData = datas => {
    this.setState({
      allPosts: datas
    });
  };

  getError = err => {
    this.setState({
      err
    });
  };

  onPageChanged = data => {
    const { allPosts } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentPosts = allPosts.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentPosts, totalPages });
  };

  render() {
    const {
      allPosts,
      currentPosts,
      currentPage,
      totalPages,
      isLoading,
      err
    } = this.state;
    console.log(err);
    const totalPosts = allPosts.length;

    if (totalPosts === 0) return null;

    const headerClass = [
      "text-dark py-2 pr-4 m-0",
      currentPage ? "border-gray border-right" : ""
    ]
      .join(" ")
      .trim();
    return (
      <div>
        <div className="container">
          {isLoading === true && <Spinner />}
          {err && isLoading === false && "Check Your Connection"}
          <div className="row my-3">
            <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
              <div className=" d-flex flex-row align-items-center">
                <h2 className={headerClass}>
                  <strong className="text-secondary">{totalPosts}</strong> Posts
                </h2>
                {currentPage && (
                  <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                    Page <span className="font-weight-bold">{currentPage}</span>{" "}
                    / <span className="font-weight-bold">{totalPages}</span>
                  </span>
                )}
              </div>
              <div className=" d-flex flex-row py-4 align-items-center">
                <Pagination
                  totalRecords={totalPosts}
                  pageLimit={2}
                  pageNeighbours={1}
                  onPageChanged={this.onPageChanged}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row my-3">
            {currentPosts.map(data => (
              <div
                key={data.id}
                className="col-lg-5 col-xs-12 card my-1 mt-4 mx-auto blogCard"
              >
                <Card
                  title={CapitaliseFirstLetter(data.title)}
                  body={CapitaliseFirstLetter(data.body)}
                  cardTitleStyle="cardTitleStyle"
                  cardBodyStyle="cardBodyStyle"
                  className ='cardView'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Blog;
