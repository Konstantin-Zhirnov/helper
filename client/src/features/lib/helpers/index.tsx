import React from "react";

import {PostType} from "../../Posts/types";
import {Post} from "../../Posts/components/Post";


export const renderPostItem = (post: PostType) => (
    <Post
        key={post._id}
        _id={post._id}
        title={post.title}
        description={post.description}
        location={post.location}
        time={post.time}
        postAuthorId={post.authorId._id}
        name={post.authorId.name}
        photo={post.authorId.photo}
        email={post.authorId.email}
        phone={post.authorId.phone}
        whatsapp={post.authorId.whatsapp}
        telegram={post.authorId.telegram}
        stars={post.authorId.stars}
        countReviews={post.authorId.countReviews}
        images={post.images}
    />
)