import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

/**
 * Function to render a single post card.
 * @param {string} $id - The ID of the post.
 * @param {string} title - The title of the post.
 * @param {string} featuredImage - The ID of the featured image of the post.
 * @returns {JSX.Element} A JSX element that renders the post card.
 */
function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl"
          ></img>
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
