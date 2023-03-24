import app from "../firebase.js";
import { getDatabase, ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import UserToTalk from "./UserToTalk.js";
import MessageDisplay from "./MessageDisplay.js";

const ChatContainer = () => {
    const [users, setUsers] = useState([]);
    const [userRecipient, setUserRecipient] = useState("");
    const [chatId, setChatId] = useState([]);
    const [chats, setChats] = useState([]);

    
    useEffect(() => {
        const db = getDatabase(app);
        const dbRef = ref(db);

        onValue(dbRef, (dbResponse) => {
            const chatObj = dbResponse.val().chats;
            const usersObj = dbResponse.val().users;
            console.log (chatObj);

            const arrayOfUsers = [];
            const arrayOfChats = [];

            for(let chatID in chatObj) {

                const teste = chatObj[chatID];
                console.log(teste);

                teste.forEach( element => {
                    console.log(element.message);
                })

                // for()
                // const newChatObj = {
                //     chatID: chatID,
                //     from: chatObj[chatID].from,

                // }
            }

            for(let key in usersObj) {
                // console.log(key);
                // console.log(usersObj[key].chats);
                const newUserObj = {
                    userId: key,
                    name: usersObj[key].name,
                    photo: usersObj[key].photo,
                    online: usersObj[key].online
                    // chats: [usersObj[key].chats],              
                }

                arrayOfUsers.push(newUserObj);

                const userChatsObj = usersObj[key].chats;

                if(userChatsObj) {
                    // console.log("Chat Exists!");
                    let chatMatch = false;

                    for(let id in userChatsObj) {
                        // console.log(id);
                        // console.log(userChatsObj[id].userId);
    
                        if(userChatsObj[id].userId === "userID1"){
                            // console.log("Match with user Sender id");
                            // console.log(userChatsObj[id].chatId);
                            chatMatch = true;
                            
                            setChatId(userChatsObj[id].chatId);
                        }   
                    }

                    if(chatMatch === false) {
                        console.log("there is no chat with this user, create a new chat");
                    }
                }
                else {
                    console.log("There is no chat at all, create a new chat");
                }
            }

            setUsers(arrayOfUsers);

            // waiting for userRecipient been selected
            // looking for historic
            // for(let chatKey in chatObj) {
            //     console.log(chatKey);
            //     console.log(chatObj[chatKey]);
            //     console.log(`chatId: ${chatKey}`);
            //     // const newChatObj = chatObj[chatKey];

            //     const newChatObj = {

            //     }

            //     if(chatKey === chatId){
            //         console.log("chat Matches");
            //         // console.log(chatObj[chatKey]);
            //     }
            //     else {
            //         console.log("there is no historic!");
            //     }
            // }
            

        }); 
        
    }, []);

    const handleSubmitForm = (e, userId) => {
        e.preventDefault();
        
        userId === "placeholder"
        ?   alert("Please select an user!")
        :   setUserRecipient(userId);

        // for(let chatKey in chatObj) {
        //     console.log(chatKey);
        //     console.log(chatObj[chatKey]);
        //     console.log(`chatId: ${chatKey}`);
        //     // const newChatObj = chatObj[chatKey];

        //     const newChatObj = {

        //     }

        //     if(chatKey === chatId){
        //         console.log("chat Matches");
        //         // console.log(chatObj[chatKey]);
        //     }
        //     else {
        //         console.log("there is no historic!");
        //     }
        // }
    }

    return(
        <section>

            <UserToTalk userArray={users} handleSubmit={handleSubmitForm}/>

            {/* {
                userRecipient !== ""
                ?   <MessageDisplay userRecip={userRecipient} userSend="userID1"/>
                : null
            }
             */}

        </section>
    )
}

export default ChatContainer;
