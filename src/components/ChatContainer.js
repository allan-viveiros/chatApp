import app from "../firebase.js";
import { getDatabase, ref, onValue, push } from "firebase/database";
import { useState, useEffect } from "react";
import UserToTalk from "./UserToTalk.js";
import MessageDisplay from "./MessageDisplay.js";
import UserInput from "./UserInput";

const ChatContainer = ({userSender}) => {
    const [users, setUsers] = useState([]);
    const [userRecipient, setUserRecipient] = useState("");
    const [chatId, setChatId] = useState("");
    // const [userInput, setUserInput] = useState("");
    // const [messages, setMessages] = useState([]);    

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
                        userChats.forEach(element => {
                            const newUserObjChat = {
                                chatId: element.chatId,
                                userId: element.userId
                            }
    
                            arrayOfUserChats.push(newUserObjChat);
                        });                        
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
        // console.log("User Recipient");
        // console.log(userRecipient.chats);
        // console.log(userSender.userId);

        const userRecipChat = userRecipient.chats;
        let historic = false;

        for(let chatId in userRecipChat) {            
            // console.log(chatId);
            // console.log(userRecipChat);
            if(userRecipChat[chatId].userId === userSender.userId){
                // console.log("match");
                // console.log(userRecipChat[chatId].chatId);
                setChatId(userRecipChat[chatId].chatId);
                historic = true;
            }            
        }

        if(historic === false) {
            console.log("There is no chat available, create a new one!");
        }

        // connect to Firebase to bring the messages
        //  **************************************************** 
        // const db = getDatabase(app);
        // const dbRef = ref(db, `/chats/${chatId}`);        

        // onValue(dbRef, (result) => {
        //     // console.log(result.val());
        //     setMessages(result.val());
        // });

    }, [userRecipient]);
    

    const handleSubmitForm = (e, userId) => {
        e.preventDefault();
        
        if(userId !== "placeholder") {
            // console.log(userId);
            // setUserRecipient(userId);
            for(let id in users) {
                if(users[id].userId === userId) {
                    // console.log(users[id]);
                    setUserRecipient(users[id]);
                }
            }
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

        console.log(userInput);
        // console.log(userRecipient);
        // console.log(userSender);
        // console.log(chatId);

        const inputObj = {
            from: userSender.userId,
            message: userInput,
            time: "now"
        }

        const db = getDatabase(app);
        const dbRef = ref(db, `/chats/${chatId}`);

        console.log(dbRef);

        const fbObj = push(dbRef, inputObj);
        console.log(fbObj);        
    }

    // const handleInputChange = (e) => {
    //     setUserInput(e.target.value);
    //     // console.log(e.target.value);
    // }

    return(
        <section className="chatContainer">

            <UserToTalk userArray={users} handleSubmit={handleSubmitForm}/>

            {
                userRecipient !== ""
                ?   <MessageDisplay chatKey={chatId} />
                :   null
            }

            <UserInput handleSubmit={handleUserInput} />

        </section>
    )
}

export default ChatContainer;
