import React, {Component} from 'react';
import axios from 'axios';
import { Link,Switch,Route } from 'react-router-dom';
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
        zip: '',
    }
    }

    addHouse=()=>{
        let newHouse = {
            name: this.state.name,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
        };
        axios.post(`${baseUrl}`, newHouse).then(response => {
            mapStateToProps(response);
        })
        console.log('newHouse', newHouse)
        console.log('updatedState', this.state)
        alert('House Added!', this.state);
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
              <button className="complete" onClick={this.addHouse}>Complete</button>
              <Link to="/WizardTwo">Next</Link>

              <Switch>
                 <Route path='/wizard/Two' component={WizardTwo}/>
                 <Route path='/wizard/Three' component={WizardThree}/>
                 
            </Switch> 
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

