import React, {Component} from 'react';
import axios from 'axios';
import style from './Dashboard.css';
import {Link} from 'react-router-dom';
import Delete from './Delete';
import { connect } from 'react-redux';
import {pickHouse} from '../../ducks/reducer';
import Header from '../Header/Header';
const baseUrl = 'api/houses';

class Dashboard extends Component{
    constructor(){
        super();

        this.state = {
            listing: [],
            house:''
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
            return <div className="product-box-flex" key={r.id}>
                    <div className="details-wrap">
                     <p>Property name: {r.name} </p>
                     <p>Address: {r.address}</p>
                    <p>City: {r.city}</p>
                    <p>State:{r.state}</p>
                    <p>Zip:{r.zip}</p>
                    <Delete id={r.id}
                    action={()=> this.deleteHouse(r.id)}/>
                    </div>
                </div>
        })
     return(
        
        <div className="render">
            <div className="subheader">
                     <h1>Dashboard</h1>
                     <button className="add"> 
                     <Link to='/wizard'>Add New Property</Link>
                     </button>
            </div>
             <hr/>
            {listing}
           
        </div>
    
     )
        
    }
}


 function mapStateToProps(state){
    return{
        id: state.id
    }
}

export default connect(mapStateToProps,{pickHouse})(Dashboard);