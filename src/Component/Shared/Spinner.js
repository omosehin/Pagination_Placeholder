import React from 'react'
import Spinnergif from '../../Assets/Dual Ring-1s-200px.gif';
import '../App.css'
function Spinner() {
    return (
        <div className='spiningImg'>
            <img src ={Spinnergif} alt = 'loading...' className= 'spinner'/>
        </div>
    )
}

export default  Spinner;