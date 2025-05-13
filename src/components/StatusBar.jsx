import "../Styles.css";

const StatusBar = ({ message, isVisible, type }) => {
  return (
    <div className={`status-bar ${isVisible ? 'visible' : ''} ${type}`}>
      {message}
    </div>
  );
};

export default StatusBar;
