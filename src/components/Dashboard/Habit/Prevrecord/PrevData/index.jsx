import "./prevData.css";
import { Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { activeUser, prevBox } from "../../../../../actions";

const PrevData = ({record,index,indexOfHabit}) => {
  console.log("Dates:", record, index);
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.setUserData)

    const handlePrevDayStatus = (newStatus, index) => {
      if (!record || typeof record !== 'object') {
        return; // Return early if record is undefined or not an object
      }
    
      // Create a copy of the current user object
      const updatedUser = { ...user };
    
      // Create a copy of the prevRecord array of the habit to be updated
      const updatedPrevRecord = [...updatedUser.habitData[indexOfHabit].prevRecord];
    
      // Update the status of the specific record if it exists
      if (updatedPrevRecord[index]) {
        updatedPrevRecord[index] = { ...updatedPrevRecord[index], status: newStatus };
    
        // Update the prevRecord array of the habit
        updatedUser.habitData[indexOfHabit].prevRecord = updatedPrevRecord;
    
        // Dispatch action to update the Redux store with the new user data
        dispatch(activeUser(updatedUser));
      }
    };
    
    
  return (
    <div className="prevData-container">
      <span
        className="close-box-btn"
        onClick={() => {
          dispatch(prevBox(false));
        }}
      >
        <FontAwesomeIcon icon={faXmark} />
      </span>

      <h2>{record.date}</h2>

      <div className="selector-container">
        <label htmlFor="antd-select">Status:</label>
        <Select
          id="antd-select"
          defaultValue={record.status}
          onChange={(value)=>{handlePrevDayStatus(value)}}
          options={[
            { value: "Done", label: "Done" },
            { value: "Not Done", label: "Not Done" },
            { value: "None", label: "None" },
          ]}
        />
      </div>
    </div>
  );
};

export default PrevData;
