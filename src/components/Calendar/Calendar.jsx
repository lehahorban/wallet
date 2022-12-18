import style from './Calendar.module.css';
import arrow from './image/Vector.png';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { useState } from 'react';

const Calendar = ({ setMonthAmount, setYearAmount }) => {
  const [month, setMonth] = useState(false);
  const [year, setYear] = useState(false);
  const [monthText, setMonthText] = useState(false)
  const [yearText, setYearText] = useState(false)
  const [openCalendar, setOpenCalendar] = useState(true);
  const currentMonth = String(new Date().getMonth());
  const currentYear = String(new Date().getFullYear());  

  const monthList = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
  ];
  
  const thisMonth = monthList[currentMonth]
  // console.log(currentMonth);
  

  const toggleMonth = () => {
    setMonth(!month);
    setYear(false);
  };

  const toggleYear = () => {
    setYear(!year);
    setMonth(false);
   
  };
  const onMounthCange = e => {
    let choosenOne = e._d.getMonth() + 1;
    if (choosenOne < 10) {
      choosenOne = '0' + choosenOne;
    }
    setMonthAmount(choosenOne.toString());
  };

  const onYearChange = e => {
    const choosenOne = e._d.getFullYear().toString();
    setYearAmount(choosenOne);
  };
  const isValidData = data => {
    const currentDate = new Date();
    return currentDate > data._d;
  };

  const toggleCalendar = e => {
    const textContent = e.target.textContent;
     
    const classTable = e.target.getAttribute('class');

    if (classTable === 'rdtMonth') {
      setOpenCalendar(false);
      setMonthText(textContent)
      setMonth(false)
    } else if (classTable === 'rdtYear') {
      setOpenCalendar(false);
      setYearText(textContent)
      setYear(false)
    } else {
      setOpenCalendar(false);
    }
  };

  return (
    <div onClick={toggleCalendar} className={style.wrappCalendar}>
      <div>
        <div onClick={toggleMonth} className={style.wrapperMonth}>
          <p className={style.calendarText}>{monthText ? monthText : thisMonth}</p>
          <img src={arrow} alt=">" />
        </div>
        {month && (
          <Datetime
            open={openCalendar}
            closeOnSelect={true}
            timeFormat={false}
            dateFormat="MM"
            onChange={onMounthCange}
            isValidDate={isValidData}
            className={style.datetime}
            input={false}
          />
        )}
      </div>

      <div>
        <div
          onClick={toggleYear}
          className={`${style.wrapperMonth} ${style.wrapperYear}`}
        >
          <p className={style.calendarText}>{yearText ? yearText : currentYear}</p>
          <img src={arrow} alt=">" />
        </div>
        {year && (
          <Datetime
            open={openCalendar}
            closeOnSelect={true}
            className={style.datetime}
            dateFormat="YYYY"
            timeFormat={false}
            onChange={onYearChange}
            isValidDate={isValidData}
            input={false}
          />
        )}
      </div>
    </div>
  );
};

export default Calendar;
