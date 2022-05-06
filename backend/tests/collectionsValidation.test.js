require('dotenv').config();
const validateCollectionsInput = require('../validation/collections');

// Testing the collections validation functionality in the backend
describe('Collections validation', () => {
    let data;
    beforeEach(() => {
        jest.clearAllMocks();
        data = {
            imgName: 'TestImgName'
        }
    });

    // Valid fields
    it('Should return no error if the input fields are valid', async () => {
        const res = await validateCollectionsInput(data);
        expect(res.isValid).toBe(true);
    });

    // Empty imgName field
    it('Should return an error if the imgName is empty', async () => {
        data.imgName = '';
        const res = await validateCollectionsInput(data);
        expect(res.isValid).toBe(false);
        expect(res.errors.imgName).toBe('ImgName field is required');
    });
});
