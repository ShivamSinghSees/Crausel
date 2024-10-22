import { useEffect, useState } from "react";
import Crousel from "./Crousel";
import { crouselData } from "./crouselData";
import "./styles.css";

export default function App() {
  const [crouseWraper, setCrouseWraper] = useState();
  const [activeCrouseItem, setActiveCrouselItem] = useState(0);
  const [nextCrouselItem, setNextCrouselItem] = useState({
    scrollDirection: null,
    currenCrouselItem: 0
  });
  let crouselDataLength = crouselData.length;
  function findAndScrollToCrouselItem(id) {
    let itemToscroll = document.getElementById("crouselItem" + id);
    if (itemToscroll) {
      itemToscroll.scrollIntoView({
        behavior: "smooth"
      });
    }
  }

  function validate(scrollDirection, count) {
    if (scrollDirection === "right") {
      if (count === crouselDataLength - 1) {
        return count;
      } else return count + 1;
    } else {
      if (count === 0) return count;
      else return count - 1;
    }
  }

  function ScrollCrouselImage(scrollTo) {
    if (crouseWraper) {
      if (crouselDataLength <= 5) {
        findAndScrollToCrouselItem(scrollTo);
        setActiveCrouselItem(scrollTo);
      } else {
        setNextCrouselItem((prev) => {
          return {
            scrollDirection: scrollTo,
            currenCrouselItem: validate(scrollTo, prev.currenCrouselItem)
          };
        });
      }
    }
  }
  useEffect(() => {
    setCrouseWraper(document.getElementsByClassName("crousel-wraper")[0]);
  }, []);

  useEffect(() => {
    if (nextCrouselItem.scrollDirection) {
      findAndScrollToCrouselItem(nextCrouselItem.currenCrouselItem);
    }
  }, [nextCrouselItem]);

  // function handleCrouselScroll() {
  //   if (crouseWraper?.scrollLeft === crouseWraper.scrollWidth - totalWidth) {
  //     // setIsLeftCompleated(true);
  //   } else {
  //     // setIsLeftCompleated(false);
  //   }
  //   if (crouseWraper.scrollLeft > 0) {
  //     setIsRightCompleated(false);
  //   } else {
  //     setIsRightCompleated(true);
  //   }
  // }

  return (
    <div className="App">
      <Crousel
        crouselData={crouselData}
        // handleCrouselScroll={handleCrouselScroll}
      />
      <div className="controls">
        {crouselDataLength <= 5 ? (
          Array(5)
            .fill("_")
            .map((_, i) => {
              return (
                <button
                  onClick={() => ScrollCrouselImage(i)}
                  style={{
                    backgroundColor: activeCrouseItem === i ? "gray" : "#c9c6bd"
                  }}
                ></button>
              );
            })
        ) : (
          <>
            {nextCrouselItem.currenCrouselItem !== 0 && (
              <button
                className="ctr_btn"
                onClick={() => ScrollCrouselImage("left")}
              >
                left
              </button>
            )}
            {nextCrouselItem.currenCrouselItem !== crouselDataLength - 1 && (
              <button
                className="ctr_btn"
                onClick={() => ScrollCrouselImage("right")}
              >
                {" "}
                right
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
