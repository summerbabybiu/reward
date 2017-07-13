/**
 * Created by summerbaby on 2017/7/13.
 */
var back = new Vue({
    el: '#back',
    data: {
        gifts: [
            {'name':'小恶魔零钱包','leaveNum': 0, 'fafangNum': 0, 'winningRate': 0},
            {'name':'天使波利抱枕','leaveNum': 0, 'fafangNum': 0, 'winningRate': 0},
            {'name':'小波利（蓝）','leaveNum': 0, 'fafangNum': 0, 'winningRate': 0},
            {'name':'恶魔猫发箍','leaveNum': 0, 'fafangNum': 0, 'winningRate': 0},
            {'name':'神秘箱子冰箱贴','leaveNum': 0, 'fafangNum': 0, 'winningRate': 0},
            {'name':'趴趴猫发箍（黑','leaveNum': 0, 'fafangNum': 0, 'winningRate': 0},
            {'name':'小波利（黄）','leaveNum': 0, 'fafangNum': 0, 'winningRate': 0},
            {'name':'沪牌包','leaveNum': 0, 'fafangNum': 0, 'winningRate': 0},
            {'name':'趴趴猫发箍（黄）','leaveNum': 0, 'fafangNum': 0, 'winningRate': 0},
            {'name':'小恶魔挂件','leaveNum': 0, 'fafangNum': 0, 'winningRate': 0},
            {'name':'小波利（粉）','leaveNum': 0, 'fafangNum': 0, 'winningRate': 0},
            {'name':'恶魔招财猫','leaveNum': 0, 'fafangNum': 0, 'winningRate': 0},
        ],
    },
    methods: {
        elementHide: function (ele) {
            var targetInput =  $('.content-tr .input'+ele)[0];
            var targetModify =  $('.content-tr .modify'+ele)[0];
            var targetSure =  $('.content-tr .sure'+ele)[0];
            targetInput.readOnly=false;
            targetModify.style.display = "none";
            targetSure.style.display = "";
        },
        saveNum: function (inx) {
            console.log(back.gifts[inx]['leaveNum']);
            var targetInput =  $('.content-tr .input'+inx)[0];
            console.log(targetInput.value,back.gifts[inx]['fafangNum']);

            if (targetInput.value !== ''){
                back.gifts[inx]['fafangNum'] = targetInput.value - back.gifts[inx]['leaveNum'] +back.gifts[inx]['fafangNum'];
                back.gifts[inx]['leaveNum'] = targetInput.value;



            } else {
                alert('请填写库存');
            }
        }
    }
});


if(localStorage.gifts) {//发放总量
    back.gifts = JSON.parse(localStorage.gifts);
} else {
    localStorage.gifts = JSON.stringify(back.gifts);
}

