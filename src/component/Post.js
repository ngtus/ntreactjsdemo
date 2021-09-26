import React, { Component } from 'react';
import {
    Link,
} from "react-router-dom";

class Post extends React.Component {
    render() {
        return <tr>
            <td>{this.props.id}</td>
            <td>{this.props.userId}</td>
            <td>{this.props.title}</td>
            <td>{this.props.body}</td>
            <td onClick={() => this.props.detail()}>Detail</td>
            <td onClick={() => this.props.delete()}>Delete</td>
        </tr>;
    }
}

export default Post;