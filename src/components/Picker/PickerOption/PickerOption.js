import classes from './PickerOption.module.css';

const pickerOption = props => {
    return (
        <div className={classes.PickerOption} onClick={props.pickedHandler}>
            <div className={classes.imageBox} style={{ backgroundImage: `url(${props.image})` }}></div>
            <div className={classes.imageCaption}>{props.caption}</div>
        </div>
    )
}

export default pickerOption;