import { Button } from "react-bootstrap";

interface SlidingButtonProps {
  onToggle: (newPage: number, newTimeWindow: string) => void;
  selectedWindow: string;
  currentPage: number;
}

const SlidingButton = ({
  onToggle,
  selectedWindow,
  currentPage,
}: SlidingButtonProps) => {
  return (
    <div className="sliding-button">
      <Button
        className={selectedWindow === "day" ? "active" : ""}
        onClick={() => onToggle(currentPage, "day")}
      >
        Trending movies today
      </Button>
      <Button
        className={selectedWindow === "week" ? "active" : ""}
        onClick={() => onToggle(currentPage, "week")}
      >
        Trending movies this week
      </Button>
    </div>
  );
};

export default SlidingButton;
