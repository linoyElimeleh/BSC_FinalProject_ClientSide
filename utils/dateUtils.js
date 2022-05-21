function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
};

export function formatDate(date) {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('-');
};

export function createImageFormData(imagePath) {
    const form = new FormData();
    form.append('file', {
        uri: imagePath,
        type: 'image/jpeg/jpg',
        name: 'test.jpg',
    })
    return form;
};