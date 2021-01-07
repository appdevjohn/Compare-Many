import classes from './Picker.module.css';
import PickerOption from './PickerOption/PickerOption';

const picker = props => {
    return (
        <div className={classes.Picker}>
            <PickerOption
                caption={props.options.first.name}
                image={props.options.first.image}
                pickedHandler={props.pickedHandler.bind(this, props.options.first.id)} />
            <PickerOption
                caption={props.options.second.name}
                image={props.options.second.image}
                pickedHandler={props.pickedHandler.bind(this, props.options.second.id)} />
        </div>
    )
}

export default picker;