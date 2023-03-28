import { useState } from "react";

const UserToTalk = ({userArray, handleSubmit}) => {
    const [selectedValue, setSelectedValue] = useState("placeholder");

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
    }

    return(
        <div className="userToTalk">
            <h2> Select an user to Talk </h2>
            <form id="userToTalkForm" onSubmit={(e) => handleSubmit(e, selectedValue)}>

                <label htmlFor="selectUser" className="sr-only">Select an user to talk with</label>
                <select id="selectUser" onChange={handleChange} value={selectedValue} onSelect={(e) => handleSubmit(e, selectedValue)}>
                    <option value="placeholder"> Select an user to talk with</option>
                    {
                        userArray.map((user) => {                            
                            return(   
                                user.online === false
                                ?   <option key={user.userId} value={user.userId} className="online">{user.name}</option>
                                :   <option key={user.userId} value={user.userId} className="offline">{user.name}</option>
                            )                            
                        })
                    }                    

                </select>
                <button>Go Chat</button>
            </form>
        </div>
    )
}

export default UserToTalk;
