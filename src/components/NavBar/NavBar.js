import classes from './NavBar.module.css';

const navBar = props => {
    return (
        <div className={classes.NavBar}>
            <ul>
                {props.topics.map(topic => {
                    return <button key={topic.id} onClick={props.topicPicked.bind(this, topic.id)}>{topic.name}</button>
                })}
            </ul>
        </div>
    );
}

export default navBar;