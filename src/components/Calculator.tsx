import React, { Component } from 'react';
import {Button, TextField} from "@material-ui/core";
import { create, all } from 'mathjs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Firebase from 'firebase/app';

const notify = () => toast("ERROR: Invalid Math Expression - Please try again.");
const config = { };
const math = create(all, config);

class Calculator extends Component <{}, { lhs: string }> {


    constructor(props: {open: boolean}) {
        super(props);
        this.state = {lhs: ''};
    }
    // Handle user input in Text Field
    handleChange = (event: { target: { value: any; }; }) => {
        this.setState({lhs: event.target.value});
    }
    handleClick = () => {
        console.log("LHS: " + this.state.lhs);
        let valid = true;
        let answer = null;
        try {
            // @ts-ignore
            answer = math.evaluate(this.state.lhs);
            console.log(answer);

        }catch (e) {
            // show toast (incorrect math)
            valid = false;
            console.error(e);
            notify();
        }
        // post to firebase
        if (valid) {
            try {
                let calculation = this.state.lhs + " = " + answer;
                this.postCalculation(calculation);
            } catch (e) {
                console.error(e);
            }
        }
    }
    postCalculation(calculation: string){
        const db = Firebase.database();
        const data = calculation;
        db.ref('calculations/').push(data);
    }

    render() {
        return (
            <div className={'calculator'}>
                <h2>Calculator</h2>
                <div className={"header"}>
                    <TextField className="TextField" value={this.state.lhs} onChange={this.handleChange}
                               label="Enter Left-Hand Side of Calculation" variant="outlined"/>
                    <Button className='btn' variant="contained" onClick={this.handleClick}>Calculate</Button>

                </div>
                <ToastContainer />
            </div>
        );
    }


}
export default Calculator
