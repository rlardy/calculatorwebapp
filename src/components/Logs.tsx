import React, { Component } from 'react';
import {List, ListItem} from "@material-ui/core";
import '../logs.css';
import Firebase from 'firebase/app';
import 'firebase/database';



class Logs extends Component <{}, { elements: any }> {


    constructor(props: {}) {
        super(props);
        //eslint-disable-next-line
        const elements = new Array();
        this.state = {elements};
        const db = Firebase.database();
        const calcRef = db.ref('calculations/');
        calcRef.on('child_added', (data) => {
            // update logs
            let calculation = data.val();
            if(elements.length === 10){
                elements.pop();
                this.setState({elements});
                this.render();
            }
            elements.unshift(calculation);
            console.log(elements);
            this.setState({elements});
            this.render();
        });
    }

    render() {
        return (
            <div className={'logs'}>
                    <h2>Logs</h2>
                <List className={"lis"}>
                    {this.state.elements.map(function(item: string){
                    return <ListItem key={item} className="listItem" align-items={'center'}>{item}</ListItem>;
                })}
                </List>
            </div>
        );
    }
}
export default Logs
