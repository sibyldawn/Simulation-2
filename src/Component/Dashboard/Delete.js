import React, {Component} from 'react';

export default function Delete(props){
    return(
        <div>
           <button id="x" onClick={props.action}>X</button>
        </div>
    )
}