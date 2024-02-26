import { useEffect } from "react";
import "./dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideNavbar from "../SideNavbar";
import Habit from "./Habit";
import CreateHabit from "./CreateHabit";
import { createBox } from "../../actions";
import PrevRecord from "./Habit/Prevrecord";

export default function Dashboard() {
  let navigate = useNavigate();
  let dispatch = useDispatch()
  // Fetchin user from Store
  let user = useSelector((state) => state.setUserData);
  const showPrevRecord = useSelector((state)=>state.handlePrevBox);
  let createBoxStatus = useSelector((state)=>state.handleCreateBox)
  // const [settingsBox, setSettingsBox] = useState(false);
  // const [statsBox, setStatsbox] = useState(false);
  let settingsBox=false;
  let statsBox=false;
  useEffect(() => {
    if (!user) {
      console.log("User Doesnt Exist!");
      navigate("/");
    }
  }, [user,navigate]);

  // Calculating Date
  function getFormattedDate(date) {
    const dayOfWeek = date.toLocaleString("en-US", { weekday: "short" });
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    const ordinalIndicator = getOrdinalIndicator(day);

    return {
      dayOfWeek: dayOfWeek,
      day: day,
      month: month,
      year: year,
      formatted: `${dayOfWeek}, ${day}${ordinalIndicator} ${month}, ${year}`,
    };
  }

  function getOrdinalIndicator(day) {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    const lastDigit = day % 10;
    switch (lastDigit) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  const today = new Date();
  const todayDate = getFormattedDate(today);

  function getPreviousAndNextDates() {
    const today = new Date();

    // Get the next 20 days
    const nextDates = [];
    for (let i = 1; i <= 20; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      nextDates.push(getFormattedDate(nextDate));
    }
    
    let datesList = [todayDate, ...nextDates]
    return datesList;
   }
  const datesList = getPreviousAndNextDates();
  let activeNav = statsBox ? "stats":settingsBox? "settings":"dashboard";
  
  // Create Habit
  return (
    <div className="dashboard-container">

      {/* Side Bar */}
      <SideNavbar activeNav={activeNav} />

      <div className="display-habits">
        <h1 className="greeting-user">
          Hey Welcome Dear {user ? user.name : "Fetching..."}!
        </h1>

        {/* Showing Dates */}
        <div className="dates-list">
          {datesList.map((date, index) => {

            return <div key={index} className={`date-list-item ${date.formatted === todayDate.formatted ? 'active-date' : ''}`}  >
              
              <span className="dayOfWeek">{date.dayOfWeek}</span>
              <span className="day">{date.day}</span>
              <span className="month">{date.month}</span>
            </div>;
          })}
        </div>
        <h2 className="todays-habits-heading">Today's Habits</h2>
        <div className="habit-list">
          {user && user.habitData && user.habitData.map((habit, index)=><Habit habit= {habit} index={index} key={index} />)}

        </div>
      </div>

        {/* Create Box */}
        {createBoxStatus && <CreateHabit/>}
        { showPrevRecord && <PrevRecord/> }
      <div className="add-habits-btn" onClick={()=>{
        dispatch(createBox(true))
      }}>
        Add Habit +
      </div>
    </div>
  );
}
