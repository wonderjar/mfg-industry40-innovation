var users = [];
module.exports = {
    UserFun: function(){
        for(var k = 0;k<100;k++){
            var b = {
                _id: 1000+k+"",
                sex: Math.round(Math.random()) + 1
            };
            //console.log(JSON.stringify(b));
            users.push(b);
        }
        //console.log(users);
    },
    UserObject: users
};