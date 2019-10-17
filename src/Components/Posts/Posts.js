import React from 'react';
import '../Posts/Posts.css'

class Posts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
        };

        this.userId = this.props.match.params.userId;
    }

    componentDidMount(){
        fetch(`http://jsonplaceholder.typicode.com/posts/${this.userId}`)
        .then(res => res.json())
        .then(posts => {
            const createPostList = this.createList(posts);

            createPostList.forEach(post => {
                fetch(`http://jsonplaceholder.typicode.com/comments/${post.id}`)
                    .then(comments => comments.json())
                    .then(comments => {
                        this.setState({
                            products: [
                                ...this.state.products,
                                { post, comments: this.createList(comments)}
                            ]
                        });
                    });
            });
        }).catch(error => console.log(error))
    }

    createList(data) {
        let result = [];
        if(Array.isArray(data)) {
            result = data;
        } else {
            result.push(data);
        }
        return result;
    }
    
    render(){
        return(
            <div className='wrapper'>
                {this.state.products.map(product => (
                    <div key={product.post.id}>
                        <h4 className="postTitle">Post</h4>
                        <img className='postImg' src='https://cdn2.iconfinder.com/data/icons/boy-emoji-avatars/30/flat_man_emoji_tongue_3_avatar_emoticon_face_profile-512.png'></img>
                        <div className='post'>{product.post.body}</div>
                        <div>
                            {product.comments.map(comment => (
                                <ul key={comment.id}>
                                    <h4 className='commentsTitle'>comments</h4>
                                    <img className='commentImg' src='https://cdn3.iconfinder.com/data/icons/avatars-29/100/Avatar-05-512.png'></img>
                                    <li className="commentInfo">
                                        <div >{comment.name}</div>
                                        <div >{comment.body}</div>
                                    </li>
                                </ul>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        ); 
    }
}

export default Posts;