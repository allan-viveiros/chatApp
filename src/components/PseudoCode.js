
// Step 1: user component.  
    // Create a state item to hold the preset user taken.
    // const [userSelected, setUserSelected] = useState("");

    // The user will chose one of the preset users, once the preset user was taken, use firebase function update() to update the use status online to true. 

    // Render the "chat container" component conditionally using the preset user taken as the user who will send the messages, It will make this user inaccessible to the others.

// Step 2: "chat container" component.
    // In the "chat container" component, Create a State to hold the user I want to talk with, and another state to hold the array with the messages coming from firebase.
    
    // const [userToTalk, setUserToTalk] = useState("");
    // const [userMessages, setUserMessages] = useState([]);

    // Use the state item (userToTalk) to hold the user I want to talk with. 

// Step 3: "chat container" component.
    // Once selected the userToTalk, check if the users already have any conversation stored.
        // if true = get the chatID and bring the historic 
        // false = make a push() request to create the chatID, and push() the chatID in both users using the userID
    // Invoked a firebase function onValue() to bring the chat array with all stored messages and tracking the new messages in realtime.

    // when successful, use userMessages to hold the message array coming form firebase.
    // if unsuccessful, display an error message.

    // Map through the userMessages to display each message in an individual component (message) passing props (messageText, time), to render the component.

// Step 4: "user input" component
    // Create a form to get the message, use the onSubmit() function to get the new message to send, use the firebase function push() to store the new message and rerender the components "message display" and "message" with the new message.
 
