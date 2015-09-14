var Q = require('q');
var mongoose = require('mongoose');
var Order = require('../../models/order.js');
var User = require('../../models/user.js');

//获取当前所有用户的性别分组
function getGenderArray(){
	console.log("start user aggregate");
	var promise = User.aggregate(
		{$group:{_id:"$gender", IdArray:{$addToSet: "$userId"}}},
		function(err,result){
			console.log("user aggregate finished ");
			if(1 == result[0]._id){
				maleArray = result[0].IdArray;
				femaleArray = result[1].IdArray;
			}else{
				maleArray = result[1].IdArray;
				femaleArray = result[0].IdArray;
			}
		}
	);
	return promise;
}	
	
//对所有userId在array中的用户订单，根据车辆类别进行聚合
function getTypeResult(array){
	console.log("start male type");
	return Order.aggregate(
				{$match: {userId:{$in:array}}},
				{$group:{_id:"$car.type","type":{$first:"$car.type"},"count":{$sum:1}}},
				function(err,result){
					if(err){
						console.error(err);
					}
					console.log("maleType finished");
				}
	);
}

//对所有userId在array中的用户订单，根据车辆颜色进行聚合
function getColorResult(array){
	console.log("start male color");
	var promise = Order.aggregate(
				[{$match: {userId:{$in:array}}},
				{$group:{_id:"$car.color","color":{$first:"$car.color"},"count":{$sum:1}}}],
				function(err,result){
					if(err){
						console.error(err);
					}
					console.log("maleColor finished");
				}
	);
	return promise;
}

/*
 * 根据用户性别对订单进行分类，返回的json格式为
 * {
 *	 male: {
 *		 color: [{_id:1, type:1, count:1}, ...],
 *		 type : [{_id:1, type:1, count:1}, ...]
 *	 },
 *	 female:{
 *		 color: [{_id:1, type:1, count:1}, ...],
 *		 type : [{_id:1, type:1, count:1}, ...]
 *	 }
 * }
 */
exports.all = function(req,res,next){
	
	getGenderArray().then(
		function(result){
			var maleArray,femaleArray;
			
			if(1 == result[0]._id){
				maleArray = result[0].IdArray;
				femaleArray = result[1].IdArray;
			}else{
				maleArray = result[1].IdArray;
				femaleArray = result[0].IdArray;
			}
			Q.all(
				[getColorResult(maleArray),getTypeResult(maleArray),getColorResult(femaleArray),getTypeResult(femaleArray)]
			).done(
				function(values){
					if(values.length==4){
						var resultJson = {
							male:  	{
								color: values[0],
								type:  values[1]
							},
							female:	{
								color: values[2],
								type: values[3]
							}
						};
						res.status(200).json(resultJson);
					}
				},
				function(err){
					res.status(500).json({
						message: err
					});
				}
			);
		},
		function(err){
			if(err){
				console.error(err);
				res.status(500).json({
						message: err
					});
			}
		}
	); 
	
}