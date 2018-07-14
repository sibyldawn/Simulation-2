import React, {Component} from 'react';
import axios from 'axios';
import { Link,Route } from 'react-router-dom';
import {connect} from 'react-redux';
import WizardTwo from './WizardTwo';
import WizardThree from './WizardThree';
import {updateName, updateAddress, updateCity, updateState, updateZip} from '../../ducks/reducer';
const baseUrl = 'api/houses';

class Wizard extends Component{
    constructor(){
    super();

    this.state={
        name:'',
        address:'',
        city:'',
        state:'',
        zip: 0,
    }

}
    addHouse = () => {
        let newHouse = {
          name: this.props.name,
          address: this.props.address,
          city: this.props.city,
          state: this.props.state,
          zip: this.props.zip
        };
        axios.post(`${baseUrl}`, newHouse).then(response =>{
          console.log('ADD HOUSE',response.data);
          })

        alert(`ADDED HOUSE:${this.props.name}, ${this.props.address},${this.props.city},${this.props.state},${this.props.zip}`);
      }
    
    render(){
    const {updateName, updateAddress, updateCity, updateState, updateZip} = this.props;
        return(
        <div className="render">
            <div className="AddListing">
            <div className="subheader">
            <p>Add New Listing</p>
            <button className="cancel"> 
            <Link to='/dashboard'>Cancel</Link>
            </button>
                </div>
            <hr/>
            <div className="form">
              <p>Property name:</p>
              <input type="text" onChange={(e)=> updateName(e.target.value)}></input>
              <p>Address:</p>
              <input type="text" onChange={(e)=> updateAddress(e.target.value)}></input>
              <p>City:</p>
              <input type="text" onChange={(e)=> updateCity(e.target.value)}></input>
              <p>State:</p>
              <input type="text" onChange={(e)=> updateState(e.target.value)}></input>
              <p>Zip:</p>
              <input type="text" onChange={(e)=> updateZip(e.target.value)}></input><br/>
              <button className="complete" onClick={(e) => this.addHouse(e.target.value)}><Link to="/dashboard">Complete</Link></button>

            </div>
          </div>
        </div>
        )
    }
}

function mapStateToProps(state){
    return{
        name: state.name,
        address: state.address,
        city: state.city,
        state: state.state,
        zip: state.zip,
    }
}

export default connect(mapStateToProps,{updateName, updateAddress, updateCity, updateState, updateZip})(Wizard);

