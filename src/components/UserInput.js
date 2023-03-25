import { useState } from "react";

const UserInput = ({ handleSubmit }) => {
    const [userInputText, setUserInputText] = useState("");

    const handleChange = (e) => {
        setUserInputText(e.target.value);
        console.log(e.target.value);
    }

    return(
        <section>
            <h3>Type your message</h3>
            <form onSubmit={(e) => handleSubmit(e, userInputText)}>
                <label htmlFor="userMessage">Message:</label>
                <input 
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
