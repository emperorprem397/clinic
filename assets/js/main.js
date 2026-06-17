'use strict';

/* ── Top call bar: hides on scroll down, navbar slides up to top ── */
(function(){
  var bar    = document.getElementById('top-call-bar');
  var navbar = document.getElementById('navbar');
  if(!bar||!navbar) return;
  function onScroll(){
    var collapsed = window.scrollY > 60;
    bar.classList.toggle('bar-hidden', collapsed);
    navbar.classList.toggle('bar-collapsed', collapsed);
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
})();

/* ── Navbar: dark glass on scroll ── */
(function(){
  var navbar = document.getElementById('navbar');
  if(!navbar) return;
  function onScroll(){ navbar.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
})();

/* ── Hero background slideshow: auto crossfade ── */
(function(){
  var slides = document.querySelectorAll('.hero-slide');
  if(slides.length < 2) return;
  var current = 0;
  setInterval(function(){
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 5000);
})();

/* ── Hamburger / Mobile menu ── */
(function(){
  var btn  = document.getElementById('hamburger');
  var menu = document.getElementById('mobile-menu');
  if(!btn||!menu) return;
  function close(){
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded','false');
    var bars = btn.querySelectorAll('span');
    bars[0].style.transform=''; bars[1].style.opacity=''; bars[2].style.transform='';
  }
  btn.addEventListener('click', function(){
    var open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    var bars = btn.querySelectorAll('span');
    if(open){
      bars[0].style.transform='translateY(7px) rotate(45deg)';
      bars[1].style.opacity='0';
      bars[2].style.transform='translateY(-7px) rotate(-45deg)';
    } else { close(); }
  });
  menu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', close); });
  document.addEventListener('click', function(e){
    if(!btn.contains(e.target)&&!menu.contains(e.target)) close();
  });
})();

/* ── Scroll reveal ── */
(function(){
  var els = document.querySelectorAll('.reveal');
  if(!els.length) return;
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  },{threshold:0.10, rootMargin:'0px 0px -32px 0px'});
  els.forEach(function(el){ io.observe(el); });
})();

/* ── Animated counters ── */
(function(){
  var els = document.querySelectorAll('.count-up');
  if(!els.length) return;
  function animate(el){
    var target = parseInt(el.getAttribute('data-target'),10);
    var dur = 1800, step = Math.ceil(target/(dur/16)), cur = 0;
    function tick(){
      cur = Math.min(cur+step, target);
      el.textContent = cur.toLocaleString();
      if(cur < target) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ animate(e.target); io.unobserve(e.target); }
    });
  },{threshold:0.5});
  els.forEach(function(el){ io.observe(el); });
})();

/* ── Stats slider (prev/next buttons) ── */
(function(){
  var track = document.getElementById('stats-track');
  var prev  = document.getElementById('stats-prev');
  var next  = document.getElementById('stats-next');
  if(!track||!prev||!next) return;
  var slideW = 320; // width + gap
  prev.addEventListener('click', function(){ track.scrollBy({left:-slideW, behavior:'smooth'}); });
  next.addEventListener('click', function(){ track.scrollBy({left:slideW,  behavior:'smooth'}); });
})();

/* ── Testimonials slider (prev/next + dots) ── */
(function(){
  var track = document.getElementById('t-track');
  var prev  = document.getElementById('t-prev');
  var next  = document.getElementById('t-next');
  var dots  = document.querySelectorAll('.t-dot');
  if(!track) return;

  var cards  = track.querySelectorAll('.testimonial-card');
  var total  = cards.length;
  var current = 0;

  function goTo(idx){
    current = (idx + total) % total;
    var cardW = cards[0].offsetWidth + 20; // width + gap
    track.scrollTo({left: current * cardW, behavior:'smooth'});
    dots.forEach(function(d,i){
      d.classList.toggle('active', i===current);
      d.setAttribute('aria-selected', i===current);
    });
  }

  if(prev) prev.addEventListener('click', function(){ goTo(current-1); });
  if(next) next.addEventListener('click', function(){ goTo(current+1); });
  dots.forEach(function(dot){
    dot.addEventListener('click', function(){ goTo(parseInt(dot.getAttribute('data-idx'),10)); });
  });

  /* Auto-advance every 5s */
  setInterval(function(){ goTo(current+1); }, 5000);
})();

/* ── All call buttons ── */
document.addEventListener('click', function(e){
  if(e.target.closest('[data-action="call"]')){
    var clinic = '7568521210'; // ← UPDATE THIS
    window.location.href = 'tel:+91'+clinic;
  }
});
