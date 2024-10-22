const Crousel = ({ handleCrouselScroll, crouselData }) => {
  return (
    <div
      // onScroll={handleCrouselScroll}
      className="crousel-wraper"
    >
      {crouselData.map((data, i) => {
        return (
          <div>
            <img id={"crouselItem" + i} src={data.src} alt="natural" />
          </div>
        );
      })}
    </div>
  );
};

export default Crousel;
