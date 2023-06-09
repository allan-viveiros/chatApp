import { useState } from "react";

const UserInput = ({ handleSubmit }) => {
    const [userInputText, setUserInputText] = useState("");

    const handleChange = (e) => {
        setUserInputText(e.target.value);
    }
 
    return(
        <section className="userInput">
            
            <form onSubmit={(e) => handleSubmit(e, userInputText, setUserInputText)} className="flexForm">
                <label htmlFor="userMessage" className="sr-only">Type your message</label>
                <textarea 
                    type="text" 
                    id="userMessage" 
                    onChange={handleChange} 
                    value={userInputText}
                />
                <button>Send</button>
            </form>
        </section>
    )
}

export default UserInput;
