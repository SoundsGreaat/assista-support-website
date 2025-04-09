function scrollToServices() {
  document.getElementById("our-services").scrollIntoView({ behavior: "smooth" });
}

let autoRotateTimer;

document.addEventListener("DOMContentLoaded", () => {
  createSlides();

  const indicators = document.querySelectorAll(".indicator");
  indicators.forEach(indicator => indicator.classList.remove("active"));
  if (indicators.length > 0) {
    indicators[0].classList.add("active");
  }

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      const direction = index > currentIndex ? "next" : "prev";
      showTestimonial(index, direction);
    });
  });

  autoRotateTimer = setInterval(() => {
    nextTestimonial();
  }, 3000);
});

document.addEventListener("DOMContentLoaded", () => {
  const currentUrl = new URL(window.location.href);
  const currentPath = currentUrl.pathname;
  console.log("currentPath:", currentPath);

  const menuLinks = document.querySelectorAll(".menu-items a");
  menuLinks.forEach(link => {
    const linkUrl = new URL(link.href, window.location.origin);
    console.log("linkPath:", linkUrl.pathname);
    if (linkUrl.pathname === currentPath) {
      link.classList.add("active");
    }
  });
});

function manualNextTestimonial() {
  clearInterval(autoRotateTimer);
  nextTestimonial();
}

function manualPrevTestimonial() {
  clearInterval(autoRotateTimer);
  prevTestimonial();
}

const testimonials = [
  {
    text: `Thanks to the team provided by Assista Support, the company is meeting all of their SLAs, and are even getting suggestions on how to improve operations based on customer intelligence. The company is now preparing to expand their sales team to drive even more revenue.`,
    author: `COO, Consumer Software Developer`
  },
  {
    text: `Assista Support helped us build strong, trusting relationships with our customers. Their agents are professional, fast, and always ready to go the extra mile.`,
    author: `Head of Customer Success, E-commerce`
  },
  {
    text: `Their support team is not just answering tickets – they are actively helping us to grow our user base by maintaining an amazing experience.`,
    author: `CEO, SaaS Startup`
  }
];

let currentIndex = 0;
let slidesContainer;
let slides = [];

function createSlides() {
  slidesContainer = document.querySelector(".testimonial-slides-container");

  testimonials.forEach((testimonial, index) => {
    const slide = document.createElement("div");
    slide.className = `testimonial-slide ${index === 0 ? "active" : ""}`;

    const textElement = document.createElement("p");
    textElement.className = "testimonial-text";
    textElement.textContent = testimonial.text;

    const authorElement = document.createElement("p");
    authorElement.className = "testimonial-author";
    authorElement.textContent = testimonial.author;

    slide.appendChild(textElement);
    slide.appendChild(authorElement);
    slidesContainer.appendChild(slide);
    slides.push(slide);
  });
}

function showTestimonial(newIndex, direction) {
  if (newIndex === currentIndex) return;

  const currentSlide = slides[currentIndex];
  const nextSlide = slides[newIndex];

  const outClass = direction === "next" ? "slide-out-left" : "slide-out-right";
  const inClass = direction === "next" ? "slide-in-right" : "slide-in-left";

  nextSlide.classList.remove("slide-out-left", "slide-out-right", "slide-in-left", "slide-in-right", "active");
  nextSlide.style.opacity = "1";
  nextSlide.classList.add("active", inClass);

  void nextSlide.offsetHeight;

  currentSlide.classList.add(outClass);
  currentSlide.classList.remove("active");

  document.querySelectorAll(".indicator").forEach((el, idx) => {
    el.classList.toggle("active", idx === newIndex);
  });

  setTimeout(() => {
    currentSlide.classList.remove(outClass);
    currentSlide.style.opacity = "0";

    nextSlide.classList.remove(inClass);
    currentIndex = newIndex;
  }, 300);
}

function nextTestimonial() {
  const newIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(newIndex, "next");
}

function prevTestimonial() {
  const newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(newIndex, "prev");
}

