import { React, Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import avatar from '../../assets/avatar.png';
import './style.css';

class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            msg: window.location.hash.slice(14),
            greeting: "How can I help you today?"
        }
        window.scrollTo(0, 0)
        this.send = this.send.bind(this)
    }

    async send(){

        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const form = document.getElementById('loading-container');

        document.body.style.overflow ="hidden";
        
        

        form.innerHTML = `
            <div class="loading-container">
                <h1>Sending...</h1>
                <i class="fa fa-spinner"></i>

            </div>
                `;
        window.scrollTo(0, 0);

        await axios({
            method: 'post',
            url:'https://emailsendeer.herokuapp.com/sendemail',
            data: {
                name,
                message,
                email
            }
          }).then(() => {

            form.innerHTML = `
            <div class="loading-container">
            <h1>Your request was succefully sent.</h1>
            <i class="fa fa-check-circle"></i>
    
            </div>
            
       `}).catch((error) => {
            alert(error)
            form.innerHTML = `
            <div class="loading-container">
            <h1>Sorry try again later.</h1>
            <i class="fa fa-times"></i>

            </div>
            
       `})

            setTimeout(function() {
                this.props.history.replace('/')
                document.body.style.overflowY ="scroll";
            }.bind(this), 3000);
            

    }

    render() {
        return (
            <div >

                <div id="loading-container">
                    {/* this is the loading screen */}

                </div>

                <div className="background-form">
                    <Link to="/">
                        <i className="fa fa-arrow-left contact-arrow" />
                    </Link>

                    <img src={avatar} className="contact-avatar" />
                    <a href="tel:+351937397475" >
                        <i className="fa fa-phone contact-phone" />
                    </a>

                </div>
                <br />
                <br />
                <br />

                <h1 className="greeting" id="greeting">
                    Thanks for taking the time to reach out.<br />
                    {this.state.msg.length === 0 ? "How can I help you today?" : "Please fill in the form below!"}
                </h1>


                <form className="contact-form" id="form" onSubmit={this.send}>

                    <div className="email-name-container">
                        <label className="name">Name</label><input type="name" id="name" required></input>
                        <label className="email">Email</label><input type="email" id="email" required></input>
                    </div>

                    <div className="message-container">
                        <label>Message</label>
                        <textarea id="message" required>{this.state.msg.length !== 0 ? `Hello, I would like to request a quote for the ${this.state.msg} package/website.` : ""}</textarea>
                        <button type="submit">Submit</button>
                    </div>
                </form>


            </div>
        );
    }
}

export default Contact;