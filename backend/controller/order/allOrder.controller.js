const orderModel = require("../../models/orderProductModel");
const userModel = require("../../models/userModel");

const allOrderController = async(Request,Response) => {
    const userId = Request.userId

    const user = await userModel.findById(userId)

    if(user.role !== 'ADMIN'){
        return Response.status(500).json({
            message : "not access"
        })
    }

    const AllOrder = await orderModel.find().sort({ createdAt : -1 });

    return Response.status(200).json({
        data : AllOrder,
        success : true
    })
}

module.exports = allOrderController