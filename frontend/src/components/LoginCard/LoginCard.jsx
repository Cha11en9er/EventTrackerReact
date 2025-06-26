import './LoginCard.css';

export default function LoginCard({ CardTitle, CardDescription, className }) {
    return (
        <div className={`LoginCard ${className || ''}`}>
            <h4>{CardTitle}</h4>
            <p>{CardDescription}</p>
        </div>
    );
}