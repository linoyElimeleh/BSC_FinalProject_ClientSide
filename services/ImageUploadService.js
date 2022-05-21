
export const uploadImage = async (imageBody) => {
    try {
        const response = await fetch('http://todobom.cs.colman.ac.il/uploadfile/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accept': 'application/json'
                },
                body: imageBody
            });
        const json = await response.json();
        return json
    } catch (error) {
        console.error(error);
        return (error)
    }
};