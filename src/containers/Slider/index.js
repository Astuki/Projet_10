import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  /*
  const nextCard = () => {
    setTimeout(() => {
      setIndex((prevIndex) => (byDateDesc?.length ? (prevIndex + 1) % byDateDesc.length : 0));
    }, 5000); /* won't try to access length property if byDateDesc is "undefined" so no "4th blank slider img" 
  };
  */

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (byDateDesc?.length ? (prevIndex + 1) % byDateDesc.length : 0));
    }, 5000);

    return () => clearInterval(intervalId);
  }, [byDateDesc]);


  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div
            key={event.id}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc?.map((_, radioIdx) => (
              <input
                key={event.id}
                type="radio"
                name="radio-button"
                checked={index === radioIdx}
                onChange={() => setIndex(radioIdx)}
              />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;
