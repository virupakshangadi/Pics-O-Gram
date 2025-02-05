import { deletePost, getAllPosts } from "../src/controllers/postController.js";
import { mockRequest, mockResponse } from "./mocker.js";
import postService from '../src/services/postService.js';
import { when } from 'jest-when';
const paginatedPosts = [
{
    caption: "This is a sample post",
    image: "https://www.sample.com/sample.jpg",
    user: "sample_user_id"
},
{
    caption: "This is a sample post",
    image: "https://www.sample.com/sample.jpg",
    user: "sample_user_id"
}
]

jest.mock('../src/services/postService.js', () => {
    return {
        getAllPostsService: jest.fn(),
        deletePostService: jest.fn()
    }
});

test('getAllPosts should return all posts', async () => {
    const req = mockRequest();
    const res = mockResponse();
    postService.getAllPostsService.mockResolvedValue(paginatedPosts);
    await getAllPosts(req, res);

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "All posts fetched successfully",
        data: paginatedPosts
    });
});

test('getAllPosts should handle service exception', async () => {
    const req = mockRequest();
    const res = mockResponse();

    postService.getAllPostsService.mockRejectedValue(new Error('Internal Server Error'));

    await getAllPosts(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Internal Server Error"
    });
});


test('deletePost should delete a post', async () => {
    const req = mockRequest();
    const res = mockResponse();

    req.params.id = 'sample_post_id';
    req.user = {
        _id: 'sample_user_id'
    }

    when(postService.deletePostService).calledWith('sample_post_id', 'sample_user_id').mockResolvedValue(true);

    await deletePost(req, res);


    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Post deleted successfully",
        data: true
    })
});

test('deletePost should handle post not found', async () => {
    const req = mockRequest();
    const res = mockResponse();

    req.params.id = 'sample_post_id';
    req.user = {
        _id: 'sample_user_id'
    }

    when(postService.deletePostService).calledWith('sample_post_id', 'sample_user_id').mockResolvedValue(false);

    await deletePost(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Post not found"
    })
});

test('deletePost should handle service exception', async () => {
    const req = mockRequest();
    const res = mockResponse();

    req.params.id = 'sample_post_id';
    req.user = {
        _id: 'sample_user_id'
    }

    when(postService.deletePostService).calledWith('sample_post_id', 'sample_user_id').mockRejectedValue(new Error('Internal Server Error'));

    await deletePost(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Internal Server Error"
    });
});

test('deletePost should handle service exception with custom error', async () => {
    const req = mockRequest();
    const res = mockResponse();

    req.params.id = 'sample_post_id';
    req.user = {
        _id: 'sample_user_id'
    }

    when(postService.deletePostService).calledWith('sample_post_id', 'sample_user_id').mockRejectedValue({
        status: 400,
        message: "Custom Error"
    });

    await deletePost(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Custom Error"
    });
})