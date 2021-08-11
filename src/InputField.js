import './App.css';
import React from 'react';

class InputField extends React.Component {
    render() {
        return (
            <div className="inputField" data-tooltip title="Field should not be empty!!!!!">
                                            
                <input
                    className='input'
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    onChange={(e) => { this.props.onChange(e.target.value) }}
                    value={this.props.value}
                    
                />
                

             </div>
        );
    }
}

export default InputField;
