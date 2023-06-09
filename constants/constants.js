const emailRegexp =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const passRegexp =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])[\w!@#$%^&*()]{8,}$/;

  const phoneRegexp = /^\(\d{3}\) \d{3}-\d{4}$/;

  const subscriptionData = ["starter", "pro", "business"];

  module.exports = {
    emailRegexp,
    passRegexp,
    phoneRegexp,
    subscriptionData,
  }