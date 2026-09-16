import { Link } from 'react-router-dom';

export default function MenuItem({ to, children }) {
    return (
        <Link 
            to={to} 
            style={{ 
                margin: '0 10px', 
                textDecoration: 'none', 
                color: 'black' 
            }}
        >
            {children}
        </Link>
    );
}