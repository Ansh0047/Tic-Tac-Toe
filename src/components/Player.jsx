import { useState } from "react";


// IMT Note: When we are using a component React will create the new isolated instance and changes to it,
// will not affect the other componets on reusing it.
export default function Player({initialName,symbol, isActive, onChangeName}) {
    const [playerName,setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    
    // function to change the state if we are editing or not
    function handleEditClick(){
      // setIsEditing(!isEditing);    // schedules a state update
      // here editing will refer to the old state
      setIsEditing((editing) => !editing);   // good practice to use this for updating the state.   

      
      if(isEditing) {
        onChangeName(symbol,playerName);
      }
    }


    // event: It is an event object containing information about the event like target element and values
    function handleChange(event){
      setPlayerName(event.target.value);
    }
    
    // initially player name is rendered and if edit button is clicked set the content to input to get the name
    let editablePlayerName = <span className="player-name">{playerName}</span>;
    let buttonCaption = 'Edit';
    if(isEditing){
      // onChange = Event handler function, Fires immediately when the input’s value is changed
      editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}></input>;
      buttonCaption = 'Save';
    }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      {/* as we have to edit the name of the player and after changing the name the ui should be same 
      so we "useState" for this that whether the button gets clicked or not*/}
      <button onClick={handleEditClick}>{buttonCaption}</button>
    </li>
  );
}
