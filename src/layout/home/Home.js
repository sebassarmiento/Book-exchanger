import React, { Component } from 'react';
import '../home/home.css';
import '../../utils/buttons/buttons.css';
import SearchIcon from '../../img/search.png';
import MessageIcon from '../../img/chat.png';
import DealIcon from '../../img/deal.png';
import { Fade, Flip } from 'react-reveal';
import MedalIcon from '../../img/gold-medal.png';
import BooksIcon from '../../img/bookshelf-2.png';
import WalletIcon from '../../img/purse.png';
import { NavLink } from 'react-router-dom';

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
                  <img src={SearchIcon} alt="search-icon" />
                  <p>Search books in our library with more than 100.000 options to choose!</p>
                </div>
                <div>
                  <img src={MessageIcon} alt="message-icon" />
                  <p>Let the owner know you are interested in one of his books. He will be able to see your profile and all your books.</p>
                </div>
                <div>
                  <img src={DealIcon} alt="deal-icon" />
                  <p>Hopefully now you got a deal with the owner and are ready to send him the book and receive yours!</p>
                </div>
              </div>
            </Fade>
            <Flip delay={1750} left>
            <NavLink to='/signup' className="blue-btn" >Join now!</NavLink>
            </Flip>
          </div>
        </div>
        <div className="home-third-container" >
          <Fade left>
            <h1>WHY CHOOSE BOOK EXCHANGER?</h1>
          </Fade>
          <Fade delay={1000} bottom cascade>
            <div className="home-our-qualities" >
              <div>
                <img src={MedalIcon} alt="medal-icon" />
                <h1>We are the best.</h1>
                <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              </div>
              <div>
                <img src={BooksIcon} alt="books-icon" />
                <h1>+100.000 books.</h1>
                <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              </div>
              <div>
                <img src={WalletIcon} alt="wallet-icon" />
                <h1>Save money.</h1>
                <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              </div>
            </div>
          </Fade>
        </div>
        <div className="home-fourth-container" >
          <Fade left>
            <h1>COMMON QUESTIONS</h1>
          </Fade>
          <Fade delay={1000} bottom cascade>
            <div className="home-faq" >
              <div>
                <span>
                <h3>Can i sell my books?</h3>
                <p>The main purpose of this app is not to sell books but rather avoid them being not used. You can not sell a book but you can exchange it for one or more that you like from someone else.</p>
                </span>
              </div>
              <div>
                <span>
                <h3>Do i have to pay anything?</h3>
                <p>Yes. Even though the books are technically free, you still have to pay for the delivery. Sometimes it can be as low as $2.</p>
                </span>
              </div>
              <div>
                <span>
                <h3>What happens if i dont recieve my book?</h3>
                <p>After sending your book you have up to 14 days of wait depending on delivery times. Passed those days you should notify us and we will take care of the situation.</p>
                </span>
              </div>
            </div>
          </Fade>
        </div>
      </React.Fragment>
    )
  }
}

export default Home;