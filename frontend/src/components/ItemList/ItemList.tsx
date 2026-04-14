import './ItemList.css';
import { handleLongtext } from '../../utils/utils';
import Button from '../Button/Button';
import type { WinItem } from '../../types/types';

export default function ItemList({items, onDeleteItem}: {items: WinItem[]; onDeleteItem: (id: string) => void}) {
    return (
        <ul className="item-list">
            {items.map((item) => (
                <li className="item-list-item" key={item.id}>
                    <span className="item">{handleLongtext(item.text)}</span>
                    <Button buttonText="Delete" onClickAction={() => onDeleteItem(item.id)} /> 
                </li>
            ))}
        </ul>
    );
}