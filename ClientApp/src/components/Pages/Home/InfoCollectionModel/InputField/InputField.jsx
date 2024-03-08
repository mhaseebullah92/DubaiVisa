import { GrLocation } from "react-icons/gr";
import './inputField.css'

const Input = ({type,placeholder,name,value,onChange,error=false,iconName,disable=false}) => {
    return (
        <section className="secInput">
                <div className={`InputDiv grid ${error ? 'errorDisp' : ''}`}>
                        <div className="input flex">
                            {
                            type == 'date'?
                            <input type='text' placeholder={placeholder}
                                value={value}
                                name={name}
                                onChange={onChange}
                                disabled={disable}
                                onFocus={(e) => e.target.type = 'date'} // Change type to 'date' when focused
                                onBlur={(e) => e.target.type = 'text'}  // Change type back to 'text' when blurred
                            />:
                            <input type={type} placeholder={placeholder}
                                value={value}
                                name={name}
                                onChange={onChange}
                                disabled={disable}
                            />
                            }
                            {
                                ()=>{
                                    if(iconName ==='location-icon'){                                       
                                        return(<GrLocation className="icon" />)
                                    }
                                    else{
                                        return('')
                                    }
                                }
                            }
                        </div>
                </div>
        </section>
    )
}

export default Input;