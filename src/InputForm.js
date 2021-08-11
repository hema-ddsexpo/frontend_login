import './App.css';
import React from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import UserInfo from './database/UserInfo';

class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            buttondisabled: false,
            isValidUser:false
        }
    }
    setInputField(property, val) {
        val = val.trim();
        if (val.length > 12) {
            return;
        }
        this.setState({
            [property]: val
        })
    }
    resetForm() {
        this.setState({
            username: '',
            password: '',
            buttondisabled: false
        })
    }
     doLogin() {
        /*if (!this.state.username)
            return;
        if (!this.state.password)
            return;
        this.setState({
            buttondisabled: true
        })*/
        try {

            let res = await fetch('/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                })
            })
            let result = await res.json();
            if (result && result.success) {
                UserInfo.username = result.username;
                this.setState({
                    isValidUser:true
                });
                

            }
            else if (result && result.success === false) {
                this.setState({
                    isValidUser:false,
                    buttondisabled:true
                });
               
            }
        }
        catch (e) {

            console.log(e);
        }

    }

    
    render() {
        if(this.state.isValidUser){
           return(
               
                <div className="container">
                    <label className="labelName">WELCOME {this.state.username} !!!!!</label>
                    <SubmitButton
                        className='btn'
                        text='Log Out'
                        disabled={false}
                        onClick={()=>this.setState({buttondisabled:false,isValidUser:false,username:'',password:''})}
                    />
                </div>
           )
        }
            
            if(this.state.username.length>0 && this.state.buttondisabled) {
                console.log(this.state.username.length)
                console.log(this.state.buttondisabled)
                return(
                
                     <div className="container">
                             <label className="labelName">Sorry {this.state.username} !! not a valid user. Please Try Again</label>
                             <SubmitButton
                               className='btn'
                               text='Try Again'
                               disabled={false}
                               onClick={()=>this.setState({buttondisabled:false,isValidUser:false,username:'',password:''})}

                             />
                    </div>
                 ) 

             }
       
        
        return (
            <div className="container" >
                <div className='inputForm'>
                    <InputField
                        type='text'
                        placeholder='UserName'
                        value={this.state.username ? this.state.username : ''}
                        onChange={(val) => this.setInputField('username', val)}
                    />
                    <InputField
                        type='password'
                        placeholder='Password'
                        value={this.state.password ? this.state.password : ''}
                        onChange={(val) => this.setInputField('password', val)}
                    />
                    <SubmitButton
                        text='LogIn'
                        type={this.state.buttondisabled?'btndisabled':'btn'}
                        disabled={this.state.buttondisabled}
                        onClick={() => this.doLogin()}
                    />
                   
                </div>
            </div>
        );
    }
}

export default InputForm;
