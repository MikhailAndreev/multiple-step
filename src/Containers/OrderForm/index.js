import React, { Component } from 'react';
import styles from "./OrderForm.module.css";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";
import FormSuccess from "./FormSuccess";

//Контейнер который управляет переключениями между шагами
class OrderForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            step: 1,
            error: false,
        };
        this.validCheck = this.validCheck.bind(this);
    }

      //проверка на валидность формы, пропустить к следующему шагу или нет
      validCheck=(errorMsg)=>{
        if(errorMsg === 'false'){

            this.setState({
                step: this.state.step + 1
            }, () => {
                this.props.getSuccess(this.state.step);
            });
            console.log('asdada')
        }
        if(errorMsg === 'true'){
            this.setState({
                error: true
            });
            console.log('asdada')
        }

    };

    render() {
        return (
            <div>
                <div className={styles.wrapper}>

                    {this.state.step <= 3 &&
                    <div className={styles.steps}>
                        <p className={this.state.step === 1 ? styles.activStep : styles.disableStep}>Shipping</p>
                        <p className={this.state.step === 2 ? styles.activStep : styles.disableStep}>Billing</p>
                        <p className={this.state.step === 3 ? styles.activStep : styles.disableStep}>Payment</p>
                    </div>
                    }

                    {this.state.step === 1 &&

                        <FormStep1
                        validCheck={this.validCheck}
                        />
                    }

                    {this.state.step === 2 &&
                        <FormStep2
                         validCheck={this.validCheck}
                        />
                    }

                    {this.state.step === 3 &&

                      <FormStep3
                        validCheck={this.validCheck}
                      />

                    }

                    {this.state.step === 4 &&

                    <FormSuccess
                    />

                    }

                </div>
            </div>
        );
    }
}

export default OrderForm;

