import classes from './ResultsView.module.css';

const resultsView = props => {
    const sortedOptions = [...props.options];
    sortedOptions.sort(function (first, second) {
        return second.score - first.score;
    });

    return (
        <div className={classes.ResultsView}>
            <h1>Results</h1>
            {sortedOptions.map((option, index) => {
                return (
                    <div key={option.id}>
                        <div className={classes.resultContainer} key={option.name}>
                            <div className={classes.result} key={option.name}>
                                <div><img src={option.image} alt={option.name} /></div>
                                <div className={classes.resultData}>
                                    <h3>{option.name}</h3>
                                    <p>{option.score} points</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default resultsView;