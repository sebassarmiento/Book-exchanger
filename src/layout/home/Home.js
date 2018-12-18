import React, { Component } from 'react';
import '../home/home.css';
import SearchIcon from '../../img/search.png';
import MessageIcon from '../../img/chat.png';
import DealIcon from '../../img/deal.png';

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="home-first-container" >
          <div>
            <h1>What is Book exchanger?</h1>
            <p>Book exchanger is a cross platform built for people wanting to exchange those old books laying in the shelf with other people in the same esituation</p>
          </div>
        </div>
        <div className="home-second-container" >
          <div>
            <h1>How does it work?</h1>
            <div className="home-instructions-1" >
              <div>
                <img src={SearchIcon} />
                <p>Search books in our library with more than 100.000 options to choose!</p>
              </div>
              <div>
                <img src={MessageIcon} />
                <p>Let the owner know you are interested in one of his books. He will be able to see your profile and all your books.</p>
              </div>
              <div>
                <img src={DealIcon} />
                <p>Hopefully now you got a deal with the owner and are ready to send him the book and receive yours!</p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Home;