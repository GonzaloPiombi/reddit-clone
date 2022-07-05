import { StyledSortBar } from './styles/SortBar.styled';

const SortBar = ({ setOrder, comments }) => {
  return (
    <StyledSortBar comments={comments ? true : false}>
      <div onClick={() => setOrder('date')}>
        <i className="las la-clock"></i>
        <p>New</p>
      </div>
      <div onClick={() => setOrder('votes')}>
        <i className="las la-chart-bar"></i>
        <p>Top</p>
      </div>
    </StyledSortBar>
  );
};

export default SortBar;
