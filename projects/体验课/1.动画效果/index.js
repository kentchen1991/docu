function startAnimation() {
  const $ = (sel) => document.querySelector(sel);
  const $all = (sel) => document.querySelectorAll(sel);
  //用于展示的图片 11 * 3
const imgList1 = Array.from({ length: 11 }, (v, i) => `./image/face${i+1}.jpg`);
const imgList2 = Array.from({ length: 11 }, (v, i) => `./image/face${i+1}.jpg`);
const imgList3 = Array.from({ length: 11 }, (v, i) => `./image/face${i+1}.jpg`);
const imgList = imgList1.concat(imgList2, imgList3);
  //计算个数和位置
  let EOITextArr = [
    '                 ',
    '  xxxx  xx  xxx  ',
    '  x    x  x  x   ',
    '  xxxx x  x  x   ',
    '  x    x  x  x   ',
    '  xxxx  xx  xxx  ',
    '                 ',
  ];
  var lineCount = EOITextArr[0].length;
  var max = lineCount * EOITextArr.length;
  console.log(lineCount, max);
  let EOIArr = [];
  EOITextArr.forEach((item, i) => {
    console.log(item.length);
    for (let j = 0; j < item.length; j++) {
      if (item[j] === 'x') {
        EOIArr.push(i * lineCount + j)
      }
    }
  })

  console.log(EOIArr);
  const faceList = Array.from({
    length: 119
  }, () => {
    const face = document.createElement("span");
    const img = document.createElement("img");
    const i = document.createElement("i");
    i.style.left = '-100%';
    face.append(img);
    face.append(i);
    return face;
  });
  
  const box = document.createElement("div");
  //每个镜面38px大小
  const imgW = 50;
  box.classList.add('eoi-box');
  
  //box设置大小
  const boxW = lineCount * imgW + lineCount
  box.style.width = `${boxW}px`
  box.style.height = '288px'
  // box.style.backgroundColor = '#000'
  faceList.forEach(ele => {
    box.append(ele);
  });

  document.body.appendChild(box);
  //以上是创建dom的过程
  
  const textArr = [].concat(EOIArr);
  const imgArr = [].concat(EOIArr);

  const imgEles = $all('img');
  const spanEles = $all('span');
  const iEles = $all('i');

 const timer = setInterval(() => {
    const length = textArr.length;
    const showNumber = textArr.splice(Math.random() * length, 1);
    spanEles[showNumber].style.backgroundColor = '#F40';
    imgEles[showNumber].src = imgList.splice(Math.floor(Math.random() * imgList.length), 1);
    iEles[showNumber].style.left = '100%';
    if (!textArr.length) {
      clearInterval(timer);
      showImg();
    }
  }, 25);

  const showImg = () => {
    const imgTimer = setInterval(() => {
      let length = imgArr.length;
      let [showNumber] = imgArr.splice(Math.random() * length, 1);
      imgEles[showNumber].style.display = 'inline';
      spanEles[showNumber].style.backgroundColor = '#fff';
      iEles[showNumber].style.left = '-100%';
      if (imgArr.length === 0) {
        console.log(showNumber);
        spanEles[showNumber].classList.add('you');
        clearInterval(imgTimer);
      }
    }, 25);
  }

}


startAnimation()