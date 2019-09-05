import React, { Component } from 'react';
import styles from "../OrderForm.module.css";
import FormInput from "../../../MuiComponents/FormInput";
import FormButton from "../../../MuiComponents/FormButton";
import axios from 'axios';
import CountryAutosuggest from "../../../MuiComponents/CountryAutosuggest";
import countries from "../../../Assets/Countries/countries";






// проверка формы на валидность
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

class FormStep1 extends Component {
    constructor(props){
        super(props);

        this.state = {
            latitude: 0,
            longitude:0,
            step: 1,
            error: false,
            fullName:null,
            daytimeTel:null,
            street:null,
            suite:'',
            city:null,
            country:'',
            zipCode:null,
            formErrors: {
                fullName:'',
                daytimeTel:'',
                street:'',
                city:'',
                country:'',
                zipCode:'',
            },

        };
        this.handleChange = this.handleChange.bind(this);
        this.submitStep1 = this.submitStep1.bind(this);
        this.getAddress = this.getAddress.bind(this);
        this.getCountry = this.getCountry.bind(this);
    }

    //получаем значение страны для того что бы передать его в стейт, так как компонент CountryAutosuggest отдельный коипонент
    getCountry=(country)=>{
        this.setState({
            country: country
        })
    };

    // определяем широту и долготу
    // передаем их и формат в котором должен прийти ответ в параметрах в get запросе axios
    // получаем и записываем значения полного адреса в state
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
                            street: street,
                            city: city,
                            suite: suite,
                            country: country,
                            zipCode: zipCode
                        });
                        console.log(country)
                    })
                    .catch((error) =>{
                        console.log(error)
                    })
            }, (error) => {
                this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
            })
        }
        };

    // переключаемся между инпутами и если значение пустое то добавляем в formErrors
    handleChange(event) {
        const {name, value} = event.target;
        let formErrors = {...this.state.formErrors};

        switch (name) {
            case 'fullName' :
                formErrors.fullName =
                    value.length === 0
                        ? 'minimum 3 characters required'
                        : '';
                break;
            case 'daytimeTel' :
                formErrors.daytimeTel =
                    value.length === 0
                        ? 'minimum 3 characters required'
                        : '';
                break;
            case 'street' :
                formErrors.street =
                    value.length === 0
                        ? 'minimum 3 characters required'
                        : '';
                break;
            case 'city' :
                formErrors.city =
                    value.length === 0
                        ? 'minimum 3 characters required'
                        : '';
                break;
            case 'country' :
                formErrors.country =
                    value.length === 0
                        ? 'minimum 3 characters required'
                        : '';
                break;
            case 'zipCode' :
                formErrors.zipCode =
                    value.length === 0
                        ? 'minimum 3 characters required'
                        : '';
                break;
            default:
                break;
        }
        this.setState({
            formErrors, [name]:value
        })
    }

    // проверяем форму на валидность
    // если валидация пройдена записываем значение в LocalStorage
    // если нет, то передаем в OrderForm контейнер значение с ошибкой, что бы отключит переход к следующему шагу
    submitStep1=(e)=>{
        const {fullName, daytimeTel, street, suite, city, country, zipCode}= this.state;
        e.preventDefault();

        if(formValid(this.state) ){
            console.log('ITS OK !');
            this.setState({
                error: false,
            },  () => {
                this.props.validCheck('false');
            });

            localStorage.setItem('fullName', fullName);
            localStorage.setItem('daytimeTel', daytimeTel);
            localStorage.setItem('street', street);
            localStorage.setItem('suite', suite);
            localStorage.setItem('city', city);
            localStorage.setItem('country', country);
            localStorage.setItem('zipCode', zipCode);

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
        const {formErrors, error, fullName, daytimeTel, street, city, country, zipCode} = this.state;

        return (
            <div>
                <div className={styles.wrapper}>

                    <form  className={styles.formSec}>
                        <h1>
                            Shipping info
                        </h1>
                        <fieldset>
                            {/*Выводим сообщение об ошибке*/}
                            <legend>Recepient</legend>
                            {error && fullName === null ?
                                <span className={styles.errorMsg}>
                                Recipient full name is required
                                </span>
                                :
                                ''
                            }
                            {formErrors.fullName.length > 0  &&
                            <span className={styles.errorMsg}>
                                Recipient full name is required
                                </span>}
                            <FormInput
                                handleChange={this.handleChange}
                                name='fullName'
                                placeholder={'Full Name'}
                                classname={`${formErrors.fullName.length > 0 ? styles.errorInput : styles.userName} 
                            ${error && fullName === null ? styles.errorInput : styles.userName}`}
                            />

                            <div className={styles.phoneSec}>

                                <FormInput
                                    handleChange={this.handleChange}
                                    name='daytimeTel'
                                    placeholder={'Daytime phone'}
                                    mask='8-999-999-99-99'
                                    maskChar=' '
                                    classname={`${formErrors.daytimeTel.length > 0 ? styles.errorInput : styles.userPhone}
                                 ${error && daytimeTel === null ? styles.errorInput : styles.userPhone}`}
                                />
                                <p>
                                    For delivery questions only
                                </p>
                            </div>

                        </fieldset>

                        <fieldset>
                            <legend>Address</legend>
                            <FormInput
                                handleChange={this.handleChange}
                                name='street'
                                value={this.state.street}
                                placeholder='Street Address'
                                // classname={this.state.error ? styles.errorInput : ''}
                                classname={`${formErrors.street.length > 0 ? styles.errorInput : ''}
                             ${error && street === null ? styles.errorInput : ''}`}
                            />

                            <FormInput
                                handleChange={this.handleChange}
                                name='suite'
                                value={this.state.suite}
                                placeholder='Apt, Suite, Bldg, Gate Code. (optional)'
                                // classname={this.state.error ? styles.errorInput : ''}

                            />

                            <FormInput
                                handleChange={this.handleChange}
                                name='city'
                                placeholder='City'
                                value={this.state.city}
                                classname={`${formErrors.city.length > 0 ? styles.errorInput : ''}
                            ${error && city === null? styles.errorInput : ''}`}
                            />

                            <i onClick={this.getAddress} className={styles.geocode}></i>

                            <div className={styles.country}>


                                <CountryAutosuggest
                                   style={`${formErrors.country.length > 0 ? styles.errorInputCountry : styles.inputCountry}
                                             ${error && country === '' ? styles.errorInputCountry : styles.inputCountry}`}
                                    suggestions={countries}
                                    getCountry={this.getCountry}
                                   value={country}
                                   name='country'
                                />


                                <FormInput
                                    handleChange={this.handleChange}
                                    name='zipCode'
                                    placeholder={'ZIP'}
                                    value={this.state.zipCode}
                                    classname={`${formErrors.zipCode.length > 0 ? styles.errorUserZip : styles.userZip}
                                ${error && zipCode === null ? styles.errorUserZip : styles.userZip}`}
                                />

                            </div>

                        </fieldset>



                        <FormButton
                            handleClick={this.submitStep1}
                            name={'Continue'}
                            style={styles.continueBtn}
                        />

                    </form>

                </div>
            </div>
        );
    }
}

export default FormStep1;