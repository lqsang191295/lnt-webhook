module.exports = {
  apps: [
    {
      name: "webhook",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3300, // Cổng chạy ứng dụng
      },
    },
  ],
};
