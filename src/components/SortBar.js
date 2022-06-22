import { StyledSortBar } from './styles/SortBar.styled';

const SortBar = ({ setOrder }) => {
  return (
    <StyledSortBar>
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
