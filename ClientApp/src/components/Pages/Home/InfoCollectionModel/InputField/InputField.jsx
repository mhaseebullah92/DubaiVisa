import { GrLocation } from "react-icons/gr";
import './inputField.css'

const Input = ({type,placeholder,name,value,onChange,error=false,iconName,disable=false}) => {
    return (
        <section className="secInput">
                <div className={`InputDiv grid ${error ? 'errorDisp' : ''}`}>
                        <div className="input flex">
                            <input type={type} placeholder={placeholder}
                                value={value}
                                name={name}
                                onChange={onChange}
                                disabled={disable}
                            />
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