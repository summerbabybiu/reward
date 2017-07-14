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
        modifyState: [
            false,false,false,false,false,false,false,false,false,false,false,false 
        ]
    },
    methods: {
        elementHide: function (index) {
            this.modifyState[index] = true;
            this.$forceUpdate();
            if(localStorage.gifts) {//发放总量
                back.gifts = JSON.parse(localStorage.gifts);
                this.calculateWinRate;
            }
        },
        cancelHide: function (index) {
            this.modifyState[index] = false;
            this.$forceUpdate();
        },
        saveNum: function (inx) {
            console.log(back.gifts[inx]['leaveNum']);
            var targetInput =  $('.content-tr .input'+inx)[0];
            if (targetInput.value !== ''){
                var inputValue = parseInt(targetInput.value);
                if (inputValue < 0) { inputValue = 0;}
                back.gifts[inx]['leaveNum'] = inputValue;
            } else {
                alert('请填写库存');
            }
            this.calculateWinRate();
            localStorage.gifts = JSON.stringify(back.gifts);
            this.modifyState[inx] = false;
            this.$forceUpdate();
        },
        calculateWinRate: function () {
            var total = this.totalGiftNum;

            this.gifts.forEach(function(element) {
                if (total==0) {
                    element["winningRate"] = 0
                } else {
                    element["winningRate"] =  (element["leaveNum"] / total *100).toFixed(2);
                }
            });
        }
    },
    computed: {
        totalGiftNum: function () {
            return this.gifts.reduce(function (pre, current, index, arr) {
                if (pre instanceof Object) {
                    return pre["leaveNum"] + current["leaveNum"];
                }
                return pre + current["leaveNum"];
            });
        },
        totalFafangNum: function () {
            return this.gifts.reduce(function (pre, current, index, arr) {
                if (pre instanceof Object) {
                    return pre["fafangNum"] + current["fafangNum"];
                }
                return pre + current["fafangNum"];
            });
        }
    }
});


if(localStorage.gifts) {//发放总量
    back.gifts = JSON.parse(localStorage.gifts);
} else {
    localStorage.gifts = JSON.stringify(back.gifts);
}
// var lastMutex = localStorage.mutex;
// function checkMutex() {
//     var mutex = localStorage.mutex;
//     console.log("check mutex" + mutex);
//     if (mutex !== lastMutex) {
//         // alert("刷新啦");
//         location.reload();
//     }
//     setTimeout(checkMutex, 1000);
// }
//
//
// setTimeout(checkMutex, 1000);
back.calculateWinRate();
