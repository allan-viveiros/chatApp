import app from "../firebase.js";
import { getDatabase, ref, onValue, push } from "firebase/database";
import { useState, useEffect } from "react";
import UserToTalk from "./UserToTalk.js";
import MessageDisplay from "./MessageDisplay.js";
import UserInput from "./UserInput";

const ChatContainer = ({userSender}) => {
    const [users, setUsers] = useState([]);
    const [userRecipient, setUserRecipient] = useState("");
    const [chatKey, setChatKey] = useState("");

    // connect with the database
    useEffect(() => {
        const db = getDatabase(app);
        const dbRef = ref(db, "/users");

        // onValue to get the users data and keep tracking fot updates
        onValue(dbRef, (dbResponse) => {
            if(dbResponse.val()) {
                const usersObj = dbResponse.val();
                const arrayOfUsers = [];
                  
                // Creating an user array to fill the users state
                for(let key in usersObj) {
                    const arrayOfUserChats = [];                    
                    const userChats = usersObj[key].chats; 

                    if(key !== userSender.userId) {
                        if(userChats) {  
                            for(let id in userChats) {
                                const newUserObjChat = {
                                    chatId: userChats[id].chatId,
                                    userId: userChats[id].userId
                                }

                                arrayOfUserChats.push(newUserObjChat);
                            }                       
                        }
        
                        const newUserObj = {
                            userId: key,
                            name: usersObj[key].name,
                            photo: usersObj[key].photo,
                            online: usersObj[key].online,
                            chats: arrayOfUserChats              
                        }
        
                        arrayOfUsers.push(newUserObj);                    
                    }
                }

                //save the list of users to show on the select element
                setUsers(arrayOfUsers);
            }
            else {
                alert("There is no users to show, Please wait for new robot been created");
            }
            
            
        }); 
        
    }, [userSender.userId]);

    //Get the userToTalk selected and bring the chat history
    const handleSubmitForm = (e, userId) => {
        e.preventDefault();
        
        if(userId !== "placeholder") {
            let userRecipChat = "";

            for(let id in users) {
                if(users[id].userId === userId) {
                    setUserRecipient(users[id]);

                    userRecipChat = users[id].chats;
                }
            }

            let historic = false;

            for(let chatId in userRecipChat) { 
                if(userRecipChat[chatId].userId === userSender.userId){
                    const ChatIdKey = userRecipChat[chatId].chatId;

                    setChatKey(ChatIdKey);
                    historic = true;   
                }            
            }

            if(historic === false) {
                let userUniqueKey = "";

                if(userSender.userId > userId){
                    userUniqueKey = userId+userSender.userId;
                }
                else {
                    userUniqueKey = userSender.userId+userId;
                }

                setChatKey(userUniqueKey);

                const newChatIdSender = {                    
                    chatId: userUniqueKey,
                    userId: userId
                }

                const newChatIdRecipient = {                    
                    chatId: userUniqueKey,
                    userId: userSender.userId
                }

                const db = getDatabase(app);
                const dbRefSender = ref(db, `/users/${userSender.userId}/chats`);
                const dbRefRecipient = ref(db, `/users/${userId}/chats`);

                // TODO - Make an Error handle to Firebase push
                const NewChatIdSender = push(dbRefSender, newChatIdSender);
                console.log(NewChatIdSender);

                const NewChatIdRecipient = push(dbRefRecipient, newChatIdRecipient);
                console.log(NewChatIdRecipient);

            }
        }
        else {
            alert("Please select an user!");
        }
    }

    const handleUserInput = (e, userInput, inputFunction) => {
        e.preventDefault();

        if(userInput.trim() !== "") {
            const current = new Date().toString();        
            const day = current.slice(8, 10);
            const month = current.slice(4, 7);        
            const hour = current.slice(16, 21);

            const inputObj = {
                from: userSender.userId,
                message: userInput,
                time: `${month} ${day}, ${hour}`
            }

            const db = getDatabase(app);
            const dbRef = ref(db, `/chats/${chatKey}`);
            
            // TODO - Make an Error handle to Firebase push
            const fbObj = push(dbRef, inputObj);
            console.log(fbObj);

            inputFunction(""); 
        }                  
    }
   
    return(
        <section className="chatContainer">
            <UserToTalk userArray={users} handleSubmit={handleSubmitForm}/>

            {
                userRecipient !== "" 
                ?  <>   
                        <MessageDisplay chatKey={chatKey} sender={userSender}/>

                        <UserInput handleSubmit={handleUserInput} />
                    </>
                :   null
            }
        </section>
    )
}

export default ChatContainer;
