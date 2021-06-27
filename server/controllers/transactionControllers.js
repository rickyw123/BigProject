const Transaction = require('./../models/Transaction');
const ErrorHandler = require('./../utils/ErrorHandler');
const catchAsyncError = require('./../middlewares/catchAsyncError');

const transactionControllers = {
  getAllTransactions: catchAsyncError(async (req, res, next) => {
    const transactions = await Transaction.find({userId: req.user.id});
    return res.status(200).json({
      success: true,
      transactions
    })
  }),
  createTransaction: catchAsyncError(async (req, res,  next) => {
    const {userId, item, total} = req.body;
    const transaction = new Transaction({
      userId,
      item,
      total,
      status: "Sudah Bayar"
    });
    await transaction.save();
    return res.status(200).json({
      success: true,
      transaction
    })
  })
}

module.exports = transactionControllers;