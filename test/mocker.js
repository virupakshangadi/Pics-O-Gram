export const mockRequest = () => {
    const mockRequestObject = {};
    mockRequestObject.query = jest.fn().mockReturnValue(mockRequestObject);
    mockRequestObject.params = jest.fn().mockReturnValue(mockRequestObject);
    mockRequestObject.body = jest.fn().mockReturnValue(mockRequestObject);
    return mockRequestObject;
}

export const mockResponse = () => {
    const response = {};
    response.status = jest.fn().mockReturnValue(response);
    response.json = jest.fn().mockReturnValue(response);
    response.send = jest.fn().mockReturnValue(response);
    return response;
}