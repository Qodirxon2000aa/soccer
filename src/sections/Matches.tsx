import Match from "../components/Match";
import { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { formatDateForCal } from "../utils/formatDate";
import { useGlobalContext } from "../context/globalContext";

const Matches = () => {
  const { matches, fetchGamesForDate } = useGlobalContext();

  // Local state
  const [date, setDate] = useState(new Date());
  const [currDateId, setCurrDateId] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCalendarDate, setShowCalendarDate] = useState(false);

  // Kelayotgan 5 kunni tayyorlaymiz
  const dateList: Date[] = [];
  const getDates = () => {
    Array.from({ length: 5 }).forEach((_, index) => {
      const today = new Date();
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + index);
      dateList.push(nextDate);
    });
  };
  getDates();

  const handleCalendarSelect = (e: Date) => {
    setDate(e);
    setShowCalendar(false);
    setShowCalendarDate(true);
    fetchGamesForDate(e);
  };

  const formatUzbekDate = (date: Date) => {
    return date.toLocaleDateString("uz-UZ", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  return (
    <section
      id="matches"
      className="matches w-full mt-[56px] xl:pl-[24px] pb-[48px]"
    >
      <h1 className="text-[20px] font-[600]">⚽ Uchrashuvlar</h1>

      <ul className="relative mt-[32px] flex border-b-[4px] border-[#2E3034] pb-[13px]">
        {/* Ekran kattaligiga qarab farqli ko‘rsatish */}
        <div className="hidden xmd:flex">
          {dateList.map((theDate, index) => (
            <button
              className={`${currDateId === index ? "active" : ""}`}
              onClick={() => {
                fetchGamesForDate(theDate);
                setCurrDateId(index);
                setShowCalendarDate(false);
              }}
              key={index}
            >
              {formatUzbekDate(theDate)}
            </button>
          ))}
        </div>

        <div className="hidden vsm:flex xmd:hidden">
          {dateList.slice(0, 2).map((theDate, index) => (
            <button
              className={`${currDateId === index ? "active" : ""}`}
              onClick={() => {
                fetchGamesForDate(theDate);
                setCurrDateId(index);
                setShowCalendarDate(false);
              }}
              key={index}
            >
              {formatUzbekDate(theDate)}
            </button>
          ))}
        </div>

        <div className="flex vsm:hidden">
          {dateList.slice(0, 1).map((theDate, index) => (
            <button
              className={`${currDateId === index ? "active" : ""}`}
              onClick={() => {
                fetchGamesForDate(theDate);
                setCurrDateId(index);
                setShowCalendarDate(false);
              }}
              key={index}
            >
              {formatUzbekDate(theDate)}
            </button>
          ))}
        </div>

        {/* Kalendar va tanlangan sana */}
        <div
          className={`${
            showCalendarDate
              ? "bg-white text-black px-[10px] py-[2px] rounded-[10px]"
              : ""
          } absolute right-0 flex items-center gap-[10px]`}
        >
          {showCalendarDate && <p>{formatDateForCal(date)}</p>}

          <FaRegCalendarAlt
            onClick={() => setShowCalendar((prev) => !prev)}
            className="cursor-pointer"
          />
        </div>

        {/* Calendar komponenti */}
        <div className="absolute right-0 top-[40px] z-10">
          {showCalendar && (
            <Calendar
              className="bg-black"
              onChange={(e: any) => handleCalendarSelect(e)}
              value={date}
            />
          )}
        </div>
      </ul>

      {/* Matchlar jadvali */}
      <div className="mt-[32px] w-full overflow-x-auto">
        <table className="mt-[32px] w-full ">
          <tbody>
            {matches.map((match, index) => (
              <Match key={index} match={match} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Matches;
