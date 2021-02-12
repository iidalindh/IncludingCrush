const tl = gsap.timeline({defaults: {ease: 'power1.out'}});

tl.fromTo('.logo', {opacity: 0, y: "-100%"}, {opacity:1, y: "0%", duration: 0.5});
tl.fromTo('.loading', {opacity: 0, y: "-10%"}, {opacity:1, y: "0%", duration: 0.5});
tl.fromTo('.dots', {opacity: 0}, {opacity:1, duration: 0.1, stagger: 0.5});
tl.to('#cover', {y: "-120%", duration: 0.75, delay: 1});
tl.fromTo('.wrapper', {opacity: 0, y: "100%"}, {opacity: 1, y: "0%", duration: 0.5});
