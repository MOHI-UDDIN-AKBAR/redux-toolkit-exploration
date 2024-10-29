import { useAppSelector } from '../../store/hook';
import './footer.css';

const Footer: React.FC = () => {
  const { products } = useAppSelector((state) => state.product);
  return (
    <footer
      className={`${['main-footer', !products?.length ? 'only-footer' : ''].join(' ')}`}
    >
      <section className="footer-section">
        <p>
          &copy; {new Date().getFullYear()} YourStoreName. All Rights Reserved.
        </p>
      </section>
    </footer>
  );
};

export default Footer;
