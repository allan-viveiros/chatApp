import { useState } from "react";

const UserToTalk = ({userArray, handleSubmit}) => {
    const [selectedValue, setSelectedValue] = useState("placeholder");

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
        // console.log(e.target.value);
    }

    // console.log(userArray);

    return(
        <section>
            <h2> Select an user to Talk </h2>
            <form id="userToTalkForm" onSubmit={(e) => handleSubmit(e, selectedValue)}>

                <label htmlFor="selectUser"></label>
                <select id="selectUser" onChange={handleChange} value={selectedValue}>
                    <option value="placeholder"> Select an user to talk with</option>
                    {
                        userArray.map((user) => {                            
                            return(                                 
                                <option key={user.userId} value={user.userId}>{user.name}</option>                                
                            )                            
                        })
                    }                    

                </select>
                <button>Go chat</button>
            </form>
        </section>
    )
}

export default UserToTalk;
