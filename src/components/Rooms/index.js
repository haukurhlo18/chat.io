import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Rooms extends React.Component {
    render() {
        const { rooms } = this.props;
        console.log('yeah', rooms);
        return (
            <div id={'rooms'}>
                { Object.keys(rooms).map(room => (<div key={room}>{room}</div>)) }
            </div>
        );
    }
}

Rooms.propTypes = {
    rooms: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        rooms: state.rooms.rooms,
    }
};

export default connect(
    mapStateToProps,
    null
)(Rooms);
