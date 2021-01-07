import classes from './OptionView.module.css';
import Picker from '../../components/Picker/Picker';

const optionView = props => {
    return (
        <div className={classes.OptionView}>
            <h1>Which is better?</h1>
            <p>The winning option gets 1 point.</p>
            <Picker pickedHandler={(choiceId) => {
                props.optionPickedHandler(props.displayedOptions, choiceId);
            }}
                options={props.displayedOptions} />
        </div>
    );
}

export default optionView;