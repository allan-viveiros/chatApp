import { useState } from "react";

const NewUser = ({handleSubmitNewUser}) => {
    const [newUserName, setNewUserName] = useState("");

    const handleChange = (e) => {
        setNewUserName(e.target.value);
    }

    return (
        <section className="newUser">
            <h2>New User</h2>
            <form className="newUserForm" onSubmit={(e) => handleSubmitNewUser(e, newUserName)}>
                <label htmlFor="newUserName" className="sr-only">User name</label>
                <input 
                    type="text" 
                    id="newUserName" 
                    placeholder="User name"
                    onChange={handleChange}
                    value={newUserName}
                />
                <button>Submit</button>
            </form>
        </section>
    )
}

export default NewUser;
