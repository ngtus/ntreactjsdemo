import React, { Component } from 'react';

class PostDetail extends React.Component {
    render() {
        return  <table>
        <tr>
        <td>Id</td>
            <td>{this.props.id}</td>
        </tr>
        <tr>
        <td>UserId</td>
            <td>{this.props.userId}</td>
        </tr>
        <tr>
        <td>Title</td>
            <td>{this.props.title}</td>
        </tr>
        <tr>
            <td>Body</td>
            <td>{this.props.body}</td>
        </tr>
    </table>;
    }
}

export default PostDetail;