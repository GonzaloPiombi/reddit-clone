import { StyledSortBar } from './styles/SortBar.styled';

const SortBar = () => {
  return (
    <StyledSortBar>
      <div>
        <i className="las la-clock"></i>
        <p>New</p>
      </div>
      <div>
        <i className="las la-chart-bar"></i>
        <p>Top</p>
      </div>
    </StyledSortBar>
  );
};

export default SortBar;
