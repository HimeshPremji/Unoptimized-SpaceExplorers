document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lenis smooth scrolling
  const lenis = new Lenis({
    lerp: 0.1,
    smooth: true,
    wheelMultiplier: window.innerWidth < 768 ? 0.8 : 1, // Adjust wheel sensitivity for mobile
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Responsive animation handler
  function handleResponsiveAnimations() {
    const isMobile = window.innerWidth < 768;
    const vh = window.innerHeight * 0.01;

    // Hero animations
    gsap.from(".hero__title span", {
      duration: isMobile ? 1 : 1.5,
      y: isMobile ? 50 : 100,
      opacity: 0,
      stagger: isMobile ? 0.1 : 0.05,
      ease: "power4.out",
    });

    gsap.from(".hero img", {
      duration: isMobile ? 1 : 1.5,
      scale: isMobile ? 0.9 : 0.8,
      opacity: 0,
      stagger: isMobile ? 0.1 : 0.2,
      ease: "expo.out",
    });

    // Text block animations
    gsap.matchMedia().add("(min-width: 768px)", () => {
      gsap.to(".text__overlay", {
        scrollTrigger: {
          trigger: ".text__effect",
          start: "top 60%",
          end: "top -30%",
          scrub: 0.5,
        },
        scaleX: 0,
        duration: 4,
        ease: "power4.out",
      });
    });

    gsap.to(".text__overlay", {
      scrollTrigger: {
        trigger: ".text__effect",
        start: "top 60%",
        end: "top -30%",
        markers: true,
        scrub: 0.5,
      },
      scaleX: 0,
      duration: 4,
      ease: "power4.out",
      stagger: 0.2,
    });

    // Fullwidth image animations
    const fullwidthTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".fullwidth-image",
        start: "top bottom",
        end: "top top",
        scrub: 1,
      },
    });

    fullwidthTimeline
      .to(".fullwidth-image__overlay", { opacity: 0, duration: 3 })
      .from(".fullwidth-image img", { scale: isMobile ? 1.1 : 1.2 }, 0)
      .from(
        ".fullwidth-image__text",
        {
          opacity: 0,
          y: isMobile ? 30 : 50,
          duration: 2,
        },
        0.5
      );

    // Mission underline animation
    const missionPath = document.querySelector(".mission path");
    if (missionPath) {
      const pathLength = missionPath.getTotalLength();
      gsap.set(missionPath, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      gsap.to(missionPath, {
        strokeDashoffset: 0,
        duration: isMobile ? 1.5 : 2,
        scrollTrigger: {
          trigger: ".mission",
          // markers: true,
          scrub: 1,
          start: isMobile ? "top 80%" : "top center",
          end: isMobile ? "top 20%" : "top center",
        },
      });
    }

    // Footer animations
    gsap.to(".footer", {
      paddingBottom: isMobile
        ? `calc(100vh - ${20 * vh}px)`
        : "calc(140vh - 20%)",
      minHeight: isMobile ? "40vh" : "50vh",
      scrollTrigger: {
        trigger: ".mission",
        // markers: true,
        start: isMobile ? "top 20%" : "top -20%",
        end: isMobile ? "top 0%" : "top center",
        scrub: isMobile ? 1 : 1,
      },
      ease: "power4.inOut",
    });

    gsap.from(".footer__inner a", {
      x: isMobile ? 20 : 50,
      opacity: 0,
      stagger: isMobile ? 0.3 : 0.6,
      scrollTrigger: {
        trigger: ".footer",
        markers: false,
        start: isMobile ? "top 70%" : "top 32%",
        end: isMobile ? "top 24%" : "top 10%",
        scrub: 1,
      },
    });
  }

  // Initialize animations
  handleResponsiveAnimations();

  // Refresh ScrollTrigger on resize
  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
    lenis.resize(); // Reset Lenis scroll
  });
});
