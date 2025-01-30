// index.js
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lenis smooth scrolling
  const lenis = new Lenis({
    lerp: 0.1,
    smooth: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Hero animations
  gsap.from(".hero__title span", {
    duration: 1.5,
    y: 100,
    opacity: 0,
    stagger: 0.05,
    ease: "power4.out",
  });

  gsap.from(".hero img", {
    duration: 1.5,
    scale: 0.8,
    opacity: 0,
    stagger: 0.2,
    ease: "expo.out",
  });

  // Text block animations
  gsap.to(".text__overlay", {
    scrollTrigger: {
      trigger: ".text__effect",
      start: "top 60%",
      end: "top -30%",
      // markers: true,
      scrub: 0.5,
    },
    scaleX: 0,
    duration: 4,
    ease: "power4.out",
    stagger: 0.2,
  });

  // Fullwidth image animations
  gsap.to(".fullwidth-image__overlay", {
    scrollTrigger: {
      trigger: ".fullwidth-image",
      start: "top bottom",
      end: "top top",
      scrub: 1,
    },
    opacity: 0,
    duration: 3,
  });

  gsap.from(".fullwidth-image img", {
    scale: 1.2,
    duration: 3,
    scrollTrigger: {
      trigger: ".fullwidth-image",
      start: "top bottom",
      end: "top top",
      scrub: 1,
    },
  });

  gsap.from(".fullwidth-image__text", {
    opacity: 0,
    y: 50,
    duration: 2,
    scrollTrigger: {
      trigger: ".fullwidth-image",
      markers: false,
      start: "top center",
    },
  });

  // Mission underline animation
  const missionPath = document.querySelector(".mission path");
  const pathLength = missionPath.getTotalLength();

  gsap.set(missionPath, {
    strokeDasharray: pathLength,
    strokeDashoffset: pathLength,
  });

  gsap.to(missionPath, {
    strokeDashoffset: 0,
    duration: 2,
    scrollTrigger: {
      trigger: ".mission",
      start: "top center",
    },
  });

  // Button hover animation
  const button = document.querySelector("button");
  button.addEventListener("mouseenter", () => {
    gsap.to(button, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  });
  button.addEventListener("mouseleave", () => {
    gsap.to(button, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  });
  // gsap.to(".footer",{
  //   scrollTrigger: {
  //     trigger: '.mission',
  //     start: 'top -20%',
  //     end: 'top center',
  //     markers: true,
  //     scrub: 0.4,
  //   },
  //   paddingBottom: "100vh",
  //   duration: 4.5,
  //   ease: 'power4.out',
  // })

  gsap.to(".footer", {
    scrollTrigger: {
      trigger: ".mission",
      start: "top -20%",
      end: "top center",
      scrub: 1.5,
      markers: false,
    },
    paddingBottom: "calc(140vh - 20%)",
    minHeight: "50vh",
    duration: 6,
    ease: "power4.inOut",
  });

  gsap.from(".footer__inner a", {
    scrollTrigger: {
      trigger: ".footer",
      start: "top 32%",
      end: "top 10%",
      // markers: true,
      scrub: 1,
    },
    opacity: 0,
    stagger: 0.6,
    x: 50,
    duration: 3,
    ease: "power4.out",
  });
});
