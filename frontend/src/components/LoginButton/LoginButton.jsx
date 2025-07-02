import './LoginButton.css';

export default function LoginButton({ ButtonText, onClick }) {
    return (
        <button onClick={onClick} className="LoginButton">
            {ButtonText}
        </button>
    );
}