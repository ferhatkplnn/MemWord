import { arrowLeft, arrowRight } from "../assets/icons";
import ArrowButton from "./buttons/ArrowButton";
import PropTypes from "prop-types";

function CardPager({ wordIndex, handlePrevClick, handleNextClick, words }) {
  return (
    <div>
      <div className="py-2 flex items-center space-x-4">
        <ArrowButton
          isDisable={wordIndex === 0}
          handleClick={handlePrevClick}
          imgURL={arrowLeft}
        />
        <span>
          {wordIndex + 1} / {words.length}
        </span>
        <ArrowButton
          isDisable={wordIndex === words.length - 1}
          handleClick={handleNextClick}
          imgURL={arrowRight}
        />
      </div>
    </div>
  );
}

CardPager.propTypes = {
  wordIndex: PropTypes.number.isRequired,
  handlePrevClick: PropTypes.func.isRequired,
  handleNextClick: PropTypes.func.isRequired,
  words: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CardPager;
