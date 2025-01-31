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

    // Scroll to top button logic
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    // Show the button when the user scrolls down 20px from the top
    window.onscroll = function() {
      if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
        scrollToTopBtn.style.display = "block";
      } else {
        scrollToTopBtn.style.display = "none";
      }
    };
  
    // Scroll to the top of the document when the button is clicked
    scrollToTopBtn.addEventListener("click", () => {
      lenis.scrollTo("top", { duration: 1 }); // Smooth scroll to the top using Lenis
    });

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

    const splitTypes = document.querySelectorAll(".text__effect p");
    splitTypes.forEach((char, idx) => {
      const text = new SplitType(char, { types: "chars" });

      gsap.from(text.chars, {
        duration: 1,
        ease: "power4.out",
        opacity: 0.2,
        stagger: 0.1,
        scrollTrigger: {
          trigger: char,
          start: "top 70%",
          end: "top 40%",
          markers: false,
          scrub: 0.5,
        },
      });
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
        scrollTrigger: {
          trigger: ".mission",
          markers: true,
          scrub: 0.6,
          start: isMobile ? "top 80%" : "top 70%",
          end: isMobile ? "top 20%" : "top 30%",
        },
      });
    }

    // Footer animations
    gsap.from(".footer", {
      paddingBottom: 0,
      duration: isMobile ? 2 : 3.5,
    });
    // First animation for background
    gsap.to(".footer__inner", {
      background: "pink",
      scrollTrigger: {
        trigger: ".footer",
        start: isMobile ? "top 0%" : "top 16%",
        end: isMobile ? "top center" : "top center",
        scrub: isMobile ? 1 : 0.4, // Use numeric scrub values for consistency
        markers: false, // Keep markers for debugging
        ease: "power4.inOut",
      },
    });

    // Second animation for links with synchronized timing
    gsap.to(".footer__inner a", {
      color: "red",
      stagger: isMobile ? 0.2 : 0.1, // Reduced stagger for smoothness
      scrollTrigger: {
        trigger: ".footer",
        start: isMobile ? "top 0%" : "top 16%",
        end: isMobile ? "top center" : "top center",
        scrub: isMobile ? 1 : 0.4, // Match exact scrub value
        ease: "power4.inOut",
      },
    });

    // gsap.from(".footer__inner a", {
    //   x: isMobile ? 20 : 50,
    //   opacity: 0,
    //   stagger: isMobile ? 0.3 : 0.6,
    //   scrollTrigger: {
    //     trigger: ".footer",
    //     markers: false,
    //     start: isMobile ? "top 70%" : "top 32%",
    //     end: isMobile ? "top 24%" : "top 10%",
    //     scrub: 1,
    //   },
    // });
  }

  // Initialize animations
  handleResponsiveAnimations();

  // Refresh ScrollTrigger on resize
  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
    lenis.resize(); // Reset Lenis scroll
  });
});
