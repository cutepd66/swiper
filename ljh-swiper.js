function LjhSwiper(options) {
    console.log(options);

    //获取用户传过来的轮播图容器
    var Box = document.querySelector(options.el);

    //创建style元素
    var styleEle = document.createElement("style");
    styleEle.innerHTML = `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    .swiper {
        width: 900px;
        height: 300px;
        position: relative;
    }
    
    .imgList {
        width: 100%;
        height: 100%;
    }
    
    .imgItem {
        width: 100%;
        height: 100%;
        background-size: 100% 100%;
        position: absolute;
        opacity: 0;
        transition: opacity 0.6s;
    }
    
    .imgItem.active {
        opacity: 1;
    }
    
    .btns {
        position: absolute;
        width: 100%;
        height: 50px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        justify-content: space-between;
    }
    
    .btns .prevBtn,
    .btns .nextBtn {
        width: 50px;
        height: 50px;
        background-color: rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 24px;
    }
    .btns .prevBtn:hover,
    .btns .nextBtn:hover{
        cursor: pointer;
    }
    
    .circleList {
        height: 10px;
        position: absolute;
        bottom: 20px;
        right: 20px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
    
    .circleList .circleItem {
        width: 10px;
        height: 10px;
        margin: 0 4px;
        border-radius: 50%;
        border: 2px solid #7f7f7f;
        background-color: #ccc;
    }
    .circleList .circleItem:hover{
        cursor: pointer;
    }
    .circleItem.active {
        background-color: #fff;
    }
    
    .circleList .circleItem.active {
        background-color: #fff;
    }
    `;
    //将styleEle添加到容器中
    Box.appendChild(styleEle);

    //下面是创建元素部分

    // 轮播图容器swiper
    var swiperBox = document.createElement("div");
    //根据传过来的options中的width和height设置轮播图的宽高
    swiperBox.style.width = options.width + "px";
    swiperBox.style.height = options.height + "px";
    swiperBox.classList.add("swiper");
    //创建imgList
    var imgList = document.createElement("div");
    imgList.classList.add("imgList");

    //根据options中的imgs来动态创建imgItem
    for (var i = 0; i < options.imgs.length; i++) {
        //创建imgItem
        var imgItem = document.createElement("div");
        imgItem.classList.add("imgItem");
        if (i == 0) {
            imgItem.classList.add("active");
        }
        imgItem.style.backgroundImage = "url(" + options.imgs[i] + ")";
        imgList.appendChild(imgItem);
    }
    //imgList添加到Box中
    swiperBox.appendChild(imgList);


    //创建btns
    var btns = document.createElement("div");
    btns.classList.add("btns");

    //创建prevBtnEle
    var prevBtnEle = document.createElement("div");
    prevBtnEle.classList.add("prevBtn");
    prevBtnEle.innerHTML = "<";
    btns.appendChild(prevBtnEle);
    //创建nextBtnEle
    var nextBtnEle = document.createElement("div");
    nextBtnEle.classList.add("nextBtn");
    nextBtnEle.innerHTML = ">";
    btns.appendChild(nextBtnEle);

    //将btns添加到swiperBox中
    swiperBox.appendChild(btns);


    //创建circleList
    var circleList = document.createElement("div");
    circleList.classList.add("circleList");

    //根据imgs动态创建圆点
    for (var j = 0; j < options.imgs.length; j++) {
        //创建每个圆点
        var circleItem = document.createElement("div");
        circleItem.classList.add("circleItem");
        if (j == 0) {
            circleItem.classList.add("active");
        }
        circleItem.setAttribute("data-index", j);
        //将圆点添加到circleList中
        circleList.appendChild(circleItem);
    }
    //将circleList添加到swiperBox中
    swiperBox.appendChild(circleList);
    //最后将swiperBox添加到options中指定的容器中
    Box.appendChild(swiperBox);




    // js控制部分
    //获取按钮
    var prevBtn = document.querySelector(".prevBtn");
    var nextBtn = document.querySelector(".nextBtn");
    // 初始索引
    var index = 0;
    //获取图片列表
    var imgsArr = document.querySelectorAll(".imgItem");
    //获取所有圆点
    var circlesArr = document.querySelectorAll(".circleItem");
    //获取最外面的轮播图容器
    var swiper = document.querySelector(".swiper");
    console.log(imgsArr);
    //点击下一个按钮
    nextBtn.addEventListener("click", function() {
        //让当前索引，开始是0，的img透明度为0，下一索引的img的透明度为1
        console.log(index);
        // imgsArr[index].style.opacity = 0;
        imgsArr[index].classList.remove("active");
        //让之前的圆点去掉active类，注意这个active跟图片的active不同的
        circlesArr[index].classList.remove("active");
        index++;
        if (index >= imgsArr.length) {
            index = 0;
        }
        // imgsArr[index].style.opacity = 1;
        imgsArr[index].classList.add("active");
        //点击的圆点添加active类
        circlesArr[index].classList.add("active");
    });
    // 点击上一个按钮
    prevBtn.addEventListener("click", function() {
        // imgsArr[index].style.opacity = 0;
        imgsArr[index].classList.remove("active");
        //让之前的圆点去掉active类，注意这个active跟图片的active不同的
        circlesArr[index].classList.remove("active");
        index--;
        if (index < 0) {
            index = imgsArr.length - 1;
        }
        console.log(index)
            // imgsArr[index].style.opacity = 1;
        imgsArr[index].classList.add("active");
        //点击的圆点添加active类
        circlesArr[index].classList.add("active");
    });

    //圆点处理
    for (var i = 0; i < circlesArr.length; i++) {
        //循环为每个圆点注册点击事件
        circlesArr[i].addEventListener("click", function() {
            //获取data-index
            // console.log(this.dataset.index);
            //先让之前显示的图片去掉active类，也就是隐藏了
            imgsArr[index].classList.remove("active");
            //让之前的圆点去掉active类，注意这个active跟图片的active不同的
            circlesArr[index].classList.remove("active");
            index = parseInt(this.dataset.index);
            //即将显示的图片添加active来显示
            imgsArr[index].classList.add("active");
            //点击的圆点添加active类
            circlesArr[index].classList.add("active");
        })
    }

    // 图片自动轮播
    var intervalId = setInterval(function() {
        nextBtn.click();
    }, 3000);
    //当鼠标经过轮播图时候,清理定时器
    swiper.addEventListener("mouseenter", function() {
        clearInterval(intervalId);
    })
    swiper.addEventListener("mouseleave", function() {
        intervalId = setInterval(function() {
            nextBtn.click();
        }, 3000);
    })
}