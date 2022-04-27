const CardSidebar = ({ votes }) => {
  return (
    <div>
      <i className="las la-caret-up"></i>
      <p>{votes}</p>
      <i className="las la-caret-down"></i>
    </div>
  );
};

export default CardSidebar;
