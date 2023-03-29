import { useEffect, useState } from "react";
import app from "../firebase.js";
import { getDatabase, onValue, ref, update,push } from "firebase/database";
import User from "./User.js";
import ChatContainer from "./ChatContainer.js";
import NewUser from "./NewUser.js";

const UserContainer = () => {
    const [users, setUsers] = useState([]);
    const [userSelected, setUserSelected] = useState("");
    const [renderComponent, setRenderComponent] = useState("all");

    useEffect(() => {
        const db = getDatabase(app);
        const dbRef = ref(db, "/users");

        //Get the users to fill the input selection
        onValue(dbRef, (respDB) => {
            if(respDB.exists()) {
                const userObj = respDB.val();    
                const arrayOfUsers = [];

                for(let id in userObj) {
                    const arrayOfUserChats = [];                    
                    const userChats = userObj[id].chats;
                    
                    if(userObj[id].online === false) {
                        if(userChats) {                        
                            for(let index in userChats) {
                                const newUserObjChat = {
                                    chatId: userChats[index].chatId,
                                    userId: userChats[index].userId
                                }
    
                                arrayOfUserChats.push(newUserObjChat);
                            }
                        }
    
                        const newUserObj = {
                            userId: id,
                            name: userObj[id].name,
                            photo: userObj[id].photo,
                            online: userObj[id].online,
                            chats: arrayOfUserChats
                        }
    
                        arrayOfUsers.push(newUserObj);
                    }
                }

                setUsers(arrayOfUsers);                           
            }
            else {
                alert("There is no users to show!");

                setRenderComponent("newUser");
            }
        });
    }, []);

    // Use an useEffect hook to manipulate the virtual dom instead the dom itself
    window.addEventListener("beforeunload", (e) => {
        if(userSelected.userId !== undefined) {
            const db = getDatabase(app);
            const dbRef = ref(db, `/users/${userSelected.userId}`);
            const userUpdate = { online: false }
            update(dbRef, userUpdate);  
        }
    });

    // Get the user selected to start chatting 
    const handleSubmitForm = (e, userId) => {
        e.preventDefault();
  
        if(userId !== "placeholder") {
            setRenderComponent("chat");

            //update the user selected to online status
            const db = getDatabase(app);
            const dbRef = ref(db, `/users/${userId}`);
            const userUpdate = { online: true }
            update(dbRef, userUpdate);            

            for(let key in users) {
                if(users[key].userId === userId) {
                    setUserSelected(users[key]);
                }
            }
        }
        else {
            alert("Please, select an user!");
        }        
    }

    // Handle the new user button click to render the NewUser component
    const handleClick = () => {
        setRenderComponent("newUser");
    }

    // Get the new user from NewUser component and push() to firebase
    const handleSubmitNewUserForm = (e, newUser) => {
        e.preventDefault();

        const db = getDatabase(app);
        const dbRef = ref(db, "/users");

        const newUserObj = {
            name: newUser,
            online: true,
        }

        // TODO - Make an Error handle to push
        const newUserInput = push(dbRef, newUserObj);
        newUserObj.userId = newUserInput._path.pieces_[1];  

        setUserSelected(newUserObj);
        setRenderComponent("chat");
    }

    return (
        <section className="userContainer">
            <h1>Chat Robots</h1>          
            
            <div className="wrapper">             
                {
                    renderComponent === "all"
                    ?<div>
                        <button onClick={handleClick}>Create a new user</button> 
                        <User handleSubmit={handleSubmitForm} userArray={users} />

                     </div>                       
                    :   renderComponent === "newUser"
                        ? <NewUser handleSubmitNewUser={handleSubmitNewUserForm} />
                        : <ChatContainer userSender= {userSelected}/>
                }
            
            </div>            
        </section>
    )
}

export default UserContainer;
