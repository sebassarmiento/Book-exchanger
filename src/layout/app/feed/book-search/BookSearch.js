import React, { Component } from 'react';
import './book-search.css';

class BookSearch extends Component {
    render() {
        return (
            <div className="book-filters" >
                <h4>Search books</h4>
                <input className="search-bar" placeholder="search" type="text" />
                <h5>Filter by:</h5>
                <div className="filter-options" >
                    <h6>Category</h6>
                    <div className="option" >
                        <input id="cb-1" type="checkbox" />
                        <label htmlFor="cb-1" >Drama</label>
                    </div>
                    <div className="option" >
                        <input id="cb-2" type="checkbox" />
                        <label htmlFor="cb-2" >Science</label>
                    </div>
                    <div className="option" >
                        <input id="cb-3" type="checkbox" />
                        <label htmlFor="cb-3" >Finance</label>
                    </div>
                    <div className="option" >
                        <input id="cb-4" type="checkbox" />
                        <label htmlFor="cb-4" >Romance</label>
                    </div>
                    <div className="option" >
                        <input id="cb-3" type="checkbox" />
                        <label htmlFor="cb-3" >Technology</label>
                    </div>
                    <div className="option" >
                        <input id="cb-4" type="checkbox" />
                        <label htmlFor="cb-4" >Self-improvement</label>
                    </div>
                </div>
                <div className="filter-options" >
                    <h6>Location</h6>
                    <div className="option" >
                        <input id="cb-1" type="checkbox" />
                        <label htmlFor="cb-1" >50km</label>
                    </div>
                    <div className="option" >
                        <input id="cb-2" type="checkbox" />
                        <label htmlFor="cb-2" >100km</label>
                    </div>
                    <div className="option" >
                        <input id="cb-3" type="checkbox" />
                        <label htmlFor="cb-3" >200km</label>
                    </div>
                    <div className="option" >
                        <input id="cb-4" type="checkbox" />
                        <label htmlFor="cb-4" >500km</label>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookSearch;