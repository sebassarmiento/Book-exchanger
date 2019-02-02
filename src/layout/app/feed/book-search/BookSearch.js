import React, { Component } from 'react';
import './book-search.css';

class BookSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            categoryFilters: [],
            locationFilters: [],
            ratingsFilter: 0
        }
        this.ratings = [React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef()]
    }
    handleCategoryChange(e) {
        let index = this.state.categoryFilters.findIndex(f => f === e.target.name)
        if (index >= 0) {
            let categoryFiltersUpdated = this.state.categoryFilters.filter(f => f !== this.state.categoryFilters[index])
            this.setState({ categoryFilters: categoryFiltersUpdated })
        } else {
            this.setState({ categoryFilters: [...this.state.categoryFilters, e.target.name] })
        }
    }
    handleLocationChange(e) {
        let index = this.state.locationFilters.findIndex(f => f === e.target.name)
        if (index >= 0) {
            let locationFiltersUpdated = this.state.locationFilters.filter(f => f !== this.state.locationFilters[index])
            this.setState({ locationFilters: locationFiltersUpdated })
        } else {
            this.setState({ locationFilters: [...this.state.locationFilters, e.target.name] })
        }
    }
    handleRatingChange(e){
        this.ratings.map(r => {
            if(parseFloat(e.target.name) !== this.ratings.indexOf(r) + 1){
                r.current.checked = false
            }
        })
        let rating = this.ratings.filter(r => r.current.checked)
        if(rating.length !== 0){
            this.setState({ ratingsFilter: parseFloat(rating[0].current.name) })
        } else {
            this.setState({ ratingsFilter: 0 })
        }
    }

    handleQueryInput(e) {
        this.setState({ [e.target.name]: e.target.value })
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

    handleFilters() {
        if (this.state.categoryFilters.length > 0 || this.state.locationFilters.length > 0 || this.state.ratingsFilter !== 0) {
            this.props.updateData(null)
            fetch(`http://localhost:3000/app/books/filters`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    categoryFilters: this.state.categoryFilters,
                    locationFilters: this.state.locationFilters,
                    ratingsFilter: this.state.ratingsFilter
                })
            })
                .then(d => d.json())
                .then(res => {
                    this.props.updateData(res)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    render() {
        console.log('MI SYTATE', this.state)
        return (
            <div className="book-filters" >
                <div className="search-bar" >
                    <input placeholder="Search books..." autoComplete="off" name="query" onChange={(e) => this.handleQueryInput(e)} value={this.state.query} type="text" />
                    <i className="fas fa-search" onClick={() => this.handleSearch()} ></i>
                </div>
                <h5>Filter by Category</h5>
                <div className="filter-options" >
                    <div className="option" >
                        <input name="Drama" onChange={(e) => this.handleCategoryChange(e)} type="checkbox" />
                        <label htmlFor="cb-1" >Drama</label>
                    </div>
                    <div className="option" >
                        <input name="Science" onChange={(e) => this.handleCategoryChange(e)} id="cb-2" type="checkbox" />
                        <label htmlFor="cb-2" >Science</label>
                    </div>
                    <div className="option" >
                        <input name="Finance" onChange={(e) => this.handleCategoryChange(e)} id="cb-3" type="checkbox" />
                        <label htmlFor="cb-3" >Finance</label>
                    </div>
                    <div className="option" >
                        <input name="Romance" onChange={(e) => this.handleCategoryChange(e)} id="cb-4" type="checkbox" />
                        <label htmlFor="cb-4" >Romance</label>
                    </div>
                    <div className="option" >
                        <input name="Technology" onChange={(e) => this.handleCategoryChange(e)} id="cb-3" type="checkbox" />
                        <label htmlFor="cb-3" >Technology</label>
                    </div>
                    <div className="option" >
                        <input name="Self-improvement" onChange={(e) => this.handleCategoryChange(e)} id="cb-4" type="checkbox" />
                        <label htmlFor="cb-4" >Self-improvement</label>
                    </div>
                    <div className="option" >
                        <input name="Comedy" onChange={(e) => this.handleCategoryChange(e)} id="cb-1" type="checkbox" />
                        <label htmlFor="cb-1" >Comedy</label>
                    </div>
                    <div className="option" >
                        <input name="economics" onChange={(e) => this.handleCategoryChange(e)} id="cb-2" type="checkbox" />
                        <label htmlFor="cb-2" >Economics</label>
                    </div>
                    <div className="option" >
                        <input name="investing" onChange={(e) => this.handleCategoryChange(e)} id="cb-3" type="checkbox" />
                        <label htmlFor="cb-3" >Investing</label>
                    </div>
                    <div className="option" >
                        <input name="computer-science" onChange={(e) => this.handleCategoryChange(e)} id="cb-4" type="checkbox" />
                        <label htmlFor="cb-4" >Computer Science</label>
                    </div>
                    <div className="option" >
                        <input name="crypto" onChange={(e) => this.handleCategoryChange(e)} id="cb-3" type="checkbox" />
                        <label htmlFor="cb-3" >Crypto</label>
                    </div>
                    <div className="option" >
                        <input name="cooking" onChange={(e) => this.handleCategoryChange(e)} id="cb-4" type="checkbox" />
                        <label htmlFor="cb-4" >Cooking</label>
                    </div>
                </div>
                <h5>Filter by Location</h5>
                <div className="filter-options" >
                    <div className="option" >
                        <input name="Alabama" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                        <label >Alabama</label>
                    </div>
                    <div className="option" >
                        <input name="Alaska" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                        <label >Alaska</label>
                    </div>
                    <div className="option" >
                        <input name="Arizona" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                        <label >Arizona</label>
                    </div>
                    <div className="option" >
                        <input name="Arkansas" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                        <label >Arkansas</label>
                    </div>
                    <div className="option" >
                        <input name="California" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                        <label >California</label>
                    </div>
                    <div className="option" >
                        <input name="Colorado" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                        <label >Colorado</label>
                    </div>
                    <div className="option" >
                        <input name="Connecticut" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                        <label >Connecticut</label>
                    </div>
                </div>
                <h5>Filter by ratings</h5>
                <div className="filter-options" >
                    <div className="option" >
                        <input ref={this.ratings[0]} name="1" onClick={(e) => this.handleRatingChange(e)} type="checkbox" />
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
                        <input ref={this.ratings[1]} name="2" onClick={(e) => this.handleRatingChange(e)} type="checkbox" />
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
                        <input ref={this.ratings[2]} name="3" onClick={(e) => this.handleRatingChange(e)} type="checkbox" />
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
                        <input ref={this.ratings[3]} name="4" onClick={(e) => this.handleRatingChange(e)} type="checkbox" />
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
                        <input ref={this.ratings[4]} name="5" onClick={(e) => this.handleRatingChange(e)} type="checkbox" />
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
                <div className="apply-filters" >
                    <button onClick={() => this.handleFilters()} >Apply filters & search</button>
                </div>
            </div>
        )
    }
}


export default BookSearch;