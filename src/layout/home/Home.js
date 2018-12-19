import React, { Component } from 'react';
import '../home/home.css';
import SearchIcon from '../../img/search.png';
import MessageIcon from '../../img/chat.png';
import DealIcon from '../../img/deal.png';
import { Fade } from 'react-reveal';

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="home-first-container" >
          <div>
            <h1>What is Book exchanger?</h1>
            <p>Book exchanger is a cross platform built for people wanting to exchange those old books laying in the shelf with other people in the same situation</p>
          </div>
        </div>
        <div className="home-second-container" >
          <div >
            <Fade left>
              <h1>HOW DOES IT WORK?</h1>
            </Fade>
            <Fade delay={1000} bottom cascade>
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
            </Fade>
          </div>
        </div>
        <div className="home-third-container" >
            <Fade left>
              <h1>WHY CHOOSE BOOK EXCHANGER?</h1>
            </Fade>
            <Fade delay={1000} bottom cascade>
              <div className="home-our-qualities" >
                <div>
                  <img src={SearchIcon} />
                  <h1>We are the best.</h1>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
                <div>
                  <img src={MessageIcon} />
                  <h1>We are the best.</h1>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
                <div>
                  <img src={DealIcon} />
                  <h1>We are the best.</h1>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
              </div>
            </Fade>
          </div>
      </React.Fragment>
    )
  }
}

export default Home;