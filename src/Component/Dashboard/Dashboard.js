import React, {Component} from 'react';
import axios from 'axios';
import style from './Dashboard.css';
import {Link, Route, Switch} from 'react-router-dom';
import Delete from './Delete';
import { connect } from 'react-redux';
import {pickHouse} from '../../ducks/reducer';
import DreamHouse from './DreamHouse';
import DreamHouse2 from './DreamHouse2';
import DreamHouse3 from './DreamHouse3';
const baseUrl = 'api/houses';

class Dashboard extends Component{
    constructor(){
        super();

        this.state = {
            listing: [],
            id:''
        }
        this.deleteHouse = this.deleteHouse.bind(this);
    }
    
    componentDidMount(){
        axios.get(`${baseUrl}`).then( response => {
            console.log('------getListing', response.data)
            this.setState({
                listing: response.data
            })
        })
    }

    deleteHouse(id){
        axios.delete(`${baseUrl}/${id}`).then(response => {
            this.setState({
                listing: response.data
            })
        })
    }

    render(){
        const listing = this.state.listing.map( r => {
            return <div className="product-box" key={r.id}>
                    <div className="details-wrap">
                     <p>Property name: {r.name} </p>
                     <p>Address: {r.address}</p>
                    <p>City: {r.city}</p>
                    <p>State:{r.state}</p>
                    <p>Zip:{r.zip}</p>
                </div>
            <Delete id={r.id}
            action={()=> this.deleteHouse(r.id)}/>
          </div>
        })
     return(
        <div className="render">
            <div className="subheader">
                     <p>Dashboard</p>
                     <button className="add"> 
                     <Link to='/wizard'>Add New Property</Link>
                     </button>
                     <select onChange={(e) => pickHouse(e.target.value)}>
                     
                        <option value="House 1"><Link to='/dreamhouse/1'>House 1</Link></option>
                        <option value="House 2"><Link to='/dreamhouse/2'>House 2</Link></option>
                        <option value="House 3"><Link to='/dreamhouse/3'>House 3</Link></option>

                     </select>
                
                    <Route path = '/dreamhouse/:id' component = {Child}/>
       
                    
            </div>
             <hr/>
            {listing}
           
        </div>
     )
        
    }
}
const Child = ({match}) => (
    <div>
        <h3>CONGRATULATIONS YOU WON {match.params.id}!</h3>
    </div>
)

 function mapStateToProps(state){
    return{
        id: state.id
    }
}

export default connect(mapStateToProps,{pickHouse})(Dashboard);