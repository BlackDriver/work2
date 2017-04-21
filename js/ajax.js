var newshttpreq = new XMLHttpRequest();
var lunbohttpreq = new XMLHttpRequest();
var menushttpreq = new XMLHttpRequest();
var header = document.querySelector('.tags-container');
var lunbocontainer = document.querySelector('.lunbo ul');
var lunbopoints = document.querySelector('.points .pt');
var lunbotitle = document.querySelector('.title');
var newscontainer = document.querySelector('.news-wrp');
var addedbox = document.querySelector('.addedbox');
var avaliablebox = document.querySelector('.avaliablebox');
var qiehuan = document.querySelector('.qiehuan');
var genduo = document.querySelector('.genduo');

    newshttpreq.open("GET","/news?num=2",true);
    
    newshttpreq.onreadystatechange = function () {
        
        if (newshttpreq.readyState == 4 && newshttpreq.status == 200) {
            var result = JSON.parse(newshttpreq.responseText);

            for (var i = 0; i <result.length; i++) {
                var container = document.createElement('div');
                var pic = document.createElement('div');
                var title = document.createElement('div');
                var desc = document.createElement('div');
                var main = document.createElement('div');
                var postswrp = document.createElement('div');
                var posts = document.createElement('div');
                container.className = "news-container";
                pic.style.background = "url(" + result[i].imgURL + ")";
                pic.className = "news-pic";
                title.innerHTML = result[i].title;
                title.className = "news-title";
                desc.className = "desc";
                main.className = "desc-main";
                main.innerHTML = wordlimit(result[i].description);
                postswrp.className = "desc-posts-wrp";
                posts.className = "posts";
                if (result[i].post > 10000) {
                    posts.innerHTML = "1万+跟帖";
                }else{
                    posts.innerHTML = result[i].post + "跟帖";
                }
                
                if (result[i].type != null) {
                    var icon = document.createElement('div');
                    icon.className = "icon"
                    icon.innerHTML = result[i].type;
                    icon.style.background = result[i].typeColor;
                    postswrp.appendChild(icon);
                }

                

                postswrp.appendChild(posts);
                desc.appendChild(main);
                desc.appendChild(postswrp);
                container.appendChild(pic);
                container.appendChild(title);
                container.appendChild(desc);
                newscontainer.appendChild(container);


            }
            

        }
    }
    newshttpreq.send(null);

    lunbohttpreq.open("GET","/sliders",true);
    lunbohttpreq.onreadystatechange = function () {
        if (lunbohttpreq.readyState == 4 && lunbohttpreq.status == 200) {
            var result = JSON.parse(lunbohttpreq.responseText);
            var k = 0;
            for (var i = 0;i<result.length;i++) {
                var li = document.createElement('li');
                var point = document.createElement('li');
                var title =document.createElement('li');
                li.style.background = "url(" + result[i].imgURL + ")";
                li.style.backgroundSize = "100%";
                title.innerHTML = result[i].title;
                lunbopoints.appendChild(point);
                lunbocontainer.appendChild(li);
                lunbotitle.appendChild(title);
                k++;

            }
            lunbocontainer.style.width = 10.0*k + "rem";
            var addcolor = document.querySelectorAll('.points .pt li');
            var addlength = document.querySelector('.points .pt');
            var pics = document.querySelector('.lunbo ul')
            lunbotitle.style.width = 6.5625*k + "rem";
            addlength.style.width = 0.46875*k + "rem";
            addcolor[0].className = "selected";
            swtich(pics,addcolor,lunbotitle);

        }
    }

    lunbohttpreq.send(null);

    menushttpreq.open("GET","/tags",true);

    menushttpreq.onreadystatechange = function () {
        if (menushttpreq.readyState == 4 && menushttpreq.status == 200) {
            var result = JSON.parse(menushttpreq.responseText);
            
            for (var i = 0; i < result.added.length; i++) {
                var li =  document.createElement('li');
                
                li.className = "tags";
                li.innerHTML = result.added[i].name;
                header.appendChild(li);
            }
            addbox(result,qiehuan,addedbox);
            avaliableboxs(result,avaliablebox,genduo,qiehuan,addedbox);
        }
    }
    menushttpreq.send(null);


function swtich(swtichbody,swtichchild,swtichtitle){
        var number = 0;
        var left;
        var titleleft;
        for (var i = 0; i < swtichchild.length; i++) {
            swtichchild[i].index = i;
            swtichchild[i].onclick = function () {
                number = this.index;
                left = number*-10;
                titleleft = number*-6.5625;
                swtichtitle.style.left = titleleft + 'rem';
                swtichbody.style.left = left + 'rem';
                swtichchild[number].className = 'selected';
                for (var i = 0; i < swtichchild.length; i++) {
                    if (number != i) {
                        swtichchild[i].className = '';
                    }
                }
            }  
        }
    }

function wordlimit (target) {
    if (target.length > 30) {
        target = target.substr(0,30) + "...";
    }else{
        target = target;
    }
    return target;
}
function insertAfter(newElement, targetElement){ 
    var parent = targetElement.parentNode; 
    if (parent.lastChild == targetElement) { 
    // 如果最后的节点是目标元素，则直接添加。因为默认是最后 
    parent.appendChild(newElement); 
    } 
    else { 
    parent.insertBefore(newElement, targetElement.nextSibling); 
    }
}
function addbox(result,qiehuan,addedbox) {
    for (var i = 0; i <result.added.length; i++) {
        var div = document.createElement('div');
        var bar = document.createElement('div');
        div.className = "added";
        bar.className = "added-bar";
        div.innerHTML = result.added[i].name;
        div.appendChild(bar);
        addedbox.appendChild(div);

    }
    insertAfter(addedbox,qiehuan);
}
function avaliableboxs(result,avaliablebox,genduo,qiehuan,addedbox) {
    for (var i = 0; i < result.avaliable.length; i++) {
        var div = document.createElement('div');
        div.className = "avaliable";
        div.innerHTML = result.avaliable[i].name;
        div.addEventListener("click",function(){
            var text = this.innerHTML
            move(text,addedbox,qiehuan); 
        });
        avaliablebox.appendChild(div);
    }
    insertAfter(avaliablebox,genduo);
}
function downit() {
    var displaybox = document.querySelector('.displaybox');
    displaybox.className = "displaybox visable";
}
function upit() {
    var displaybox = document.querySelector('.displaybox');
    displaybox.className = "displaybox";
}
function move(text,addedbox,qiehuan) {
    var div = document.createElement('div');
    var bar = document.createElement('div');
    div.className = "added";
    bar.className = "added-bar";
    div.innerHTML = text;
    div.appendChild(bar);
    addedbox.appendChild(div);
    insertAfter(addedbox,qiehuan);
}