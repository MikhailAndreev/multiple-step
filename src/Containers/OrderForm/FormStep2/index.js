import React, { Component } from 'react';
import styles from "../OrderForm.module.css";
import FormInput from "../../../MuiComponents/FormInput";
import FormButton from "../../../MuiComponents/FormButton";
import axios from "axios";
import countries from "../../../Assets/Countries/countries";
import CountryAutosuggest from "../../../MuiComponents/CountryAutosuggest";

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

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

class FormStep2 extends Component {
    constructor(props){
        super(props);

        this.state = {
            error: false,
            step2FullName:null,
            email:null,
            billingStreet:null,
            billingSuite:'',
            billingCity:null,
            billingCountry:'',
            billingZip:null,
            formErrors: {
                step2FullName:'',
                email:'',
                billingStreet:'',
                billingCity:'',
                billingCountry:'',
                billingZip:'',
            },
        };
        this.handleChangeStep2 = this.handleChangeStep2.bind(this);
        this.submitStep2 = this.submitStep2.bind(this);
        this.getSameInfo = this.getSameInfo.bind(this);
        this.getAddress = this.getAddress.bind(this);
        this.getCountry = this.getCountry.bind(this);
    }

    handleChangeStep2(event) {
        const {name, value} = event.target;
        let formErrors = {...this.state.formErrors};

        switch (name) {
            case 'step2FullName' :
                formErrors.step2FullName =
                    value.length === 0
                        ? 'Please enter recepient full name'
                        : '';
                break;
            case 'email' :
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
                break;
            case 'billingStreet' :
                formErrors.billingStreet =
                    value.length === 0
                        ? 'Field is required'
                        : '';
                break;
            case 'billingCity' :
                formErrors.billingCity =
                    value.length === 0
                        ? 'Field is required'
                        : '';
                break;
            case 'billingCountry' :
                formErrors.billingCountry =
                    value.length === 0
                        ? 'Field is required'
                        : '';
                break;
            case 'billingZip' :
                formErrors.billingZip =
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

    submitStep2=(e)=>{
        e.preventDefault();

        if(formValid(this.state) ){
            console.log('ITS OK !');
            this.setState({
                error: false,
            },  () => {
                this.props.validCheck('false');
            });
            localStorage.setItem('email', this.state.email)

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

    getSameInfo=()=>{
        let fullName =  localStorage.getItem('fullName');
        let daytimeTel =localStorage.getItem('daytimeTel');
        let street =localStorage.getItem('street');
        let suite =localStorage.getItem('suite');
        let city =localStorage.getItem('city');
        let country =localStorage.getItem('country');
        let zipCode =localStorage.getItem('zipCode');
        this.setState({
            step2FullName:fullName,
            billingStreet:street,
            billingSuite:suite,
            billingCity:city,
            billingCountry:country,
            billingZip:zipCode,
        })
    };

    getAddress=()=>{
        const location = window.navigator && window.navigator.geolocation;
        if (location) {
            location.getCurrentPosition((position) => {
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;

                axios
                    .get('https://eu1.locationiq.com/v1/reverse.php', {
                        params: {
                            format: "json",
                            key: '4229d2804900cd',
                            lat: latitude,
                            lon: longitude,
                        },
                    })
                    .then((response)=> {
                        let street = response.data.address.road;
                        let suite = response.data.address.house_number;
                        let city = response.data.address.city;
                        let country = response.data.address.country;
                        let zipCode = response.data.place_id;

                        this.setState({
                            billingStreet: street,
                            billingCity: city,
                            billingSuite: suite,
                            billingCountry: country,
                            billingZip: zipCode
                        });
                        console.log(response)
                    })
                    .catch((error) =>{
                        console.log(error)
                    })
            }, (error) => {
                this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
            })
        }
    };

    getCountry=(country)=>{
        this.setState({
            billingCountry: country
        })
    };


    render() {
        const {formErrors, error, step2FullName, email, billingStreet, billingCity, billingSuite, billingCountry, billingZip} = this.state;
        return (
            <div>
                <div className={styles.wrapper}>

                    <form>

                        <div className={styles.billingTitle}>
                            <h1>
                                Billing information
                            </h1>
                            <p onClick={this.getSameInfo}>Same as shipping</p>
                        </div>

                        <fieldset>
                            <legend>Billing Contact</legend>
                            {error && step2FullName === null ?
                                <span className={styles.errorMsgStep2}>
                                Recipient full name is required
                                </span>
                                :
                                ''
                            }
                            {formErrors.step2FullName.length > 0  &&
                            <span className={styles.errorMsgStep2}>
                                Recipient full name is required
                                </span>}
                            <FormInput
                                value={step2FullName}
                                handleChange={this.handleChangeStep2}
                                name='step2FullName'
                                placeholder='Full Name'
                                classname={`${formErrors.step2FullName.length > 0 ? styles.errorInput : styles.userName} 
                                     ${error && step2FullName === null ? styles.errorInput : styles.userName}`}
                            />

                            {error && email === null ?
                                <span className={styles.emailInvalid}>
                                Invalid email address
                                </span>
                                :
                                ''
                            }
                            {formErrors.email.length > 0  &&
                            <span className={styles.emailInvalid}>
                                Invalid email address
                                </span>}
                            <FormInput
                                value={email}
                                handleChange={this.handleChangeStep2}
                                name='email'
                                placeholder='Email Address'
                                classname={`${formErrors.email.length > 0 ? styles.errorInput : styles.formInput} 
                                    ${error && email === null ? styles.errorInput : styles.formInput}`}
                            />
                        </fieldset>

                        <fieldset>
                            <legend>Billing Address</legend>
                            <FormInput
                                value={billingStreet}
                                handleChange={this.handleChangeStep2}
                                name='billingStreet'
                                placeholder='Street Address'
                                classname={`${formErrors.billingStreet.length > 0 ? styles.errorInput : styles.formInput} 
                                    ${error && billingStreet === null ? styles.errorInput : styles.formInput}`}
                            />

                            <FormInput
                                value={billingSuite}
                                handleChange={this.handleChangeStep2}
                                name='billingSuite'
                                placeholder={'Apt, Suite, Bldg, Gate Code. (optional)'}
                            />

                            <FormInput
                                value={billingCity}
                                handleChange={this.handleChangeStep2}
                                name='billingCity'
                                placeholder='City'
                                classname={`${formErrors.billingCity.length > 0 ? styles.errorInput : styles.formInput} 
                                    ${error && billingCity === null ? styles.errorInput : styles.formInput}`}
                            />
                            <i onClick={this.getAddress} className={styles.geocode}></i>
                            <div className={styles.country}>

                                <CountryAutosuggest
                                    style={`${formErrors.billingCountry.length > 0 ? styles.errorInputCountry : styles.inputCountry}
                                             ${error && billingCountry === '' ? styles.errorInputCountry : styles.inputCountry}`}
                                    suggestions={countries}
                                    getCountry={this.getCountry}
                                    value={billingCountry}
                                    name='country'
                                />


                                <FormInput
                                    value={billingZip}
                                    handleChange={this.handleChangeStep2}
                                    name='billingZip'
                                    placeholder='ZIP'
                                    classname={`${formErrors.billingZip.length > 0 ? styles.errorUserZip : styles.userZip}
                                ${error && billingZip === null ? styles.errorUserZip : styles.userZip}`}
                                />
                            </div>
                        </fieldset>

                        <FormButton
                            handleClick={this.submitStep2}
                            name='Continue'
                            style={styles.continueBtn}
                        />
                    </form>

                </div>
            </div>
        );
    }
}

export default FormStep2;

