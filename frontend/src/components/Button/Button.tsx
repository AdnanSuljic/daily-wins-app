import './Button.css';

export default function Button({ buttonText, onClickAction }: { buttonText: string; onClickAction?: () => void }) {
  return (
    <button className={buttonText == 'Delete' ? 'delete-button' : 'button'} onClick={onClickAction}>
      {buttonText}
    </button>
  );
}