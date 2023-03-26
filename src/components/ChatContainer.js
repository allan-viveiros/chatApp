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
    // const [userInput, setUserInput] = useState("");
    // const [messages, setMessages] = useState("");  
    
    // connect with the database
    useEffect(() => {
        const db = getDatabase(app);
        const dbRef = ref(db, "/users");

        // onValue to get the data and keep tracking fot updates
        onValue(dbRef, (dbResponse) => {
            // const chatObj = dbResponse.val().chats;
            const usersObj = dbResponse.val();
            // console.log (usersObj);

            const arrayOfUsers = [];
            // const arrayOfChats = [];
            
            // Creating an user array to fill the users state
            for(let key in usersObj) {
                const arrayOfUserChats = [];                    
                const userChats = usersObj[key].chats; 

                if(key !== userSender.userId) {
                    if(userChats) {
                        // console.log("exists chat"); 
                        for(let id in userChats) {
                            console.log(id); 
                            console.log(userChats); 

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
        }); 
        
    }, []);

    useEffect(() => {
        console.log("User Recipient");
        console.log(userRecipient);
        // console.log(userSender.userId);

        if(userRecipient !== "") {
            console.log("User Recipient inside");
            console.log(userRecipient);
            // const userRecipChat = userRecipient.chats;
            // let historic = false;

            // //TODO - BUILD THE CHATKEY INSTEAD TO CHECK FOR A REFERENCE

            // for(let chatId in userRecipChat) {            
            //     // console.log(chatId);
            //     // console.log(userRecipChat);
            //     if(userRecipChat[chatId].userId === userSender.userId){
            //         console.log("match");
            //         // console.log(userRecipChat[chatId].chatId);
            //         const testKey = userRecipChat[chatId].chatId;
            //         setChatKey(testKey);
            //         historic = true;
            //         console.log(testKey);
            //     }            
            // }

            // if(historic === false) {
            //     console.log("There is no chat available, create a new one!");

            //     let userUniqueKey = "";

            //     if(userSender.userId > userRecipient.userId){
            //         userUniqueKey = userRecipient.userId+userSender.userId;
            //     }
            //     else {
            //         userUniqueKey = userSender.userId+userRecipient.userId;
            //     }

            //     setChatKey(userUniqueKey);
                
            //     console.log(userSender.userId);
            //     console.log(userRecipient.userId);
            //     console.log(userUniqueKey);

            //     const newChatIdSender = {                    
            //         chatId: userUniqueKey,
            //         userId: userRecipient.userId
            //     }

            //     const newChatIdRecipient = {                    
            //         chatId: userUniqueKey,
            //         userId: userSender.userId
            //     }

            //     const db = getDatabase(app);
            //     const dbRefSender = ref(db, `/users/${userSender.userId}/chats`);
            //     const dbRefRecipient = ref(db, `/users/${userRecipient.userId}/chats`);

            //     // console.log(dbRef);

            //     const NewChatIdSender = push(dbRefSender, newChatIdSender);
            //     console.log(NewChatIdSender);   

            //     const NewChatIdRecipient = push(dbRefRecipient, newChatIdRecipient);
            //     console.log(NewChatIdRecipient);
            // }

            // connect to Firebase to bring the messages
            //  **************************************************** 
            // const db = getDatabase(app);
            // const dbRef = ref(db, `/chats/${chatKey}`); 
            
            // console.log(dbRef);

            // onValue(dbRef, (result) => {
            //     console.log(typeof result.val());
            //     setMessages(result.val());
            // });
        }

    }, [userRecipient]);





    
    // useEffect(() => {
    //     if(chatKey === ""){
    //         console.log("there is no CHATKEY");
    //     }
    //     else {
    //         console.log("chatKey");
    //         console.log(chatKey);
    //     }        

    // }, [chatKey])

    const handleSubmitForm = (e, userId) => {
        e.preventDefault();
        
        if(userId !== "placeholder") {
            console.log(userId);
            // setUserRecipient(userId);
            let userRecipChat = "";

            for(let id in users) {
                if(users[id].userId === userId) {
                    // console.log(users[id]);
                    setUserRecipient(users[id]);

                    userRecipChat = users[id].chats;
                }
            }

            //***********************************
            // const userRecipChat = userRecipient.chats;
            let historic = false;

            //TODO - BUILD THE CHATKEY INSTEAD TO CHECK FOR A REFERENCE

            for(let chatId in userRecipChat) {            
                // console.log(chatId);
                // console.log(userRecipChat);
                if(userRecipChat[chatId].userId === userSender.userId){
                    console.log("match");
                    // console.log(userRecipChat[chatId].chatId);
                    const testKey = userRecipChat[chatId].chatId;
                    setChatKey(testKey);
                    historic = true;
                    console.log(testKey);
                }            
            }

            if(historic === false) {
                console.log("There is no chat available, create a new one!");

                let userUniqueKey = "";

                if(userSender.userId > userId){
                    userUniqueKey = userId+userSender.userId;
                }
                else {
                    userUniqueKey = userSender.userId+userId;
                }

                setChatKey(userUniqueKey);
                
                console.log(userSender.userId);
                console.log(userId);
                console.log(userUniqueKey);

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

                // console.log(dbRef);

                const NewChatIdSender = push(dbRefSender, newChatIdSender);
                console.log(NewChatIdSender);   

                const NewChatIdRecipient = push(dbRefRecipient, newChatIdRecipient);
                console.log(NewChatIdRecipient);
            }
            //***********************************

        }
        else {
            alert("Please select an user!");
        }
        
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

    const handleUserInput = (e, userInput) => {
        e.preventDefault();

        // console.log(userInput);
        // console.log(e.target[0].value);
        // e.target[0].value = "";
        // console.log(userRecipient);
        // console.log(userSender);
        // console.log(chatId);

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

        // console.log(dbRef);

        const fbObj = push(dbRef, inputObj);
        console.log(fbObj);            
    }

    if(chatKey === ""){
        console.log("loading........");
                
    }

    console.log(chatKey);
    
    return(
        <section className="chatContainer">

            <UserToTalk userArray={users} handleSubmit={handleSubmitForm}/>

            {
                userRecipient !== "" 
                ?   <MessageDisplay 
                        chatKey={chatKey} 
                        sender={userSender}
                    />
                :   null
            }

            <UserInput handleSubmit={handleUserInput} />

        </section>
    )
}

export default ChatContainer;
