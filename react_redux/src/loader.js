import React,{Component} from 'react';
import './loader.css';

const Loader=(propName) => (WrappedComp) =>{
    return class Loader extends Component{
        render(){
           
           if(this.props.emps){
               return this.props[propName].length ===0 ? <div className="loader"></div>: 
               <div><h1>inside hoc</h1><WrappedComp className="loader" {...this.props}/></div>
           }else{
            return <div className="loader"></div>
           }
        }
    }
}

export default Loader;