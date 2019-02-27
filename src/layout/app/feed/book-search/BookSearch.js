import React, { Component } from 'react';
import './book-search.css';

class BookSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            categoryFilters: [],
            locationFilters: [],
            ratingsFilter: 0,
            mobileOpen: false
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
    handleRatingChange(e) {
        this.ratings.map(r => {
            if (parseFloat(e.target.name) !== this.ratings.indexOf(r) + 1) {
                r.current.checked = false
            }
            return null
        })
        let rating = this.ratings.filter(r => r.current.checked)
        if (rating.length !== 0) {
            this.setState({ ratingsFilter: parseFloat(rating[0].current.name) })
        } else {
            this.setState({ ratingsFilter: 0 })
        }
    }

    handleQueryInput(e) {
        if(e.target.value.length < 40){
            this.setState({ [e.target.name]: e.target.value })
        }
    }
    handleSearch() {
        if (this.state.query.length > 0) {
            this.props.updateData(null)
            fetch(`https://bookexchangerapi.herokuapp.com/app/books/search?name=${this.state.query}`)
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
            fetch(`https://bookexchangerapi.herokuapp.com/app/books/filters`, {
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
        return (
            <div className="book-filters" >
                <div className="search-bar" >
                    <input placeholder="Search books..." autoComplete="off" name="query" onChange={(e) => this.handleQueryInput(e)} value={this.state.query} type="text" />
                    <i className="fas fa-search" onClick={() => this.handleSearch()} ></i>
                </div>
                <div className={this.state.mobileOpen ? 'filters-mobile-open' : 'filters-mobile-closed'} >
                    <h5 >Filter by Category</h5>
                    <div className="filter-options" >
                        <div className="option" >
                            <input name="Art" onChange={(e) => this.handleCategoryChange(e)} id="cb-3" type="checkbox" />
                            <label htmlFor="cb-3" >Art</label>
                        </div>
                        <div className="option" >
                            <input name="Business" onChange={(e) => this.handleCategoryChange(e)} id="cb-3" type="checkbox" />
                            <label htmlFor="cb-3" >Business</label>
                        </div>
                        <div className="option" >
                            <input name="Comedy" onChange={(e) => this.handleCategoryChange(e)} id="cb-1" type="checkbox" />
                            <label htmlFor="cb-1" >Comedy</label>
                        </div>
                        <div className="option" >
                            <input name="Computer-science" onChange={(e) => this.handleCategoryChange(e)} id="cb-4" type="checkbox" />
                            <label htmlFor="cb-4" >Computer Science</label>
                        </div>
                        <div className="option" >
                            <input name="Cooking" onChange={(e) => this.handleCategoryChange(e)} id="cb-4" type="checkbox" />
                            <label htmlFor="cb-4" >Cooking</label>
                        </div>
                        <div className="option" >
                            <input name="Cryptocurrency" onChange={(e) => this.handleCategoryChange(e)} id="cb-3" type="checkbox" />
                            <label htmlFor="cb-3" >Cryptocurrency</label>
                        </div>

                        <div className="option" >
                            <input name="Drama" onChange={(e) => this.handleCategoryChange(e)} type="checkbox" />
                            <label htmlFor="cb-1" >Drama</label>
                        </div>
                        <div className="option" >
                            <input name="economics" onChange={(e) => this.handleCategoryChange(e)} id="cb-2" type="checkbox" />
                            <label htmlFor="cb-2" >Economics</label>
                        </div>
                        <div className="option" >
                            <input name="Finance" onChange={(e) => this.handleCategoryChange(e)} id="cb-3" type="checkbox" />
                            <label htmlFor="cb-3" >Finance</label>
                        </div>
                        <div className="option" >
                            <input name="Health" onChange={(e) => this.handleCategoryChange(e)} id="cb-3" type="checkbox" />
                            <label htmlFor="cb-3" >Health</label>
                        </div>
                        <div className="option" >
                            <input name="Investing" onChange={(e) => this.handleCategoryChange(e)} id="cb-3" type="checkbox" />
                            <label htmlFor="cb-3" >Investing</label>
                        </div>
                        <div className="option" >
                            <input name="Literature" onChange={(e) => this.handleCategoryChange(e)} id="cb-3" type="checkbox" />
                            <label htmlFor="cb-3" >Literature</label>
                        </div>
                        <div className="option" >
                            <input name="Math" onChange={(e) => this.handleCategoryChange(e)} id="cb-3" type="checkbox" />
                            <label htmlFor="cb-3" >Math</label>
                        </div>
                        <div className="option" >
                            <input name="Romance" onChange={(e) => this.handleCategoryChange(e)} id="cb-4" type="checkbox" />
                            <label htmlFor="cb-4" >Romance</label>
                        </div>
                        <div className="option" >
                            <input name="Science" onChange={(e) => this.handleCategoryChange(e)} id="cb-2" type="checkbox" />
                            <label htmlFor="cb-2" >Science</label>
                        </div>
                        <div className="option" >
                            <input name="Statistics" onChange={(e) => this.handleCategoryChange(e)} id="cb-2" type="checkbox" />
                            <label htmlFor="cb-2" >Statistics</label>
                        </div>
                        <div className="option" >
                            <input name="Technology" onChange={(e) => this.handleCategoryChange(e)} id="cb-3" type="checkbox" />
                            <label htmlFor="cb-3" >Technology</label>
                        </div>
                        <div className="option" >
                            <input name="Technology" onChange={(e) => this.handleCategoryChange(e)} id="cb-3" type="checkbox" />
                            <label htmlFor="cb-3" >Travel</label>
                        </div>


                    </div>
                    <h5 >Filter by Location</h5>
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
                        <div className="option" >
                            <input name="Delaware" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Delaware</label>
                        </div>
                        <div className="option" >
                            <input name="District of Columbia" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >District of Columbia</label>
                        </div>
                        <div className="option" >
                            <input name="Florida" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Florida</label>
                        </div>
                        <div className="option" >
                            <input name="Georgia" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Georgia</label>
                        </div>
                        <div className="option" >
                            <input name="Hawaii" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Hawaii</label>
                        </div>
                        <div className="option" >
                            <input name="Idaho" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Idaho</label>
                        </div>
                        <div className="option" >
                            <input name="Illinois" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Illinois</label>
                        </div>
                        <div className="option" >
                            <input name="Indiana" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Indiana</label>
                        </div>
                        <div className="option" >
                            <input name="Iowa" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Iowa</label>
                        </div>
                        <div className="option" >
                            <input name="Kansas" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Kansas</label>
                        </div>
                        <div className="option" >
                            <input name="Kentucky" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Kentucky</label>
                        </div>
                        <div className="option" >
                            <input name="Louisiana" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Louisiana</label>
                        </div>
                        <div className="option" >
                            <input name="Maine" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Maine</label>
                        </div>
                        <div className="option" >
                            <input name="Maryland" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Maryland</label>
                        </div>
                        <div className="option" >
                            <input name="Massachussets" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Massachussets</label>
                        </div>
                        <div className="option" >
                            <input name="Michigan" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Michigan</label>
                        </div>
                        <div className="option" >
                            <input name="Minnesota" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Minnesota</label>
                        </div>
                        <div className="option" >
                            <input name="Mississippi" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Mississippi</label>
                        </div>
                        <div className="option" >
                            <input name="Missouri" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Missouri</label>
                        </div>
                        <div className="option" >
                            <input name="Montana" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Montana</label>
                        </div>
                        <div className="option" >
                            <input name="Nebraska" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Nebraska</label>
                        </div>
                        <div className="option" >
                            <input name="Nevada" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Nevada</label>
                        </div>
                        <div className="option" >
                            <input name="New Hampshire" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >New Hampshire</label>
                        </div>
                        <div className="option" >
                            <input name="New Jersey" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >New Jersey</label>
                        </div>
                        <div className="option" >
                            <input name="New Mexico" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >New Mexico</label>
                        </div>
                        <div className="option" >
                            <input name="New York" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >New York</label>
                        </div>
                        <div className="option" >
                            <input name="North Carolina" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >North Carolina</label>
                        </div>
                        <div className="option" >
                            <input name="North Dakota" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >North Dakota</label>
                        </div>
                        <div className="option" >
                            <input name="Ohio" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Ohio</label>
                        </div>
                        <div className="option" >
                            <input name="Oklahoma" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Oklahoma</label>
                        </div>
                        <div className="option" >
                            <input name="Oregon" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Oregon</label>
                        </div>
                        <div className="option" >
                            <input name="Pennsylvania" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Pennsylvania</label>
                        </div>
                        <div className="option" >
                            <input name="Rhode Island" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Rhode Island</label>
                        </div>
                        <div className="option" >
                            <input name="South Carolina" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >South Carolina</label>
                        </div>
                        <div className="option" >
                            <input name="South Dakota" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >South Dakota</label>
                        </div>
                        <div className="option" >
                            <input name="Tennessee" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Tennessee</label>
                        </div>
                        <div className="option" >
                            <input name="Texas" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Texas</label>
                        </div>
                        <div className="option" >
                            <input name="Utah" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Utah</label>
                        </div>
                        <div className="option" >
                            <input name="Vermont" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Vermont</label>
                        </div>
                        <div className="option" >
                            <input name="Virginia" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Virginia</label>
                        </div>
                        <div className="option" >
                            <input name="Washington" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Washington</label>
                        </div>
                        <div className="option" >
                            <input name="West Virginia" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >West Virginia</label>
                        </div>
                        <div className="option" >
                            <input name="Wisconsin" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Wisconsin</label>
                        </div>
                        <div className="option" >
                            <input name="Wyoming" onChange={(e) => this.handleLocationChange(e)} id="cb-1" type="checkbox" />
                            <label >Wyoming</label>
                        </div>
                    </div>
                    <h5 >Filter by ratings</h5>
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
                                <span></span>
                            </div>
                        </div>
                    </div>
                    <div className="apply-filters" >
                        <button onClick={() => this.handleFilters()} >Apply filters & search</button>
                    </div>
                </div>
                <div onClick={() => this.setState({mobileOpen: !this.state.mobileOpen})} className="filters-toggler" >
                    {this.state.mobileOpen ? 'Hide filters'  : 'Show filters' }
                </div>
            </div>
        )
    }
}


export default BookSearch;