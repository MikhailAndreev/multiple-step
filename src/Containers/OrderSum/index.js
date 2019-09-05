import React, { Component } from 'react';
import styles from "./OrderSum.module.css";
import { Link } from 'react-router-dom'
import boots from "../../Assets/images/chelsea-boot.png";
import backpack from "../../Assets/images/backpack.png";
import bag from "../../Assets/images/bag.png";

class OrderSum extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: [],
            notFullAns: false,
        };
    }


    render() {

        return (
            <div>
                <div className={this.props.success ? styles.successWrapper : styles.wrapper}>

                    <div className={styles.cartList}>
                        <div className={styles.cartListTitle}>
                            <h2>Order Summary</h2>
                            <Link to='edit-order'> edit order</Link>
                        </div>

                        <div className={styles.cartListItems}>

                            <div className={styles.cartListItem}>

                                <div className={styles.itemImage}>

                                    <img src={boots} alt=""/>
                                </div>

                                <div className={styles.itemInfo}>
                                        <p> The Chelsea Boot</p>
                                        <span>Black</span>
                                        <span>Quantity: 1</span>
                                </div>

                                <div className={styles.itemPrice}>

                                    <p>
                                        $235
                                    </p>
                                </div>

                            </div>

                            <div className={styles.cartListItem}>

                                <div className={styles.itemImage}>

                                    <img src={backpack} alt=""/>
                                </div>

                                <div className={styles.itemInfo}>
                                    <p> The Twill Snap Backpack</p>
                                    <span>Reverse Denim + Brown leather</span>
                                    <span>Quantity: 1</span>
                                </div>

                                <div className={styles.itemPrice}>

                                    <p>
                                        $65
                                    </p>
                                </div>

                            </div>

                            <div className={styles.cartListItem}>

                                <div className={styles.itemImage}>

                                    <img src={bag} alt=""/>
                                </div>

                                <div className={styles.itemInfo}>
                                    <p> The Twill Zip Tote</p>
                                    <span>Reverse Denim + Black leather</span>
                                    <span>Quantity: 1</span>
                                </div>

                                <div className={styles.itemPrice}>

                                    <p>
                                        $48
                                    </p>
                                </div>

                            </div>

                        </div>

                        <div className={styles.subtotal}>
                            <div>
                                <p>
                                    Subtotal
                                </p>
                                <p>
                                    $398
                                </p>
                            </div>

                            <div>
                                <p>
                                    Shipping
                                </p>

                                <p>
                                    Free
                                </p>
                            </div>

                            <div>
                                <p>
                                    Taxes
                                </p>
                                <p>
                                    $12.12
                                </p>
                            </div>
                        </div>

                        <div className={styles.total}>
                            <p>Total</p>
                            <p>$410.12</p>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

export default OrderSum;