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

        //Get the users
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
            }
        });
    }, []);

    // Use an useEffect hook to manipulate the virtual dom instead the dom itself
    window.addEventListener("beforeunload", (e) => {
        if(userSelected.userId !== undefined) {
            console.log(userSelected.userId);
            const db = getDatabase(app);
            const dbRef = ref(db, `/users/${userSelected.userId}`);
            const userUpdate = { online: false }
            update(dbRef, userUpdate);  
        }
    });

    // console.log(users);
    const handleSubmitForm = (e, userId) => {
        e.preventDefault();
  
        if(userId !== "placeholder") {
            // setUserSelected(userId);
            console.log(userId);

            setRenderComponent("chat");

            /// ********************* activate after tests ********** ////
            //update the user selected to online status
            const db = getDatabase(app);
            const dbRef = ref(db, `/users/${userId}`);
            const userUpdate = { online: true }
            update(dbRef, userUpdate);            

            for(let key in users) {
                // console.log(users[key].userId);
                if(users[key].userId === userId) {
                    // console.log(users[key]);
                    setUserSelected(users[key]);
                }
                // else {
                //     console.log("NO Match");
                // }
            }
        }
        else {
            alert("Please, select an user!");
        }        
    }


    useEffect(() => {
        console.log("userSelect changed");
        console.log(userSelected);

    }, [userSelected]);

    const handleClick = () => {
        // setNewUserSelected(true);
        setRenderComponent("newUser");
    }

    const handleSubmitNewUserForm = (e, newUser) => {
        e.preventDefault();
        console.log(newUser);

        const db = getDatabase(app);
        const dbRef = ref(db, "/users");

        const newUserObj = {
            name: newUser,
            online: true,
        }
        
        // setUserSelected(newUserObj);

        const newUserInput = push(dbRef, newUserObj);
        console.log(newUserInput);
        console.log(newUserInput._path.pieces_[1]);
        console.log(userSelected);

        newUserObj.userId = newUserInput._path.pieces_[1];
        console.log(newUserObj);

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
