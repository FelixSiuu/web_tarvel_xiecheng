window.addEventListener('load', function() {
    // 1.獲取元素
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    var ol = focus.children[1];
    // 獲得focus的寬度
    var focusWidth = focus.offsetWidth;
    // 2.利用計算器自動輪播
    var index = 0;
    var timer = setInterval(function() {
        index++;
        var translatex = index * -focusWidth; // 控制ul移動的位置 核心
        ul.style.transition = 'all 2s'; // 過度效果transition
        ul.style.transform = 'translateX(' + translatex + 'px)';
    }, 5000);
    // 需要等過渡完成後再開始判斷 利用transitionend()
    ul.addEventListener('transitionend', function() {
        // 無縫滾動
        if (index >= 3) {
            index = 0;
            // 需要先去掉過度
            ul.style.transition = 'none';
            var translatex = index * -focusWidth;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        } else if (index < 0) {
            index = 2;
            ul.style.transition = 'none';
            var translatex = index * -focusWidth;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        // 3.小圓點的變化  
        // 把ol裡面li帶有current類名的選出來去掉類名(remove)
        ol.querySelector('.current').classList.remove('current');
        // 讓當前索引號的li加上類名(add) 利用上面寫的index變量
        ol.children[index].classList.add('current')
            // 要注意小圓點的變化必須也在transitionend裡面，否則小圓點會事前變化而圖片尚在滾動中
    });
    // 4.手指滑動輪播圖
    var startX = 0; //  獲取手指初始位置
    var moveX = 0; //   獲取手指移動的距離
    var flag = false;
    // 觸摸元素 獲得初始座標
    ul.addEventListener('touchstart', function(e) {
            startX = e.targetTouches[0].pageX;
            clearInterval(timer);
        })
        // 移動元素 並計算元素移動的距離
    ul.addEventListener('touchmove', function(e) {
        moveX = e.targetTouches[0].pageX - startX;
        var translatex = -index * focusWidth + moveX;
        // 手指不需要過度效果 所以需要取消過度效果
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        e.preventDefault(); // 阻止屏幕滾動的行為
        flag = true;
    });
    // 5.手指離開 判斷時該前往下一張還是上一張
    ul.addEventListener('touchend', function(e) {
        //  變量flag用來判斷用戶是否移動過ul，若移動過再執行下面語句
        if (flag == true) {
            // 判斷前往上一張還是下一張 利用Math.abs()絕對值得出手指左滑或者右滑動的幅度
            if (Math.abs(moveX) > 50) {
                if (moveX > 0) {
                    index--;
                    translatex = index * -focusWidth;
                    ul.style.transition = 'all 2s';
                    ul.style.transform = 'translateX(' + translatex + 'px)';
                } else {
                    index++;
                    var translatex = index * -focusWidth;
                    ul.style.transition = 'all 2s';
                    ul.style.transform = 'translateX(' + translatex + 'px)';
                }
                // 當滑動幅度過小，判斷返回左邊與右邊
            } else {
                translatex = index * -focusWidth;
                ul.style.transition = 'all 1s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }
        }
        clearInterval(timer);
        timer = setInterval(function() {
            index++;
            var translatex = index * -focusWidth; // 控制ul移動的位置 核心
            ul.style.transition = 'all 2s'; // 過度效果transition
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }, 5000);
    });

    // 回到頂部
    function animateWindow(obj, target) {
        obj.timer = setInterval(function() {
            var step = (target - window.pageYOffset) / 10;
            step = step < 0 ? Math.floor(step) : Math.ceil(step);
            if (window.pageYOffset == target) {
                clearInterval(obj.timer);
            }
            window.scroll(0, window.pageYOffset + step) // 先快後慢
        }, 15);
    }
    var goBack = document.querySelector('.goBack');
    var nav = document.querySelector('.loacl-nav')
    document.addEventListener('scroll', function() {
        if (window.pageYOffset >= nav.offsetTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }
    });
    goBack.addEventListener('click', function() {
        animateWindow(window, 0);
    });
});