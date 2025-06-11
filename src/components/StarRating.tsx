const StarRating = ({ rating, reviews }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.25 && rating % 1 <= 0.75;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <i
        key={"full" + i}
        className="fas fa-star"
        style={{ color: "var(--primary)" }}
      ></i>
    );
  }
  if (halfStar) {
    stars.push(
      <i
        key="half"
        className="fas fa-star-half-alt"
        style={{ color: "var(--primary)" }}
      ></i>
    );
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <i
        key={"empty" + i}
        className="far fa-star"
        style={{ color: "var(--primary)" }}
      ></i>
    );
  }

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
        <div>{stars}</div>
        <span style={{ fontSize: "1.2rem", color: "var(--text-color)" }}>
          {rating}/5
        </span>
      </div>
      <div
        style={{
          fontSize: "1rem",
          color: "var(--text-color)",
          marginTop: "4px",
        }}
      >
        {reviews} avis
      </div>
    </div>
  );
};

export default StarRating;
