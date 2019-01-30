import React, { Component } from 'react';
import './book-search.css';

class BookSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: ''
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: !this.state[e.target.name] })
    }
    handleQueryInput(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    filtersApplied() {
        let arr = []
        for (let prop in this.state) {
            if (this.state[prop]) {
                if (prop !== 'query') arr.push(prop)
            }
        }
        return arr
    }

    handleSearch() {
        if (this.state.query.length > 0) {
            this.props.updateData(null)
            fetch(`http://localhost:3000/app/books/search?name=${this.state.query}`)
                .then(d => d.json())
                .then(res => {
                    this.props.updateData(res, this.state.query)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    render() {
        return (
            <div className="book-filters" >
                <div className="search-bar" >
                    <input placeholder="Search books..." autoComplete="off" name="query" onChange={(e) => this.handleQueryInput(e)} value={this.state.query} type="text" />
                    <i className="fas fa-search" onClick={() => this.handleSearch()} ></i>
                </div>
                <h5>Filter by Category</h5>
                <div className="filter-options" >
                    <div className="option" >
                        <input name="drama" onChange={(e) => this.handleChange(e)} type="checkbox" />
                        <label htmlFor="cb-1" >Drama</label>
                    </div>
                    <div className="option" >
                        <input name="science" onChange={(e) => this.handleChange(e)} id="cb-2" type="checkbox" />
                        <label htmlFor="cb-2" >Science</label>
                    </div>
                    <div className="option" >
                        <input name="finance" onChange={(e) => this.handleChange(e)} id="cb-3" type="checkbox" />
                        <label htmlFor="cb-3" >Finance</label>
                    </div>
                    <div className="option" >
                        <input name="romance" onChange={(e) => this.handleChange(e)} id="cb-4" type="checkbox" />
                        <label htmlFor="cb-4" >Romance</label>
                    </div>
                    <div className="option" >
                        <input name="technology" onChange={(e) => this.handleChange(e)} id="cb-3" type="checkbox" />
                        <label htmlFor="cb-3" >Technology</label>
                    </div>
                    <div className="option" >
                        <input name="self-improvement" onChange={(e) => this.handleChange(e)} id="cb-4" type="checkbox" />
                        <label htmlFor="cb-4" >Self-improvement</label>
                    </div>
                    <div className="option" >
                        <input name="comedy" onChange={(e) => this.handleChange(e)} id="cb-1" type="checkbox" />
                        <label htmlFor="cb-1" >Comedy</label>
                    </div>
                    <div className="option" >
                        <input name="economics" onChange={(e) => this.handleChange(e)} id="cb-2" type="checkbox" />
                        <label htmlFor="cb-2" >Economics</label>
                    </div>
                    <div className="option" >
                        <input name="investing" onChange={(e) => this.handleChange(e)} id="cb-3" type="checkbox" />
                        <label htmlFor="cb-3" >Investing</label>
                    </div>
                    <div className="option" >
                        <input name="computer-science" onChange={(e) => this.handleChange(e)} id="cb-4" type="checkbox" />
                        <label htmlFor="cb-4" >Computer Science</label>
                    </div>
                    <div className="option" >
                        <input name="crypto" onChange={(e) => this.handleChange(e)} id="cb-3" type="checkbox" />
                        <label htmlFor="cb-3" >Crypto</label>
                    </div>
                    <div className="option" >
                        <input name="cooking" onChange={(e) => this.handleChange(e)} id="cb-4" type="checkbox" />
                        <label htmlFor="cb-4" >Cooking</label>
                    </div>
                </div>
                <h5>Filter by Location</h5>
                <div className="filter-options" >
                    <div className="option" >
                        <input name="alabama" onChange={(e) => this.handleChange(e)} id="cb-1" type="checkbox" />
                        <label >Alabama</label>
                    </div>
                    <div className="option" >
                        <input name="alaska" onChange={(e) => this.handleChange(e)} id="cb-1" type="checkbox" />
                        <label >Alaska</label>
                    </div>
                    <div className="option" >
                        <input name="arizona" onChange={(e) => this.handleChange(e)} id="cb-1" type="checkbox" />
                        <label >Arizona</label>
                    </div>
                    <div className="option" >
                        <input name="arkansas" onChange={(e) => this.handleChange(e)} id="cb-1" type="checkbox" />
                        <label >Arkansas</label>
                    </div>
                    <div className="option" >
                        <input name="california" onChange={(e) => this.handleChange(e)} id="cb-1" type="checkbox" />
                        <label >California</label>
                    </div>
                    <div className="option" >
                        <input name="colorado" onChange={(e) => this.handleChange(e)} id="cb-1" type="checkbox" />
                        <label >Colorado</label>
                    </div>
                    <div className="option" >
                        <input name="connecticut" onChange={(e) => this.handleChange(e)} id="cb-1" type="checkbox" />
                        <label >Connecticut</label>
                    </div>
                </div>
                <h5>Filter by ratings</h5>
                <div className="filter-options" >
                    <div className="option" >
                        <input type="checkbox" />
                        <div className="rating-filter-option" >
                            <i className="fas fa-star" ></i>
                            <i className="far fa-star" ></i>
                            <i className="far fa-star" ></i>
                            <i className="far fa-star" ></i>
                            <i className="far fa-star" ></i>
                            <span> & up</span>
                        </div>
                    </div>
                    <div className="option" >
                        <input type="checkbox" />
                        <div className="rating-filter-option" >
                            <i className="fas fa-star" ></i>
                            <i className="fas fa-star" ></i>
                            <i className="far fa-star" ></i>
                            <i className="far fa-star" ></i>
                            <i className="far fa-star" ></i>
                            <span> & up</span>
                        </div>
                    </div>
                    <div className="option" >
                        <input type="checkbox" />
                        <div className="rating-filter-option" >
                            <i className="fas fa-star" ></i>
                            <i className="fas fa-star" ></i>
                            <i className="fas fa-star" ></i>
                            <i className="far fa-star" ></i>
                            <i className="far fa-star" ></i>
                            <span> & up</span>
                        </div>
                    </div>
                    <div className="option" >
                        <input type="checkbox" />
                        <div className="rating-filter-option" >
                            <i className="fas fa-star" ></i>
                            <i className="fas fa-star" ></i>
                            <i className="fas fa-star" ></i>
                            <i className="fas fa-star" ></i>
                            <i className="far fa-star" ></i>
                            <span> & up</span>
                        </div>
                    </div>
                    <div className="option" >
                        <input type="checkbox" />
                        <div className="rating-filter-option" >
                            <i className="fas fa-star" ></i>
                            <i className="fas fa-star" ></i>
                            <i className="fas fa-star" ></i>
                            <i className="fas fa-star" ></i>
                            <i className="fas fa-star" ></i>
                            <span> & up</span>
                        </div>
                    </div>
                </div>
                <button className="apply-filters" >Apply filters</button>
            </div>
        )
    }
}


export default BookSearch;