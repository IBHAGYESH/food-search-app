export const title = "Bhagyesh Assignment";

export const email = "bhagyeshjahangirpuriya@gmail.com";

export const messages = {
  app: {
    crash: {
      title: "Oooops... Sorry, I guess, something went wrong. You can:",
      options: {
        email: `contact with author by this email - ${email}`,
        reset: "Press here to reset the application",
      },
    },
  },
  loader: {
    fail: "Hmmmmm, there is something wrong with this component loading process... Maybe trying later would be the best idea",
  },
  images: {
    failed: "something went wrong during image loading :(",
  },
  404: "Hey bro? What are you looking for?",
};

export const loader = {
  // no more blinking in your app
  delay: 300, // if your asynchronous process is finished during 300 milliseconds you will not see the loader at all
  minimumLoading: 700, // but if it appears, it will stay for at least 700 milliseconds
};

export const defaultMetaTags = {
  image: "/src/assets/food.jpg",
  description: "Bhagyesh Assignment",
};

export const baseUrl = import.meta.env.REACT_APP_BASE_URL || "/";
