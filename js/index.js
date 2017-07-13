var all_array =[1,0,0,0,0,0,0,0,0,0,0,0];
function guess(myArray) {
    var sum = 0;
    var fanwei = [];
    if(myArray.length ==12) {
        var theIndex = 0;

        myArray.forEach(function (value, index, array) {
            sum += myArray[index];
            fanwei[index] = sum;
        });
        console.log('fanwei'+fanwei);

        var randomNum = Math.random()*fanwei[11]|0;
        console.log('randomNum'+randomNum);

        var imy =1;
        while (imy<12) {
            if (fanwei[imy-1]<=randomNum && randomNum<fanwei[imy]) {
                theIndex = imy;
            }
            imy++;
        }
        console.log('theIndex'+theIndex);
        return theIndex;
    }
}


var lottery={
    index:0,	//当前转动到哪个位置
    count:0,	//总共有多少个位置
    timer:0,	//setTimeout的ID，用clearTimeout清除
    speed:200,	//初始转动速度
    times:0,	//转动次数
    cycle:50,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
    prize:-1,	//中奖位置
    init:function(id){
        if ($("#"+id).find(".lottery-unit").length>0) {
            $lottery = $("#"+id);
            $units = $lottery.find(".lottery-unit");
            this.obj = $lottery;
            this.count = $units.length;
            $lottery.find(".lottery-unit-"+this.index).addClass("active");
        };
    },
    roll:function(){
        var index = this.index;
        var count = this.count;
        var lottery = this.obj;
        $(lottery).find(".lottery-unit-"+index).removeClass("active");
        index += 1;
        if (index>count-1) {
            index = 0;
        };
        $(lottery).find(".lottery-unit-"+index).addClass("active");
        this.index=index;
        return false;
    },
    stop:function(index){
        this.prize=index;
        return false;
    }
};

function roll(){
    lottery.times += 1;
    lottery.roll();
    if (lottery.times > lottery.cycle+10 && lottery.prize==lottery.index) {
        clearTimeout(lottery.timer);
        $('.tip-pop .gift-pic').addClass('gift-pic-'+lottery.prize);
        $('.tip-pop .gift-detail').html($('.lottery-unit-'+lottery.prize).html());
        $('.tip-pop').show();
        lottery.prize=-1;
        lottery.times=0;
        click=false;
    }else{
        if (lottery.times<lottery.cycle) {
            lottery.speed -= 10;
        }else if(lottery.times==lottery.cycle) {
            console.log(all_array);
            lottery.prize = guess(all_array);
            all_array[lottery.prize] -= 1;
        }else{
            if (lottery.times > lottery.cycle+10 && ((lottery.prize==0 && lottery.index==11) || lottery.prize==lottery.index+1)) {
                lottery.speed += 110;
            }else{
                lottery.speed += 20;
            }
        }
        if (lottery.speed<40) {
            lottery.speed=40;
        };
           console.log(lottery.times+'^^^^^^'+lottery.speed+'^^^^^^^'+lottery.prize);
        lottery.timer = setTimeout(roll,lottery.speed);
    }
    return false;
}

var click=false;

window.onload=function(){
    lottery.init('lottery');
    $(document).keypress(function (e) {
        if (e.keyCode == 32){
            if (click) {
                return false;
            }else{
                if(all_array[0] ==0 && guess(all_array) ==0 ) {
                    console.log('end');
                    $('.sorry-pop').show();
                    return false;
                } else  {
                    lottery.speed=100;
                    roll();
                    click=true;
                    return false;
                }
            }
        }
    })
};

$('.sorry-pop .sure-button').on('click',function () {
    $('.sorry-pop').hide();
});
$('.tip-pop .sure-button').on('click',function () {
    $('.tip-pop .gift-pic')[0].className = 'gift-pic';
    $('.tip-pop .gift-detail').html('');
    $('.tip-pop').hide();

});
console.log(localStorage.lastname);


