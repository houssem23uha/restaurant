import { useState } from "react";

const StarRatingVote = ({ rating = 0, onRate }) => {
    const [selectedRating, setSelectedRating] = useState(null);
    const [hoveredRating, setHoveredRating] = useState(null);

    const effectiveRating = selectedRating !== null ? selectedRating : rating;

    const handleClick = (value) => {
        setSelectedRating(value);
        if (onRate) {
            onRate(value); // Appel d'un callback externe si fourni
        }
    };

    const renderStars = () => {
        return Array.from({ length: 5 }, (_, index) => {
            const starValue = index + 1;
            let className = "far fa-star";

            if (
                hoveredRating >= starValue ||
                (!hoveredRating && effectiveRating >= starValue)
            ) {
                className = "fas fa-star";
            }

            return (
                <i
                    key={index}
                    className={className}
                    style={{
                        color: "var(--primary)",
                        cursor: "pointer",
                        transition: "color 0.2s",
                    }}
                    onClick={() => handleClick(starValue)}
                    onMouseEnter={() => setHoveredRating(starValue)}
                    onMouseLeave={() => setHoveredRating(null)}
                ></i>
            );
        });
    };

    return (
        <div style={{ display: "inline-block", fontFamily: "Arial, sans-serif" }}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "var(--star-color)",
                    fontSize: "1.5rem",
                }}
            >
                <div>{renderStars()}</div>
                <span style={{ fontSize: "1.2rem", color: "var(--text-color)" }}>
          {effectiveRating}/5
        </span>
            </div>
        </div>
    );
};

export default StarRatingVote;
