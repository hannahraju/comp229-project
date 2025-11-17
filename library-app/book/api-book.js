const API_BASE = '/api/books'
const handleResponse = async (response) => {
    try {
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Failed to parse response JSON:", err);
        throw err;
    }
};

const handleError = (err) => {
    console.error("API call failed:", err);
    throw err;
};

const create = async (book) => {
    try {
        const response = await fetch(API_BASE, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(book),
        });
        return await handleResponse(response);
    } catch (err) {
        return handleError(err);
    }
};

const list = async (signal) => {
    try {
        const response = await fetch(API_BASE, {
            method: "GET",
            signal: signal,
        });
        return await handleResponse(response);
    } catch (err) {
        return handleError(err);
    }
};


const read = async ({ bookId }, signal) => {
    try {
        const response = await fetch(`${API_BASE}/${bookId}`, {
            method: "GET",
            signal: signal,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        return await handleResponse(response);
    } catch (err) {
        return handleError(err);
    }
};

const update = async ({ bookId }, user) => {
    try {
        const response = await fetch(`${API_BASE}/${bookId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
        });
    return await handleResponse(response);
    } catch (err) {
        return handleError(err);
    }
};

const remove = async ({ bookId }) => {
    try {
        const response = await fetch(`${API_BASE}/${bookId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
    return await handleResponse(response);
    } catch (err) {
        return handleError(err);
    };
}
export { create, list, read, update, remove }