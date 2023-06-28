(function () {

  gsap.registerPlugin(ScrollTrigger);

  // header event
  let lastScroll = 0;
  const header = document.querySelector('.header');

  window.addEventListener('scroll', function() {
    const curr = window.pageYOffset || document.documentElement.scrollTop;
  
    if (curr > lastScroll) {
      header.classList.add('hide');
    } else {
      header.classList.remove('hide');
    }
    lastScroll = curr;
  });


  // header 스태거 모션
  gsap.from('.header > *',{ delay:0.5, opacity:0, stagger:0.3 })
  
  

  // nav click - 해당 section 이동
  const navAnchor = document.querySelectorAll('.header .nav-item a');

  navAnchor.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const _this = this;
      const thisState = _this.getAttribute('rel');
      const target = document.getElementById(thisState);
      const targetMarg = target.offsetHeight - target.clientHeight;
      const targetValue = target.offsetTop - targetMarg;
      const targetResult = targetValue + 50;

      navAnchor.forEach(item => item.classList.remove('on'));
      _this.classList.add('on');
      window.scrollTo({
        top: targetResult,
        behavior: 'smooth'
      });
    });
  });




  // intro
  const intro = document.querySelector('.intro');
  const parentEl = intro.closest('.narrow');
  const txtEl = intro.querySelectorAll('.text');
  const lineEls = intro.querySelectorAll('.line');
  const btnDownEl = intro.querySelector('.btn-down');

  const introList = gsap.timeline({
    scrollTrigger: {
      trigger: parentEl,
      start: '-50% 0%',
      end: '100% 0%',
    },
  });

  introList
  .addLabel('a')
  .to(lineEls, {
    duration: .8,
    stagger: .3,
    width: '100%',
  }, 'a')
  .add(() => {
    txtEl.forEach((txt, index) => {
      gsap.to(txt, {
        duration: .8,
        translateY: 0,
        opacity: 1,
        delay: index * 0.2,
        onComplete: () => {
          if (index === txtEl.length - 1) {
            gsap.to(btnDownEl, {
              duration: .3,
              translateY: 0,
              opacity: 1,
            });
          }
        },
      });
    });
  });


  // contents-00 - intro btn-down click 아래로 이동
  const btnDown = document.querySelector('.btn-down');

  btnDown.addEventListener('click', function(e) {
    e.preventDefault();
  
    const target = document.querySelector(this.hash);
    const targetOffsetTop = target.offsetTop;
    const scrollOptions = {
      top: targetOffsetTop,
      behavior: 'smooth'
    };
  
    window.scrollTo(scrollOptions);
  });
  



  // contents-01 - sticker
  const stickerList = document.querySelectorAll('.sticker .sticker-icon');

  stickerList.forEach(element => {
    dataX = element.dataset.x;
    dataY = element.dataset.y;
    gsap.to(element, {
      scrollTrigger: {
        trigger: ".ppservice .sticker",
        start: "30% 100%",
        end: "100% 0%",
        scrub: 0.4,
      },
      xPercent: dataX,
      yPercent: dataY,
    })
  });




  // headline (common)
  gsap.utils.toArray('.text-flow-area .headline').forEach(element => {
    gsap.to(element, {
      scrollTrigger: {
        trigger: element.parentElement,
        start:"0% 100%",
        end:"100% 0%",
        scrub: 1,
      },
      xPercent: -100,
    })
  });




  // 텍스트 text 아래에서 위로 등장 (common)
  gsap.set('.col-left',{opacity:0, yPercent:50})
  gsap.set('.col-right',{opacity:0, yPercent:50})

  gsap.utils.toArray('.col-left').forEach(element => {
    gsap.to(element,{
      scrollTrigger:{
        trigger: element.parentElement,
        start: "0% 60%",
        end: "100% 80%",
      },
      yPercent: 0, 
      opacity: 1,
    })
  });

  gsap.utils.toArray('.col-right').forEach(element => {
    gsap.to(element,{
      scrollTrigger:{
        trigger: element.parentElement,
        start: "0% 60%",
        end: "100% 80%",
      },
      yPercent: 0, 
      opacity: 1,
      delay: .3
    })
  });
  
  


  // contents-02 - audio img
  document.querySelectorAll('.wrap-project').forEach(function (project, index) {
    gsap.fromTo(project, {
        opacity: 0,
        y: 50,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: project,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reset',
        },
      }
    );
  });




  // contents-03 - meaningful
  // set 으로 초기화를 해도 되고, fromTo 방법을 써도 됨.
  gsap.set('.meaningful .meaningful-list .contents', {opacity:0, yPercent: 100})

  const meaningfulList = document.querySelectorAll('.meaningful-list');

  meaningfulList.forEach(function(el) {
    const parentEl = el.closest('.scroll-parent');
    const txtEl = el.querySelectorAll('.contents');
    const lineEl = el.querySelectorAll('span');
    
    const stepsList = gsap.timeline({
      scrollTrigger: {
        trigger: parentEl,
        start: '0% 10%',
        end: '100% 80%',
      },
    });
    
    stepsList
    .addLabel('a')
    .to(lineEl, {
      duration: 0.8,
      stagger: 0.1,
      width: '100%',
    }, 'a')
    .to(txtEl, {
      duration: 0.8,
      yPercent: 0,
      opacity: 1,
      stagger: 0.1,
    }, 'a');
  });

  // meaningful mouse over 
  const meaningfuItem = document.querySelectorAll('.meaningful-item');

  meaningfuItem.forEach(function(el) {
    el.addEventListener('mouseover', function() {
      gsap.to(el.querySelectorAll('span'), {
        duration: 0.3,
        backgroundColor: '#fff',
        width: '100%',
      });
    });
  
    el.addEventListener('mouseout', function() {
      gsap.to(el.querySelectorAll('span'), {
        duration: 0.3,
        backgroundColor: '#777',
        width: '100%',
      });
    });
  });

  


  // contents-04 - 수평 스크롤(slide)
  const horizontalScroll = gsap.timeline({
    scrollTrigger: {
    trigger: ".slide-activity-wrap",
    pin: true,
    scrub: 1,
    start: "50% 40%",
  }});

  horizontalScroll
  .addLabel('b')
  .to('.slide-group-inner', {xPercent:-66},'b')
  .to('.slide-activity-inner .sub-title-box', {yPercent: -100, duration:0.1},'b')




  // contents-05 - price
  const price = document.querySelector('.price');
  const pparentEl = price.getElementsByClassName('narrow');
  const plineEls = price.querySelectorAll('.line');
  const ptxtEl = price.querySelectorAll('.box');
  const linksEl = price.querySelector('.links');

  const priceList = gsap.timeline({
    scrollTrigger: {
      trigger: pparentEl,
      start: '20% 90%',
      end: '100% 0%',
    },
  });

  priceList
  .addLabel('c')
  .to(plineEls, {
    duration: .6,
    stagger: .3,
    width: '100%',
  }, 'c')
  .add(() => {
    ptxtEl.forEach((txt, index) => {
      gsap.to(txt, {
        duration: .6,
        translateY: 0,
        opacity: 1,
        delay: index * 0.1,
        onComplete: () => {
          if (index === ptxtEl.length - 1) {
            gsap.to(linksEl, {
              duration: .3,
              translateY: 0,
              opacity: 1,
            });
          }
        },
      });
    });
  });




  // arch - 클립패스, 스크럽 모션
  // queryselectorAll과 동일 << gsap 방식
  gsap.utils.toArray('.arch .picture').forEach(element => {
    gsap.to(element, {
      scrollTrigger: {
        trigger: element.parentElement,
        start: "0% 50%", //[트리거기준 꼭대기] [윈도우좌표 꼭대기]
        end: "100% 80%",
        // markers:true,
        // scrub:0.4,
      },
      'clip-path': 'circle(72.4% at 49% 51%)'
      // 'clip-path': 'path(M 0 200 L 0,75 A 5,5 0,0,1 150,75 L 200 200 z)'
    })
    // .arch .picture의 img = element.childNodes[1]
    gsap.to(element.childNodes[1], {
      scrollTrigger: {
        trigger: element.parentElement,
        start: "0% 100%",
        end: "100% 0%",
        // markers:true,
        scrub: 0,
      },
      scale: 1.5,
    })
  });



  
  // footer text loof
  gsap.to('.footer .area-hidden span', 2, {xPercent:-100, repeat:-1, ease:'none',});
  gsap.to('.footer .txt-flow-area .link-home', 20, {xPercent:-100, repeat:-1, ease:'none',});

})();