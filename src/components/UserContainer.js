import { useEffect, useState } from "react";
import app from "../firebase.js";
import { getDatabase, get, ref } from "firebase/database";
import User from "./User.js";
import ChatContainer from "./ChatContainer.js";

const UserContainer = () => {
    const [users, setUsers] = useState([]);
    const [userSelected, setUserSelected] = useState("");
    // const [userChats, setUserChats] = useState([]);

    useEffect(() => {
        const db = getDatabase(app);
        const dbRef = ref(db, "/users");

        //Get the users
        get(dbRef)
        .then((respDB) => {
            if(respDB.exists()) {
                // console.log(respDB.val());
                const userObj = respDB.val();
                setUsers(userObj);


                const arrayOfUsers = [];

                for(let id in userObj) {
                    const arrayOfUserChats = [];                    
                    const userChats = userObj[id].chats; 
                           
                    if(userChats) {
                        // console.log("exists chat");  
                        // console.log(userChats);  
                        userChats.forEach(element => {
                            // console.log(element);
                            const newUserObjChat = {
                                chatId: element.chatId,
                                userId: element.userId                            
                            }

                            arrayOfUserChats.push(newUserObjChat);
                        });                        
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

                setUsers(arrayOfUsers);

            }
            else {
                console.log("There is no users to show!");
            }
        })

    }, []);

    // console.log(users);
    const handleSubmitForm = (e, userId) => {
        e.preventDefault();

        if(userId !== "placeholder") {
            // setUserSelected(userId);
            // console.log(userId);

            /// ********************* activate after tests ********** ////
            //update the user selected to online status
            // const db = getDatabase(app);
            // const dbRef = ref(db, `/users/${userId}`);
            // const userUpdate = { online: true }

            // update(dbRef, userUpdate);            

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

    return(
        <section className="userContainer">
            <div className="wrapper">
            <h1>User Container</h1>

                {
                    userSelected === ""
                    ?   <User handleSubmit={handleSubmitForm} userArray={users} />
                    :   <ChatContainer userSender= {userSelected}/>
                }
            
            </div>
        </section>
    )
}

export default UserContainer;
