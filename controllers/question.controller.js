const Form = require("../models/form.model");
const Question = require("../models/question.model")

const create = async (req, res) => {
    const { questionObj } = req.body;
    try {
        let question = await Question.create(questionObj);
        const questionId = question._id;
        var updateObj = {
            $addToSet: { questions: questionId },
        };

        const form = await Form.findByIdAndUpdate(questionObj?.form, updateObj, { new: true })
            .populate({
                path: 'user',
                select: '_id name email'
            })
            .populate({
                path: 'questions',
                //  populate: {
                //     path: 'options',
                //     model: 'Option'
                // }
            })
            .populate({
                path: 'questions',
                // populate: {
                //     path: 'optionCols',
                //     model: 'Option'
                // }
            })
        res.status(200).json(form);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error)
    }
}
module.exports = {
    create
}