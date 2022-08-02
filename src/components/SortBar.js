import { StyledSortBar } from './styles/SortBar.styled';

const SortBar = ({ setOrder, comments, order }) => {
  console.log(order);
  return (
    <StyledSortBar comments={comments ? true : false}>
      <div
        className={order === 'date' ? 'active' : null}
        onClick={() => setOrder('date')}
      >
        <i className="las la-clock"></i>
        <p>New</p>
      </div>
      <div
        className={order === 'votes' ? 'active' : null}
        onClick={() => setOrder('votes')}
      >
        <i className="las la-chart-bar"></i>
        <p>Top</p>
      </div>
    </StyledSortBar>
  );
};

export default SortBar;
