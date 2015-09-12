var Q = require('q');
var mongoose = require('mongoose');
var Order = require('../../models/order.js');
var User = require('../../models/user.js');
var resultJson = {
		male:  	{},
		female:	{}
};
var maleArray,femaleArray;

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
	
function getMaleTypeResult(){
	console.log("start male type");
	return Order.aggregate(
				{$match: {userId:{$in:maleArray}}},
				{$group:{_id:"$car.type","type":{$first:"$car.type"},"count":{$sum:1}}},
				function(err,result){
					if(err){
						console.error(err);
					}
					
					//console.log(result);
					resultJson.male.type = result;
					console.log("maleType finished");
				}
	);
}

function getMaleColorResult(){
	console.log("start male color");
	var promise = Order.aggregate(
				[{$match: {userId:{$in:maleArray}}},
				{$group:{_id:"$car.color","color":{$first:"$car.color"},"count":{$sum:1}}}],
				function(err,result){
					if(err){
						console.error(err);
					}
					
					//console.log(result);
					resultJson.male.color = result;
					console.log("maleColor finished");
				}
	);
	return promise;
}

function getFemaleTypeResult(){
	console.log("start female type");
	return Order.aggregate(
				{$match: {userId:{$in:femaleArray}}},
				{$group:{_id:"$car.type","type":{$first:"$car.type"},"count":{$sum:1}}},
				function(err,result){
					if(err){
						console.error(err);
					}
					
					//console.log(result);
					resultJson.female.type = result;
					console.log("femaleType finished");
				}
	);
}

function getFemaleColorResult(){
	console.log("start female color");
	return Order.aggregate(
				{$match: {userId:{$in:femaleArray}}},
				{$group:{_id:"$car.color","color":{$first:"$car.color"},"count":{$sum:1}}},
				function(err,result){
					if(err){
						console.error(err);
					}
					
					//console.log(result);
					resultJson.female.color = result;
					console.log("femaleColor finished");
				}
	);
}

exports.all = function(req,res,next){
	
	getGenderArray().then(
		function(result){
			if(1 == result[0]._id){
				maleArray = result[0].IdArray;
				femaleArray = result[1].IdArray;
			}else{
				maleArray = result[1].IdArray;
				femaleArray = result[0].IdArray;
			}
			Q.all(
				[getMaleColorResult(maleArray),getMaleTypeResult(maleArray),getFemaleTypeResult(femaleArray),getFemaleColorResult(femaleArray)]
			).done(
				function(values){
					if(values.length==4){
						res.status(200).render('analyse/display');
					}
				},
				function(err){
					res.status(500).json({
						message: err
					})
				}
			);
		},
		function(err){
			if(err){
				console.error("1 "+err);
			}
		}
	); 
	
}