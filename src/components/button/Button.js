import { Button } from "antd";
import '../button/Button.css';


const ButtonComponent = ({ type, addButtonHandler, buttonName }) => {

    return (
        <div className="button">
            <Button type={type} onClick={addButtonHandler}>{buttonName}</Button>
        </div>
    );
}

export default ButtonComponent;