import React, { Component } from 'react';
import styles from "../OrderForm.module.css";





class FormSuccess extends Component {
    constructor(props){
        super(props);

        this.state = {
                email:''
        };
    }

    componentDidMount() {
        const email = localStorage.getItem('email')
        this.setState({
            email
        })
    }

    printRecipe=()=>{
        window.print();
    };

    render() {
        const {email}= this.state;
        return (
            <div>
                <div className={styles.wrapper}>

                    <div className={styles.success}>
                      <h1>
                          Thank you for your order !
                      </h1>

                        <p>
                            Order number is: 188787788
                        </p>
                        <p>
                        {/*    прокинуть пропс с мэйлом*/}
                            Your will recieve an email confirmation
                            shortly to <a href="">{email}</a>
                        </p>

                        <p>
                            Estimated delivery Day is <strong>Friday 1st April 2016</strong>
                        </p>

                        <span onClick={this.printRecipe}>
                            Print Recipe
                        </span>
                    </div>

                </div>
            </div>
        );
    }
}

export default FormSuccess;

