import { Fragment } from 'react';
import classes from './ResultsView.module.css';

const resultsView = props => {
    const sortedOptions = [...props.options];
    sortedOptions.sort(function (first, second) {
        return second.score - first.score;
    });

    return (
        <div className={classes.ResultsView}>
            <h1>Results</h1>
            <div className={classes.resultsGrid}>
                {sortedOptions.map(option => {
                    return <Fragment>
                        <div style={{ backgroundImage: `url(${option.image})` }} className={classes.resultImage}></div>
                        <div className={classes.resultData}>
                            <h3>{option.name}</h3>
                            <p>{option.score} points</p>
                        </div>
                    </Fragment>
                })}
            </div>
        </div>
    );
}

export default resultsView;