import { StyledSubMenu } from './styles/Profile.styled';
import { Link } from 'react-router-dom';

const SubMenu = (props) => {
  return (
    <StyledSubMenu>
      {props.subList.map((sub) => {
        return (
          <Link
            key={sub.id}
            to={`/r/${sub.name}`}
            onClick={props.onBtnClick}
            state={{ id: sub.id }}
          >
            r/{sub.name}
          </Link>
        );
      })}
    </StyledSubMenu>
  );
};

export default SubMenu;
