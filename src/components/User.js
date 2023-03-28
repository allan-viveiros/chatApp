import { useState } from "react";
// import NewUser from "./NewUser.js";
// import app from "../firebase.js";
// import { getDatabase, ref, push } from "firebase/database";

const User = ({handleSubmit, userArray}) => {
    const [selectedValue, setSelectedValue] = useState("placeholder");
    // const [newUserSelected, setNewUserSelected] = useState(false);

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
        // console.log(e.target.value);
    }

    // const handleClick = () => {
    //     setNewUserSelected(true);
    // }

    // const handleSubmitNewUser = (e, newUser) => {
    //     e.preventDefault();
    //     console.log(newUser);
    
    //     const db = getDatabase(app);
    //     const dbRef = ref(db, "/users");

    //     const newUserObj = {
    //         name: newUser,
    //         online: true,
    //     }
        
    //     const newUserInput = push(dbRef, newUserObj);
    //     console.log(newUserInput);
    //     // setNewUserName("");
    // }

    return (
        <section className="userSelect">
            {
                
                // newUserSelected === true 
                // ? <NewUser handleSubmit={handleSubmitNewUser} />
                // :   
                
                <form id="userForm" onSubmit={(e) => handleSubmit(e, selectedValue)}>

                    {/* <button onClick={handleClick}>Create a new user</button> */}
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