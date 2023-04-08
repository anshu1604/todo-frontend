import { Button } from '@mui/material';

const BasicButton = (props) => {
    const { buttonVarient, buttonName, buttonColor, handleClick, buttonId } = props;
    return (
        <Button className='button-comm' id={buttonId} variant={buttonVarient} color={buttonColor} onClick={handleClick}>{buttonName}</Button>
    );
}

export default BasicButton;