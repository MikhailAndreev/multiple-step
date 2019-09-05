import React, { Component } from 'react';
import styles from "./OrderCart.module.css";
import OrderForm from "../OrderForm";
import OrderSum from "../OrderSum";
import group3 from '../../Assets/images/Group3.png'
import header from '../../Assets/images/header.png'

class OrderCart extends Component {
    constructor(props){
        super(props);

        this.state = {
            success: false,
        };
        this.getSuccess = this.getSuccess.bind(this)
    }

    getSuccess=(step)=> {
        if(step > 3){
            this.setState({
                success: true
            })
            console.log(step)
        }else {
            this.setState({
                success: false
            })
        }

    };

    render() {
            const {success} = this.state;
        return (
            <div>
                <div className={styles.wrapper}>

                    <div className={styles.header}>
                        <div className={styles.title}>
                            <div className={styles.titleHeader}>
                                <img className={styles.img1} src={group3} alt=""/>
                                <img className={styles.img2} src={header} alt=""/>
                            </div>


                           <div className={styles.cart}>
                               <p>cart</p>
                               {!success && <span>3</span>}

                           </div>
                        </div>
                    </div>

                    <div className={styles.orderInfo}>
                        <OrderForm
                        getSuccess={this.getSuccess}
                        />
                        <OrderSum
                        success={this.state.success}
                        />
                    </div>

                </div>
            </div>
        );
    }
}

export default OrderCart;