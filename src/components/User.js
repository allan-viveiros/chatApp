import { useState } from "react";

const User = ({handleSubmit, userArray}) => {
    const [selectedValue, setSelectedValue] = useState("placeholder");

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
    }

    // Show all users which wasn't taken 
    return (
        <section className="userSelect">
            {
                <form id="userForm" onSubmit={(e) => handleSubmit(e, selectedValue)}>
                    <h2>Select your user to start the chat</h2>

                    <label htmlFor="selectUser" className="sr-only">Select user</label>
                    <select id="selectUser" onChange={handleChange} value={selectedValue}>
                        <option value="placeholder"> Select your user to start the chat</option>
                        {
                            userArray.map((user) => {
                                return(
                                    user.online === false 
                                    ?   <option key={user.userId} value={user.userId}>{user.name}</option>
                                    : null
                                )                            
                            })
                        }
                    </select>

                    <button type="submit" id="btnStartChat">Start chat</button>
                </form>
            }            
        </section>
    )
}

export default User;