import Icon from '../ui/Icons/Icon';
import { iconDefinitions } from '../../constants';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="main-header">
      <h1 className="brand-name">CoolDeals</h1>
      <Icon iconInfo={iconDefinitions.cart} />
    </header>
  );
};

export default Header;
