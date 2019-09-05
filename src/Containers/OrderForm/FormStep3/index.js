import React, { Component } from 'react';
import styles from "../OrderForm.module.css";
import FormInput from "../../../MuiComponents/FormInput";
import FormButton from "../../../MuiComponents/FormButton";



const formValid = ({formErrors, ...rest}) => {
    let valid = true;

    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    Object.values(rest).forEach(val => {
        val === null && (valid = false)
    });

    return valid;
};

class FormStep3 extends Component {
    constructor(props){
        super(props);

        this.state = {
            error: false,
            cardHolder:null,
            cardNumber:null,
            expDate:null,
            secCode:null,
            formErrors: {
                cardHolder:'',
                cardNumber:'',
                expDate:'',
                secCode:'',
            },
        };
        this.handleChangeStep3 = this.handleChangeStep3.bind(this);
        this.submitStep3 = this.submitStep3.bind(this);
    }

    handleChangeStep3(event) {
        const {name, value} = event.target;
        let formErrors = {...this.state.formErrors};

        switch (name) {
            case 'cardHolder' :
                formErrors.cardHolder =
                    value.length === 0
                        ? 'Please enter recepient full name'
                        : '';
                break;
            case 'cardNumber' :
                formErrors.cardNumber =
                    value.length === 0
                        ? 'Field is required'
                        : '';
                break;
            case 'expDate' :
                formErrors.expDate =
                    value.length === 0
                        ? 'Field is required'
                        : '';
                break;
            case 'secCode' :
                formErrors.secCode =
                    value.length === 0
                        ? 'Field is required'
                        : '';
                break;
            default:
                break;
        }
        this.setState({
            formErrors, [name]:value
        })
    }

    submitStep3 =(e)=>{
        e.preventDefault();

        if(formValid(this.state) ){
            console.log('ITS OK !');
            this.setState({
                error: false,
            },  () => {
                this.props.validCheck('false');
            });

        } else {
            this.setState({
                error:true,
            }, () => {
                this.props.validCheck('true');
            });
            console.log('there is an error !')
        }
        console.log(this.state.formErrors)

    };

    render() {
        const {formErrors, error, cardHolder, cardNumber, expDate, secCode} = this.state;
        return (
            <div>
                <div className={styles.wrapper}>

                    <form>
                        <h1>
                            Payment
                        </h1>
                        <div className={styles.secureInf}>
                            <p>
                                This is a secure 128-bit SSL encrypted payment
                            </p>
                        </div>
                        <fieldset>
                            <legend>Cardholder Name</legend>
                            {error && cardHolder === null ?
                                <span className={styles.errorMsg3}>
                                Cardholder Name is required
                                </span>
                                :
                                ''
                            }
                            {formErrors.cardHolder.length > 0  &&
                            <span className={styles.errorMsg3}>
                                Cardholder Name is required
                                </span>}
                            <FormInput
                                handleChange={this.handleChangeStep3}
                                name='cardHolder'
                                placeholder='Name as it appears on your card'
                                classname={`${formErrors.cardHolder.length > 0 ? styles.errorInput : styles.formInputCardHolder} 
                                     ${error && cardHolder === null ? styles.errorInput : styles.formInputCardHolder}`}

                            />
                        </fieldset>

                        <fieldset>
                            <legend>Card Number</legend>
                            <FormInput
                                handleChange={this.handleChangeStep3}
                                name='cardNumber'
                                placeholder='XXXX XXXX XXXX XXXX'
                                mask='9999-9999-9999-9999'
                                maskChar=''
                                classname={`${formErrors.cardNumber.length > 0 ? styles.errorInput : styles.formInput} 
                                     ${error && cardNumber === null ? styles.errorInput : styles.formInput}`}
                            />

                            <div className={styles.cardInf}>
                                <FormInput
                                     handleChange={this.handleChangeStep3}
                                    label='Expire Date'
                                    name='expDate'
                                    placeholder='MM/YY'
                                     mask='99/99'
                                     maskChar='-'
                                    classname={`${formErrors.expDate.length > 0 ? styles.errExpDate : styles.expDate} 
                                     ${error && expDate === null ? styles.errExpDate : styles.expDate}`}
                                />

                                <FormInput
                                    handleChange={this.handleChangeStep3}
                                    label='Security Code'
                                    name='secCode'
                                    classname={`${formErrors.secCode.length > 0 ? styles.errSecCode : styles.secCode} 
                                     ${error && secCode === null ? styles.errSecCode : styles.secCode}`}
                                />
                            </div>
                        </fieldset>
                        <FormButton
                            handleClick={this.submitStep3}
                            name='Pay Securely'
                            style={styles.continueBtn}
                        />
                    </form>

                </div>
            </div>
        );
    }
}

export default FormStep3;

