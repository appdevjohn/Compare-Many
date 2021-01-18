import { NavLink } from 'react-router-dom';
import classes from './NavBar.module.css';

const navBar = props => {
    return (
        <div className={classes.NavBar}>
            <ul>
                {props.topics.map(topic => {
                    return <NavLink to={'/' + topic.id} key={topic.id} activeClassName={classes.active}>{topic.name}</NavLink>
                })}
            </ul>
        </div>
    );
}

export default navBar;